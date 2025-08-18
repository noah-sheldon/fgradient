"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GradientControlsProps } from '@/types';

const presetDirections = [
  { label: 'Horizontal (90°)', value: '90deg' },
  { label: 'Vertical (180°)', value: '180deg' },
  { label: 'Diagonal (45°)', value: '45deg' },
  { label: 'Diagonal (135°)', value: '135deg' },
  { label: 'Custom', value: 'custom' },
];

export default function GradientControls({ gradient, onGradientChange }: GradientControlsProps) {
  const handleColorChange = (colorType: 'startColor' | 'midColor' | 'endColor', value: string) => {
    onGradientChange({
      ...gradient,
      [colorType]: value,
    });
  };

  const handleDirectionChange = (value: string) => {
    onGradientChange({
      ...gradient,
      direction: value,
    });
  };

  const handleCustomDegreeChange = (value: string) => {
    const degree = parseInt(value) || 0;
    onGradientChange({
      ...gradient,
      customDegree: degree,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Gradient Controls</h3>
      
      <Card className="p-6 space-y-6 border border-gray-200">
        {/* Color Controls */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-800 mb-3">Colors</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="start-color" className="text-xs font-medium text-gray-700">
                Start Color
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="start-color"
                  type="color"
                  value={gradient.startColor}
                  onChange={(e) => handleColorChange('startColor', e.target.value)}
                  className="w-12 h-10 p-1 border-2 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={gradient.startColor}
                  onChange={(e) => handleColorChange('startColor', e.target.value)}
                  className="flex-1 text-xs font-mono"
                  placeholder="#FF0000"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mid-color" className="text-xs font-medium text-gray-700">
                Mid Color
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="mid-color"
                  type="color"
                  value={gradient.midColor}
                  onChange={(e) => handleColorChange('midColor', e.target.value)}
                  className="w-12 h-10 p-1 border-2 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={gradient.midColor}
                  onChange={(e) => handleColorChange('midColor', e.target.value)}
                  className="flex-1 text-xs font-mono"
                  placeholder="#00FF00"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-color" className="text-xs font-medium text-gray-700">
                End Color
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="end-color"
                  type="color"
                  value={gradient.endColor}
                  onChange={(e) => handleColorChange('endColor', e.target.value)}
                  className="w-12 h-10 p-1 border-2 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={gradient.endColor}
                  onChange={(e) => handleColorChange('endColor', e.target.value)}
                  className="flex-1 text-xs font-mono"
                  placeholder="#0000FF"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Direction Controls */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-800">Direction</h4>
          
          <Select value={gradient.direction} onValueChange={handleDirectionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              {presetDirections.map((direction) => (
                <SelectItem key={direction.value} value={direction.value}>
                  {direction.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {gradient.direction === 'custom' && (
            <div className="space-y-2">
              <Label htmlFor="custom-degree" className="text-xs font-medium text-gray-700">
                Custom Degree (0-360°)
              </Label>
              <Input
                id="custom-degree"
                type="number"
                min="0"
                max="360"
                value={gradient.customDegree}
                onChange={(e) => handleCustomDegreeChange(e.target.value)}
                className="w-full"
                placeholder="45"
              />
            </div>
          )}
        </div>

        {/* Gradient Preview */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Preview</Label>
          <div 
            className="w-full h-16 rounded-lg border-2 border-gray-200"
            style={{
              background: `linear-gradient(${
                gradient.direction === 'custom' ? `${gradient.customDegree}deg` : gradient.direction
              }, ${gradient.startColor}, ${gradient.midColor}, ${gradient.endColor})`
            }}
          />
        </div>
      </Card>
    </div>
  );
}