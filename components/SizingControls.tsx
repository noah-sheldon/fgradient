"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { SizingControlsProps } from '@/types';

export default function SizingControls({ 
  sizing, 
  onSizingChange, 
  originalAspectRatio 
}: SizingControlsProps) {
  const handleWidthChange = (values: number[]) => {
    const newWidth = values[0];
    let newHeight = sizing.height;
    
    if (sizing.lockAspectRatio && originalAspectRatio) {
      newHeight = Math.round(newWidth / originalAspectRatio);
    }
    
    onSizingChange({
      ...sizing,
      width: newWidth,
      height: newHeight,
    });
  };

  const handleHeightChange = (values: number[]) => {
    const newHeight = values[0];
    let newWidth = sizing.width;
    
    if (sizing.lockAspectRatio && originalAspectRatio) {
      newWidth = Math.round(newHeight * originalAspectRatio);
    }
    
    onSizingChange({
      ...sizing,
      width: newWidth,
      height: newHeight,
    });
  };

  const handleWidthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 100;
    const clampedWidth = Math.max(100, Math.min(2000, newWidth));
    let newHeight = sizing.height;
    
    if (sizing.lockAspectRatio && originalAspectRatio) {
      newHeight = Math.round(clampedWidth / originalAspectRatio);
    }
    
    onSizingChange({
      ...sizing,
      width: clampedWidth,
      height: newHeight,
    });
  };

  const handleHeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 100;
    const clampedHeight = Math.max(100, Math.min(2000, newHeight));
    let newWidth = sizing.width;
    
    if (sizing.lockAspectRatio && originalAspectRatio) {
      newWidth = Math.round(clampedHeight * originalAspectRatio);
    }
    
    onSizingChange({
      ...sizing,
      width: newWidth,
      height: clampedHeight,
    });
  };
  const handleAspectRatioToggle = (checked: boolean) => {
    onSizingChange({
      ...sizing,
      lockAspectRatio: checked,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Canvas Size</h3>
      
      <Card className="p-6 space-y-6 border border-gray-200">
        {/* Aspect Ratio Lock */}
        <div className="flex items-center space-x-3">
          <Checkbox
            id="aspect-ratio"
            checked={sizing.lockAspectRatio}
            onCheckedChange={handleAspectRatioToggle}
            className="data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
          />
          <Label 
            htmlFor="aspect-ratio" 
            className="text-sm font-medium text-gray-800 cursor-pointer"
          >
            Lock Aspect Ratio
          </Label>
        </div>

        {/* Width Control */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-gray-800">Width</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="100"
                max="2000"
                value={sizing.width}
                onChange={handleWidthInputChange}
                className="w-20 h-8 text-xs font-mono text-center"
              />
              <span className="text-xs text-gray-500">px</span>
            </div>
          </div>
          <Slider
            value={[sizing.width]}
            onValueChange={handleWidthChange}
            min={100}
            max={2000}
            step={10}
            className="w-full [&>span:first-child]:bg-gray-200 [&_[role=slider]]:bg-gray-900 [&_[role=slider]]:border-gray-900"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>100px</span>
            <span>2000px</span>
          </div>
        </div>

        {/* Height Control */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-gray-800">Height</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="100"
                max="2000"
                value={sizing.height}
                onChange={handleHeightInputChange}
                className="w-20 h-8 text-xs font-mono text-center"
              />
              <span className="text-xs text-gray-500">px</span>
            </div>
          </div>
          <Slider
            value={[sizing.height]}
            onValueChange={handleHeightChange}
            min={100}
            max={2000}
            step={10}
            className="w-full [&>span:first-child]:bg-gray-200 [&_[role=slider]]:bg-gray-900 [&_[role=slider]]:border-gray-900"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>100px</span>
            <span>2000px</span>
          </div>
        </div>

        {/* Dimensions Info */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Canvas Size:</span>
              <span className="font-mono">{sizing.width} × {sizing.height}px</span>
            </div>
            <div className="flex justify-between">
              <span>Aspect Ratio:</span>
              <span className="font-mono">
                {sizing.width && sizing.height 
                  ? (sizing.width / sizing.height).toFixed(2) 
                  : 'N/A'
                }
              </span>
            </div>
            {originalAspectRatio && (
              <div className="flex justify-between">
                <span>Original Ratio:</span>
                <span className="font-mono">{originalAspectRatio.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}