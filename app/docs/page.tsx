import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Book, Play, Download, Settings, Upload, Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'fgradient Docs - Complete Tutorial & User Guide',
  description: 'Complete step-by-step tutorials for creating stunning gradient backgrounds, image editing, and design tips. Learn how to use fgradient like a pro.',
  keywords: [
    'fgradient tutorial',
    'gradient background tutorial',
    'image editing guide',
    'how to create gradients',
    'gradient design tutorial',
    'photo editing tutorial',
    'background generator guide',
    'gradient overlay tutorial',
    'image effects guide',
    'visual design tutorial',
    'social media graphics tutorial',
    'gradient maker guide',
    'online editor tutorial',
    'design tools guide'
  ],
  openGraph: {
    title: 'fgradient Docs - Complete Tutorial & User Guide',
    description: 'Step-by-step tutorials for creating stunning gradient backgrounds and editing images.',
    url: 'https://fgradient.com/docs',
  },
};

const tutorials = [
  {
    id: 1,
    title: 'Getting Started with fgradient',
    description: 'Learn the basics of uploading images and creating your first gradient background.',
    icon: Play,
    sections: [
      'Uploading your first image',
      'Understanding the interface',
      'Basic gradient controls',
      'Downloading your creation'
    ]
  },
  {
    id: 2,
    title: 'Gradient Color Controls',
    description: 'Master the art of color selection and gradient direction for stunning effects.',
    icon: Palette,
    sections: [
      'Color picker basics',
      'Hex color input',
      'Gradient direction options',
      'Color harmony principles'
    ]
  },
  {
    id: 3,
    title: 'Sizing & Dimensions',
    description: 'Perfect control over your image dimensions and aspect ratios.',
    icon: Settings,
    sections: [
      'Setting custom dimensions',
      'Aspect ratio presets',
      'Border radius control',
      'Resolution considerations'
    ]
  },
  {
    id: 4,
    title: 'Advanced Features',
    description: 'Explore copy/paste functionality, keyboard shortcuts, and pro tips.',
    icon: Upload,
    sections: [
      'Paste from clipboard',
      'Keyboard shortcuts',
      'Batch processing tips',
      'Quality optimization'
    ]
  }
];

const quickTips = [
  {
    tip: 'Use Ctrl/Cmd + V to paste images directly from your clipboard',
    category: 'Keyboard Shortcuts'
  },
  {
    tip: 'Try complementary colors for vibrant gradient effects',
    category: 'Color Theory'
  },
  {
    tip: 'Use 16:9 aspect ratio for social media covers',
    category: 'Social Media'
  },
  {
    tip: 'Add subtle border radius (5-15px) for modern look',
    category: 'Design Tips'
  },
  {
    tip: 'Copy gradient settings to clipboard for easy sharing',
    category: 'Workflow'
  },
  {
    tip: 'Use diagonal gradients for dynamic energy',
    category: 'Visual Impact'
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">fgradient Documentation</h1>
              <p className="text-gray-600 mt-2">Complete tutorials and guides</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Editor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Start Guide */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get up and running with fgradient in just a few steps. Create beautiful gradient backgrounds in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Upload Image</h3>
              <p className="text-sm text-gray-600">
                Drag & drop or click to upload your image, or paste directly with Ctrl+V
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Colors</h3>
              <p className="text-sm text-gray-600">
                Select gradient colors using the color pickers or enter hex values manually
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Adjust Settings</h3>
              <p className="text-sm text-gray-600">
                Set dimensions, border radius, and gradient direction to perfection
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Download</h3>
              <p className="text-sm text-gray-600">
                Download your creation or copy it to clipboard for instant use
              </p>
            </Card>
          </div>
        </section>

        {/* Detailed Tutorials */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Detailed Tutorials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <tutorial.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {tutorial.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {tutorial.sections.map((section, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          {section}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm">
                      <Book className="w-4 h-4 mr-2" />
                      View Tutorial
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Tips & Tricks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickTips.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="text-xs font-medium text-blue-600 mb-2">
                  {item.category}
                </div>
                <p className="text-gray-900 font-medium">
                  {item.tip}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Common Use Cases */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Common Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Social Media Graphics</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Instagram posts: 1080x1080px</li>
                <li>• Instagram stories: 1080x1920px</li>
                <li>• Twitter headers: 1500x500px</li>
                <li>• LinkedIn banners: 1584x396px</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Website Headers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Hero banners: 1920x800px</li>
                <li>• Section backgrounds: 1200x400px</li>
                <li>• Blog headers: 800x400px</li>
                <li>• Newsletter headers: 600x300px</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Presentation Slides</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• PowerPoint: 1920x1080px</li>
                <li>• Google Slides: 1920x1080px</li>
                <li>• Keynote: 1920x1080px</li>
                <li>• PDF covers: 1200x1600px</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How do I paste images from my clipboard?</h3>
              <p className="text-gray-600">
                Simply press Ctrl+V (or Cmd+V on Mac) while on the fgradient page, or click the "Paste Image" button in the upload area.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What image formats are supported?</h3>
              <p className="text-gray-600">
                fgradient supports all common image formats including JPG, PNG, GIF, WebP, and more. Images are automatically processed and optimized.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Can I save my gradient settings?</h3>
              <p className="text-gray-600">
                Yes! Your width and height settings are automatically saved in your browser. You can also copy gradient settings to clipboard for easy sharing.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Is there a maximum file size limit?</h3>
              <p className="text-gray-600">
                For optimal performance, we recommend images under 10MB. Larger images may take longer to process but are supported.
              </p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}