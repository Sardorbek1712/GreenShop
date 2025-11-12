# 🚀 GreenShop Setup Guide

Complete step-by-step guide to get GreenShop running on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version 18.0 or higher
  - Check: `node --version`
  - Download: https://nodejs.org/

- **npm** (comes with Node.js) or **pnpm**
  - Check: `npm --version`

## Installation Steps

### Option 1: Using this existing project

If you already have the GreenShop files:

```bash
# Navigate to the project directory
cd GreenShop

# Install all dependencies
npm install

# Start development server
npm run dev
```

### Option 2: Create from scratch

If you want to recreate the project:

```bash
# Create a new Next.js app with TypeScript and App Router
npx create-next-app@latest greenshop --typescript --app --tailwind --eslint --no-src-dir --import-alias "@/*"

# Navigate into the project
cd greenshop

# Install additional dependencies
npm install axios clsx react-icons

# Copy all the files from this repository into your new project

# Start development server
npm run dev
```

## Complete Dependency Installation

Run this single command to install everything:

```bash
npm install next@^14.2.0 react@^18.3.0 react-dom@^18.3.0 typescript@^5.4.0 axios@^1.7.0 clsx@^2.1.0 react-icons@^5.2.0 @types/node@^20.12.0 @types/react@^18.3.0 @types/react-dom@^18.3.0 tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0
```

Or using `pnpm`:

```bash
pnpm add next@^14.2.0 react@^18.3.0 react-dom@^18.3.0 typescript@^5.4.0 axios@^1.7.0 clsx@^2.1.0 react-icons@^5.2.0 @types/node@^20.12.0 @types/react@^18.3.0 @types/react-dom@^18.3.0 tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0 -D
```

## Running the Application

### Development Mode

```bash
npm run dev
```

- Opens at: http://localhost:3000
- Hot reload enabled
- Source maps for debugging

### Production Build

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

### Type Checking

```bash
# Run TypeScript compiler check without building
npm run type-check
```

### Linting

```bash
# Run ESLint to check code quality
npm run lint
```

## Verifying the Installation

After running `npm run dev`, you should see:

```
✓ Ready in 2.5s
○ Local:    http://localhost:3000
```

Visit http://localhost:3000 in your browser. You should see:

- ✅ GreenShop header with logo and navigation
- ✅ Search bar
- ✅ Grid of flower products with images
- ✅ Cart and favorites icons
- ✅ Theme toggle (moon/sun icon)
- ✅ Footer with links

## Testing Core Features

### 1. Test Shopping Cart

1. Click any product
2. On product page, click "Add to Cart"
3. Click cart icon in header
4. Verify item appears with correct details
5. Test quantity increase/decrease buttons
6. Reload page - cart should persist

### 2. Test Favorites

1. Hover over any product image
2. Click the heart icon
3. Verify it turns red
4. Click favorites badge in header
5. View filtered favorites

### 3. Test Search

1. Click search bar in header
2. Type "rose"
3. Dropdown should show matching products
4. Click a result to navigate

### 4. Test Dark Mode

1. Click moon icon in header
2. Page switches to dark theme
3. Reload - theme persists

### 5. Test Navigation

1. Click "Best Sellers" in nav
2. Should show only best seller products
3. Try other category links
4. Verify URL changes

## Troubleshooting

### Issue: Dependencies won't install

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

Or kill the process using port 3000:
```bash
# On macOS/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: TypeScript errors

**Solution:**
```bash
# Generate types
npm run build

# Or check specific errors
npm run type-check
```

### Issue: Images not loading

**Cause:** Unsplash may be blocked or slow to load

**Solution:**
- Check internet connection
- Wait a few seconds for images to load
- Fallback placeholders will show if images fail

### Issue: "Module not found" errors

**Solution:**
```bash
# Ensure all dependencies are installed
npm install

# Check if @/* path alias is configured in tsconfig.json
# It should have:
"paths": {
  "@/*": ["./*"]
}
```

### Issue: Build fails with memory error

**Solution:**
```bash
# Increase Node memory limit
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

## Environment Variables (Optional)

GreenShop works without environment variables, but you can add:

Create `.env.local`:

```bash
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# API endpoints (for future backend integration)
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Visit https://vercel.com
3. Import your repository
4. Vercel auto-detects Next.js
5. Click "Deploy"

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `.next` folder

### Deploy to custom server

```bash
# Build production bundle
npm run build

# Start on custom port
PORT=8080 npm start
```

## File Structure Reference

```
GreenShop/
├── app/                  # Pages (App Router)
├── components/           # React components
├── hooks/               # Custom hooks
├── lib/                 # Utilities & data
│   ├── constants/      # Colors & theme
│   ├── data/           # Product data
│   └── utils/          # Helper functions
├── styles/              # CSS files
├── public/              # Static assets
└── Configuration files
```

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Test all features
4. 🎨 Customize colors in `lib/constants/colors.ts`
5. 📝 Add your own products in `lib/data/products.ts`
6. 🚀 Deploy to production

## Getting Help

- **Documentation:** See README.md
- **Issues:** Check console for error messages
- **Community:** Next.js Discord, Stack Overflow

## Performance Tips

- Use `npm run build` to check bundle size
- Optimize images with Next.js Image component
- Enable Vercel Analytics for performance insights
- Use React DevTools for component profiling

---

**Congratulations! 🎉** Your GreenShop is now running. Happy coding! 🌿

