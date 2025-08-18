"use client";

import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { ImageUploadProps } from '@/types';

export default function ImageUploader({ onImageUpload, imageSrc }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    }
  }, [handleFileSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Upload Image</h3>
      
      <Card 
        className={`relative border-2 border-dashed p-8 text-center transition-all duration-200 hover:border-gray-400 ${
          isDragOver 
            ? 'border-gray-400 bg-gray-50' 
            : imageSrc 
            ? 'border-gray-300 bg-gray-50' 
            : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="image-upload"
        />
        
        <div className="flex flex-col items-center space-y-4">
          {imageSrc ? (
            <div className="flex flex-col items-center space-y-2">
              <ImageIcon className="w-12 h-12 text-gray-600" />
              <p className="text-sm font-medium text-gray-700">Image uploaded successfully!</p>
              <p className="text-xs text-gray-500">Drag a new image or click to replace</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">
                  Drag and drop an image here, or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supports JPG, JPEG, PNG, WebP
                </p>
              </div>
            </>
          )}
        </div>
      </Card>
      
      <Button 
        onClick={() => document.getElementById('image-upload')?.click()}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
        size="lg"
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Image
      </Button>
    </div>
  );
}