export interface GradientConfig {
  startColor: string;
  midColor: string;
  endColor: string;
  direction: string;
  customDegree: number;
}

export interface SizingConfig {
  width: number;
  height: number;
  lockAspectRatio: boolean;
  borderRadius: number;
}

export interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  imageSrc: string | null;
}

export interface GradientControlsProps {
  gradient: GradientConfig;
  onGradientChange: (gradient: GradientConfig) => void;
}

export interface SizingControlsProps {
  sizing: SizingConfig;
  onSizingChange: (sizing: SizingConfig) => void;
  originalAspectRatio: number | null;
}

export interface PreviewAreaProps {
  imageSrc: string | null;
  gradient: GradientConfig;
  sizing: SizingConfig;
  onDownload: () => void;
}