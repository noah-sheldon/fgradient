"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import ImageUploader from '@/components/ImageUploader';
import GradientControls from '@/components/GradientControls';
import SizingControls from '@/components/SizingControls';
import PreviewArea from '@/components/PreviewArea';
import { Button } from '@/components/ui/button';
import { Menu, X, Book, FileText } from 'lucide-react';
import { GradientConfig, SizingConfig } from '@/types';

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalAspectRatio, setOriginalAspectRatio] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
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
    borderRadius: 0,
  });

  // Load from localStorage after client-side hydration
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fgradient-sizing');
        if (saved) {
          const parsedSizing = JSON.parse(saved);
          setSizing(parsedSizing);
        }
      } catch (error) {
        console.warn('Failed to load sizing from localStorage:', error);
      }
    }
  }, []);

  // Save sizing to localStorage whenever it changes (only on client)
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      try {
        localStorage.setItem('fgradient-sizing', JSON.stringify(sizing));
      } catch (error) {
        console.warn('Failed to save sizing to localStorage:', error);
      }
    }
  }, [sizing, isClient]);

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
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDownload = useCallback(() => {
    console.log('Image downloaded successfully');
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white text-gray-900 shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">fg</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">fgradient</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Create beautiful gradient backgrounds for your images</p>
              </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/blogs" 
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Blog</span>
              </Link>
              <Link 
                href="/docs" 
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Book className="w-4 h-4" />
                <span>Docs</span>
              </Link>
            </nav>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-900 hover:bg-gray-100"
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
          {/* Mobile Navigation Links */}
          <div className="lg:hidden border-b border-gray-200 p-4">
            <nav className="space-y-2">
              <Link 
                href="/blogs" 
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={() => setSidebarOpen(false)}
              >
                <FileText className="w-4 h-4" />
                <span>Blog</span>
              </Link>
              <Link 
                href="/docs" 
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={() => setSidebarOpen(false)}
              >
                <Book className="w-4 h-4" />
                <span>Docs</span>
              </Link>
            </nav>
          </div>

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
          
        </div>
      </div>
    </div>
  );
}