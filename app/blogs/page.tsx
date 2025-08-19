import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'fgradient Blog - Gradient Design Tips & Image Editing Tutorials',
  description: 'Discover the latest trends in gradient design, image editing tips, social media graphics tutorials, and creative inspiration for your visual projects.',
  keywords: [
    'gradient design blog',
    'image editing tutorials',
    'social media graphics',
    'design inspiration',
    'gradient trends',
    'visual design tips',
    'photo editing guides',
    'creative tutorials',
    'design blog',
    'gradient effects',
    'background design',
    'Instagram graphics',
    'Twitter headers',
    'LinkedIn banners'
  ],
  openGraph: {
    title: 'fgradient Blog - Design Tips & Tutorials',
    description: 'Latest gradient design trends, tutorials, and creative inspiration.',
    url: 'https://fgradient.com/blogs',
  },
};

const blogPosts = [
  {
    id: 1,
    title: '10 Trending Gradient Color Combinations for 2024',
    excerpt: 'Explore the hottest gradient color palettes that are dominating design trends this year. From vibrant sunset themes to subtle pastel blends.',
    author: 'Design Team',
    date: '2024-08-15',
    readTime: '5 min read',
    tags: ['Gradients', 'Color Theory', 'Trends'],
    image: '/blog/gradient-trends-2024.jpg',
  },
  {
    id: 2,
    title: 'How to Create Perfect Instagram Story Backgrounds',
    excerpt: 'Step-by-step guide to designing eye-catching Instagram story backgrounds using gradient overlays and custom dimensions.',
    author: 'Social Media Expert',
    date: '2024-08-12',
    readTime: '7 min read',
    tags: ['Instagram', 'Social Media', 'Tutorial'],
    image: '/blog/instagram-stories.jpg',
  },
  {
    id: 3,
    title: 'The Psychology of Colors in Gradient Design',
    excerpt: 'Understanding how different color combinations affect viewer emotions and engagement in your visual designs.',
    author: 'UX Designer',
    date: '2024-08-10',
    readTime: '8 min read',
    tags: ['Color Psychology', 'UX Design', 'Theory'],
    image: '/blog/color-psychology.jpg',
  },
  {
    id: 4,
    title: 'Creating Professional LinkedIn Banners with Gradients',
    excerpt: 'Professional tips for designing LinkedIn banners that stand out while maintaining a business-appropriate aesthetic.',
    author: 'Brand Strategist',
    date: '2024-08-08',
    readTime: '6 min read',
    tags: ['LinkedIn', 'Professional Design', 'Branding'],
    image: '/blog/linkedin-banners.jpg',
  },
  {
    id: 5,
    title: 'Gradient Overlays: When and How to Use Them',
    excerpt: 'Master the art of gradient overlays to enhance readability, create depth, and add visual interest to your images.',
    author: 'Photo Editor',
    date: '2024-08-05',
    readTime: '9 min read',
    tags: ['Photo Editing', 'Overlays', 'Advanced'],
    image: '/blog/gradient-overlays.jpg',
  },
  {
    id: 6,
    title: 'Mobile-First Design: Optimizing Gradients for Small Screens',
    excerpt: 'Essential considerations for creating gradient backgrounds that look stunning on mobile devices and tablets.',
    author: 'Mobile Designer',
    date: '2024-08-03',
    readTime: '5 min read',
    tags: ['Mobile Design', 'Responsive', 'Optimization'],
    image: '/blog/mobile-gradients.jpg',
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">fgradient Blog</h1>
              <p className="text-gray-600 mt-2">Design tips, tutorials, and creative inspiration</p>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <div className="mb-12">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-none">
            <div className="flex items-center gap-2 text-sm text-blue-600 mb-4">
              <Tag className="w-4 h-4" />
              Featured Post
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {blogPosts[0].title}
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {blogPosts[0].excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>{blogPosts[0].author}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blogPosts[0].date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blogPosts[0].readTime}
                </div>
              </div>
              <Button>Read More</Button>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Read Article
              </Button>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="p-8 mt-16 bg-gradient-to-r from-teal-50 to-blue-50 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with Design Trends
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest gradient design tips, tutorials, and creative inspiration delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Button className="bg-teal-600 hover:bg-teal-700">
              Subscribe
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}