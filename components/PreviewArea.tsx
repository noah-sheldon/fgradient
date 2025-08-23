"use client";

import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check } from 'lucide-react';
import { PreviewAreaProps } from '@/types';

export default function PreviewArea({ 
  imageSrc, 
  gradient, 
  sizing, 
  onDownload 
}: PreviewAreaProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const generateGradientStyle = () => {
    const direction = gradient.direction === 'custom' 
      ? `${gradient.customDegree}deg` 
      : gradient.direction;
    
    return {
      background: `linear-gradient(${direction}, ${gradient.startColor}, ${gradient.midColor}, ${gradient.endColor})`,
      width: `${sizing.width}px`,
      height: `${sizing.height}px`,
      borderRadius: `${sizing.borderRadius}px`,
    };
  };

  const generateCanvas = async () => {
    if (!canvasRef.current) return null;

    try {
      const scale = window.devicePixelRatio || 2;
      const outputCanvas = document.createElement('canvas');
      const ctx = outputCanvas.getContext('2d');
      
      outputCanvas.width = sizing.width * scale;
      outputCanvas.height = sizing.height * scale;
      
      if (!ctx) return null;

      // Apply border radius clipping
      if (sizing.borderRadius > 0) {
        ctx.beginPath();
        const radius = sizing.borderRadius * scale;
        ctx.roundRect(0, 0, outputCanvas.width, outputCanvas.height, radius);
        ctx.clip();
      }

      // Create gradient background
      const direction = gradient.direction === 'custom' 
        ? gradient.customDegree 
        : gradient.direction === 'to right' ? 0
        : gradient.direction === 'to left' ? 180  
        : gradient.direction === 'to bottom' ? 90
        : gradient.direction === 'to top' ? 270
        : gradient.direction === 'to bottom right' ? 45
        : gradient.direction === 'to bottom left' ? 135
        : gradient.direction === 'to top right' ? 315
        : gradient.direction === 'to top left' ? 225
        : 0;

      const radians = (direction * Math.PI) / 180;
      const gradientLength = Math.abs(sizing.width * Math.cos(radians)) + Math.abs(sizing.height * Math.sin(radians));
      const centerX = (sizing.width * scale) / 2;
      const centerY = (sizing.height * scale) / 2;
      
      const startX = centerX - (gradientLength * scale * Math.cos(radians)) / 2;
      const startY = centerY - (gradientLength * scale * Math.sin(radians)) / 2;
      const endX = centerX + (gradientLength * scale * Math.cos(radians)) / 2;
      const endY = centerY + (gradientLength * scale * Math.sin(radians)) / 2;

      const grad = ctx.createLinearGradient(startX, startY, endX, endY);
      grad.addColorStop(0, gradient.startColor);
      grad.addColorStop(0.5, gradient.midColor);
      grad.addColorStop(1, gradient.endColor);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

      // Draw image with proper scaling and positioning if exists
      if (imageSrc) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imageSrc;
        });

        // Calculate scaling to fit within canvas with padding (like object-contain)
        const padding = 16 * scale; // 4px padding * 4 sides
        const availableWidth = outputCanvas.width - padding;
        const availableHeight = outputCanvas.height - padding;
        
        const scaleX = availableWidth / img.naturalWidth;
        const scaleY = availableHeight / img.naturalHeight;
        const imageScale = Math.min(scaleX, scaleY, 1); // Don't upscale
        
        const scaledWidth = img.naturalWidth * imageScale;
        const scaledHeight = img.naturalHeight * imageScale;
        
        // Center the scaled image
        const imgX = (outputCanvas.width - scaledWidth) / 2;
        const imgY = (outputCanvas.height - scaledHeight) / 2;
        
        ctx.drawImage(img, imgX, imgY, scaledWidth, scaledHeight);
      }

      // Add watermark
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.font = `${12 * scale}px Arial`;
      const watermarkText = 'made with fgradient';
      const textMetrics = ctx.measureText(watermarkText);
      const watermarkWidth = textMetrics.width + (16 * scale);
      const watermarkHeight = 24 * scale;
      const watermarkX = outputCanvas.width - watermarkWidth - (32 * scale);
      const watermarkY = outputCanvas.height - watermarkHeight - (16 * scale);
      
      // Draw watermark background
      ctx.beginPath();
      ctx.roundRect(watermarkX, watermarkY, watermarkWidth, watermarkHeight, 4 * scale);
      ctx.fill();
      
      // Draw watermark text
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(watermarkText, watermarkX + watermarkWidth / 2, watermarkY + watermarkHeight / 2);
      ctx.restore();
      
      return outputCanvas;
    } catch (error) {
      console.error('Error generating canvas:', error);
      return null;
    }
  };

  const handleDownload = async () => {
    const canvas = await generateCanvas();
    if (!canvas) {
      alert('Failed to generate image. Please try again.');
      return;
    }

    const link = document.createElement('a');
    link.download = `gradient-image-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onDownload();
  };

  const handleCopyToClipboard = async () => {
    const canvas = await generateCanvas();
    if (!canvas) {
      alert('Failed to generate image. Please try again.');
      return;
    }

    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Failed to copy image. Your browser might not support this feature.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
        <div className="flex space-x-2">
          <Button 
            onClick={handleCopyToClipboard}
            disabled={!imageSrc}
            variant="outline"
            className="disabled:bg-gray-100"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button 
            onClick={handleDownload}
            disabled={!imageSrc}
            className="bg-gray-900 hover:bg-gray-800 text-white disabled:bg-gray-400"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Image
          </Button>
        </div>
      </div>

      <Card className="p-6 border border-gray-200">
        <div className="flex justify-center">
          <div className="border-2 border-dashed border-gray-300 p-4 bg-white">
            <div
              ref={canvasRef}
              className="relative flex items-center justify-center overflow-hidden"
              style={generateGradientStyle()}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Uploaded"
                  className="object-contain p-4"
                  style={{
                    maxWidth: `${sizing.width - 32}px`,
                    maxHeight: `${sizing.height - 32}px`,
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white text-opacity-75 space-y-2">
                  <div className="w-16 h-16 border-2 border-white border-opacity-50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🖼️</span>
                  </div>
                  <p className="text-sm font-medium">Upload an image to preview</p>
                </div>
              )}
              
              {/* Watermark */}
              <div className="absolute bottom-4 right-8">
                <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  made with fgradient
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Info */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-4 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-full">
            <span>Canvas: {sizing.width} × {sizing.height}px</span>
            <span>•</span>
            <span>
              Gradient: {gradient.direction === 'custom' 
                ? `${gradient.customDegree}°` 
                : gradient.direction.replace('deg', '°')
              }
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}