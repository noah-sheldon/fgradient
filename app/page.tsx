"use client";

import React, { useState, useCallback } from 'react';
import ImageUploader from '@/components/ImageUploader';
import GradientControls from '@/components/GradientControls';
import SizingControls from '@/components/SizingControls';
import PreviewArea from '@/components/PreviewArea';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { GradientConfig, SizingConfig } from '@/types';

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalAspectRatio, setOriginalAspectRatio] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [gradient, setGradient] = useState<GradientConfig>({
    startColor: '#14b8a6',
    midColor: '#06b6d4',
    endColor: '#3b82f6',
    direction: '45deg',
    customDegree: 45,
  });

  const [sizing, setSizing] = useState<SizingConfig>({
    width: 800,
    height: 600,
    lockAspectRatio: false,
  });

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageSrc(result);
      
      // Calculate original aspect ratio
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setOriginalAspectRatio(aspectRatio);
        
        // Optionally set initial sizing based on image
        if (!sizing.lockAspectRatio) {
          setSizing(prev => ({
            ...prev,
            width: Math.min(800, img.width),
            height: Math.min(600, img.height),
          }));
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  }, [sizing.lockAspectRatio]);

  const handleDownload = useCallback(() => {
    console.log('Image downloaded successfully');
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">fg</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">fgradient</h1>
                <p className="text-sm text-gray-300 hidden sm:block">Create beautiful gradient backgrounds for your images</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-gray-800"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200
          lg:flex lg:flex-col overflow-y-auto
        `}>
          <div className="flex-1 p-6 space-y-6">
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              imageSrc={imageSrc} 
            />
            
            <GradientControls 
              gradient={gradient} 
              onGradientChange={setGradient} 
            />
            
            <SizingControls 
              sizing={sizing} 
              onSizingChange={setSizing}
              originalAspectRatio={originalAspectRatio}
            />
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Preview Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-6">
            <PreviewArea 
              imageSrc={imageSrc}
              gradient={gradient}
              sizing={sizing}
              onDownload={handleDownload}
            />
          </div>
          
          {/* Made in Bolt Badge */}
          <div className="absolute bottom-6 right-6">
            <div className="bg-black text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center space-x-2">
              <span>⚡</span>
              <span>Made in Bolt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}