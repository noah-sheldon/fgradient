# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Architecture

This is a Next.js 13.5 application built as a gradient background image generator tool called "fgradient". The app uses static export (`output: 'export'` in next.config.js) for deployment.

### Core Structure

- **Next.js App Router**: Uses the app directory structure with a single page application
- **Static Export**: Configured for static site generation without server-side features
- **UI Framework**: Built with shadcn/ui components and Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **TypeScript**: Strict TypeScript configuration with path aliases (`@/*` maps to root)

### Key Components

The application has four main feature components in `/components/`:
- `ImageUploader` - Handles file upload and preview
- `GradientControls` - UI for configuring gradient colors and direction
- `SizingControls` - Controls for output dimensions and aspect ratio
- `PreviewArea` - Canvas/preview area with download functionality

### State Management

The main page (`app/page.tsx`) manages all state using React hooks:
- `imageSrc` - Uploaded image data URL
- `gradient` - Gradient configuration (GradientConfig type)
- `sizing` - Output sizing configuration (SizingConfig type)
- `sidebarOpen` - Mobile sidebar visibility

### Component Library

Uses shadcn/ui with extensive Radix UI components. The `components/ui/` directory contains 40+ pre-built components. The `cn()` utility function in `lib/utils.ts` combines clsx and tailwind-merge for className handling.

### TypeScript Types

All interfaces are defined in `types/index.ts`:
- Component prop interfaces follow the pattern `[ComponentName]Props`
- Configuration objects use `[Feature]Config` naming

### Responsive Design

The layout uses a sidebar pattern that collapses on mobile with an overlay. The main content area adapts to different screen sizes while maintaining the preview functionality.

### Package Management

Uses npm with package-lock.json. The project includes comprehensive dependencies for UI components, form handling (react-hook-form), image manipulation (html2canvas), and charts (recharts).