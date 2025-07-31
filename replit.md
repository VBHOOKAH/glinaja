# Dark Theme Website

## Overview

This is a static multilingual website with a dark theme design. The project is a simple frontend-only application that serves static HTML pages with bilingual support (English and Bulgarian) and modern dark UI styling. It features a responsive design with navigation between different sections including services and about pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML, CSS, and vanilla JavaScript
- **Styling Approach**: CSS custom properties (CSS variables) for consistent theming
- **Icon System**: Feather Icons via CDN for consistent iconography
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox

### Internationalization (i18n)
- **Language Support**: English and Bulgarian
- **Implementation**: Custom JavaScript solution using data attributes
- **Storage**: Browser localStorage for language preference persistence
- **Switching**: Real-time language switching without page reload

### Serving Strategy
- **Development Server**: http-server package for local development
- **Static Files**: All content served as static files (HTML, CSS, JS)
- **No Build Process**: Direct file serving without compilation or bundling

## Key Components

### Core Files
1. **index.html** - Main landing page with navigation
2. **page1.html** - Services page
3. **page2.html** - About page (partial implementation)
4. **styles.css** - Complete styling system with CSS variables
5. **script.js** - Language switching and UI interaction logic

### UI Components
- **Header**: Contains language switcher and Google rating link
- **Language Switcher**: Dropdown interface for language selection
- **Navigation Cards**: Grid-based navigation system
- **Service Cards**: Structured content presentation
- **Back Navigation**: Consistent navigation between pages

### Styling System
- **CSS Variables**: Centralized theming with custom properties
- **Color Scheme**: Dark theme with blue accent colors
- **Typography**: System font stack for optimal performance
- **Layout**: CSS Grid and Flexbox for responsive design

## Data Flow

### Language Management
1. User selects language from dropdown
2. JavaScript updates DOM elements with data attributes
3. Language preference saved to localStorage
4. On page load, saved preference is applied

### Navigation Flow
- **Landing Page** → **Services Page** → **Back to Landing**
- **Landing Page** → **About Page** → **Back to Landing**
- Consistent header across all pages

### Static Content Delivery
- Direct file serving with no server-side processing
- CSS and JavaScript loaded via standard HTML linking
- External dependencies (Feather Icons) loaded via CDN

## External Dependencies

### CDN Resources
- **Feather Icons**: https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.0/feather.min.css
- **Purpose**: Provides consistent icon set for UI elements

### Development Dependencies
- **http-server**: Local development server for serving static files
- **Version**: ^14.1.1
- **Usage**: Simple static file serving without configuration

### Third-party Integrations
- **Google Rating Link**: External link to Google search for rating functionality
- **No Analytics**: No tracking or analytics currently implemented

## Deployment Strategy

### Current Setup
- **Development**: Local serving via http-server package
- **Production Ready**: Static files can be deployed to any web server
- **No Build Step**: Files are deployment-ready as-is

### Deployment Options
- **Static Hosting**: Suitable for Netlify, Vercel, GitHub Pages, or any CDN
- **Traditional Hosting**: Can be served from any web server (Apache, Nginx, etc.)
- **Requirements**: No server-side processing needed

### Performance Considerations
- **Minimal Dependencies**: Only one external CSS dependency
- **Optimized Assets**: Lightweight vanilla JavaScript implementation
- **Caching Strategy**: Static files benefit from standard browser caching
- **Mobile Performance**: Responsive design optimized for mobile devices

### Scalability Notes
- Current architecture supports easy addition of new pages
- Language system can be extended to support additional languages
- CSS variable system allows for easy theme customization
- Modular structure supports incremental feature additions