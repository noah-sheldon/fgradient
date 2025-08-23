"use client";

import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check } from 'lucide-react';
import { PreviewAreaProps } from '@/types';
import html2canvas from 'html2canvas';

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
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        width: sizing.width,
        height: sizing.height,
        scale: window.devicePixelRatio || 2,
        useCORS: true,
        allowTaint: false,
      });
      
      // Create a new canvas with exact user-specified dimensions
      const outputCanvas = document.createElement('canvas');
      const ctx = outputCanvas.getContext('2d');
      outputCanvas.width = sizing.width * (window.devicePixelRatio || 2);
      outputCanvas.height = sizing.height * (window.devicePixelRatio || 2);
      
      if (ctx) {
        ctx.drawImage(canvas, 0, 0, outputCanvas.width, outputCanvas.height);
      }
      
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
                    width: `${sizing.width}px`,
                    height: `${sizing.height}px`,
                    borderRadius: `${sizing.borderRadius}px`,
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