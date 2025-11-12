# 🌿 GreenShop - Modern Flower E-Commerce Frontend

A beautiful, modern, and fully responsive flower e-commerce website built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Features include light/dark themes, shopping cart, favorites, search functionality, and dynamic product pages.

![GreenShop](https://via.placeholder.com/1200x400/22c55e/ffffff?text=GreenShop+-+Premium+Flower+Delivery)

## ✨ Features

- 🎨 **Modern Design**: Clean, professional UI with soft shadows and neumorphism effects
- 🌓 **Light/Dark Theme**: Toggle between themes with localStorage persistence
- 🛒 **Shopping Cart**: Full cart functionality with localStorage persistence
- ❤️ **Favorites**: Save favorite products with heart icon toggle
- 🔍 **Real-time Search**: Debounced search with dropdown results
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🖼️ **Dynamic Images**: Product images from Unsplash with fallback support
- 🎯 **Category Filtering**: Best Sellers, Discounts, Most Common, New Arrivals
- 💰 **Discount Badges**: Visual discount percentages on sale items
- ♿ **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- 🎭 **Smooth Animations**: Fade-in, slide, and hover effects throughout
- 📞 **Contact Modal**: Quick access to phone number with clickable tel: link

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. **Clone or create the project directory:**

```bash
cd GreenShop
```

2. **Install all dependencies:**

```bash
npm install
```

This single command installs all required packages:
- `next` - Next.js framework
- `react` & `react-dom` - React library
- `typescript` - TypeScript support
- `tailwindcss`, `postcss`, `autoprefixer` - Styling
- `axios` - HTTP client
- `clsx` - Conditional classNames utility
- `react-icons` - Icon library (fallback for @expo/vector-icons)

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

## 📁 Project Structure

```
GreenShop/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with Header/Footer
│   ├── page.tsx                 # Home page (All products)
│   ├── best-sellers/page.tsx    # Best sellers page
│   ├── discounts/page.tsx       # Discounted products
│   ├── most-common/page.tsx     # Most common flowers
│   ├── added-recently/page.tsx  # New arrivals
│   ├── cart/page.tsx            # Shopping cart page
│   └── flower/[slug]/page.tsx   # Dynamic product detail page
├── components/                   # Reusable React components
│   ├── Header.tsx               # Main navigation header
│   ├── Footer.tsx               # Site footer
│   ├── ProductCard.tsx          # Product display card
│   ├── ProductGrid.tsx          # Grid layout for products
│   ├── SearchBar.tsx            # Search with dropdown results
│   ├── IconButton.tsx           # Reusable icon button
│   ├── Price.tsx                # Price display with discounts
│   ├── CartDrawer.tsx           # Sliding cart drawer
│   ├── FavoritesButton.tsx      # Heart icon toggle
│   └── ThemeToggle.tsx          # Light/dark theme switcher
├── hooks/                        # Custom React hooks
│   ├── useCart.ts               # Shopping cart logic
│   └── useFavorites.ts          # Favorites management
├── lib/                          # Utilities and data
│   ├── constants/
│   │   ├── colors.ts            # Color tokens (PRIMARY GREEN PALETTE)
│   │   └── theme.ts             # Light/dark theme objects
│   ├── data/
│   │   └── products.ts          # Mock product data & helpers
│   └── utils/
│       └── fetchImage.ts        # Dynamic image URL generation
├── styles/                       # Global styles
│   ├── globals.css              # Tailwind imports & CSS variables
│   ├── components.css           # Component-specific styles
│   └── utilities.css            # Utility classes
├── package.json                  # Dependencies & scripts
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🎨 Customizing the Green Color Palette

The primary green palette is centralized for easy customization. To change the brand colors:

### 1. Edit `lib/constants/colors.ts`

```typescript
export const colors = {
  primary: {
    50: '#f0fdf4',   // Lightest green
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // ← MAIN BRAND GREEN - Change this!
    600: '#16a34a',  // ← Primary button color
    700: '#15803d',
    800: '#166534',
    900: '#14532d',  // Darkest green
  },
  // ... other colors
};
```

### 2. Update `tailwind.config.js`

The Tailwind config automatically uses these tokens:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // These map to your colors.ts values
        500: '#22c55e',  // Update to match your new green
        600: '#16a34a',
        // ... etc
      },
    },
  },
}
```

### 3. Adjust CSS Variables in `styles/globals.css`

```css
:root {
  --color-primary: #16a34a;       /* Light mode primary */
  --color-primary-hover: #15803d;
}

.dark {
  --color-primary: #22c55e;       /* Dark mode primary */
  --color-primary-hover: #16a34a;
}
```

**That's it!** The entire site will update to your new color scheme.

## 🔍 Key Features Explained

### Search Functionality

The search bar in the header provides real-time product filtering:

- **Debounced Input**: 300ms delay prevents excessive filtering
- **URL Query Params**: Search queries are shareable via URL (`/?q=rose`)
- **Dropdown Results**: Shows up to 10 matching products with thumbnails
- **Multi-field Search**: Searches product name, description, tags, and category
- **Case-insensitive**: Works regardless of letter casing

Implementation: `components/SearchBar.tsx` uses Next.js `useSearchParams` and updates the URL without page reload.

### Shopping Cart

Persistent shopping cart with full CRUD operations:

- **localStorage Persistence**: Cart survives page reloads
- **Quantity Controls**: Increase/decrease with validation
- **Auto-calculation**: Subtotal, tax (10%), shipping (free over $100), and total
- **Item Management**: Add, remove, update, clear
- **Stock Validation**: Prevents adding more than available stock

Implementation: `hooks/useCart.ts` manages state and localStorage sync. Cart data is available throughout the app.

### Favorites System

Heart icon toggle for favoriting products:

- **localStorage Persistence**: Favorites saved across sessions
- **Visual Feedback**: Filled red heart for favorited items
- **Overlay on Cards**: Heart button appears on product image hover
- **Favorites Page**: Filter view showing only favorited products (`/?favorites=true`)
- **Count Badge**: Header shows favorite count

Implementation: `hooks/useFavorites.ts` manages favorite IDs. `FavoritesButton.tsx` provides the UI component.

### Dark Mode Theme

Comprehensive dark theme with smooth transitions:

- **localStorage Persistence**: Theme choice remembered
- **System Preference**: Defaults to OS dark mode setting
- **CSS Variables**: Theme tokens defined in `:root` and `.dark`
- **Tailwind Classes**: Uses `dark:` modifier throughout
- **No Flash**: Prevents theme flash on page load

Implementation: `components/ThemeToggle.tsx` toggles `.dark` class on `<html>` element. Theme is applied before render to prevent flash.

### Dynamic Product Images

Product images are fetched from Unsplash without API keys:

- **Curated Image Map**: Each product has a specific Unsplash photo ID
- **Size Optimization**: Different sizes for thumbnails (400px) and detail pages (1200px)
- **Fallback Support**: Placeholder images if Unsplash unavailable
- **Next.js Image**: Uses `next/image` for optimization
- **Remote Patterns**: Configured in `next.config.js`

Implementation: `lib/utils/fetchImage.ts` provides image URL generation functions. `FLOWER_IMAGE_MAP` contains predefined photo IDs for consistent, high-quality images.

## 🎭 Icons Integration

### React Icons (Primary Solution)

This project uses **react-icons** which provides a comprehensive icon library:

```typescript
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
```

**Advantages:**
- ✅ Works seamlessly on web
- ✅ No configuration needed
- ✅ Tree-shakeable (only imports used icons)
- ✅ Multiple icon sets (FontAwesome, Material, etc.)

### @expo/vector-icons (Alternative - Not Recommended for Web)

If you need @expo/vector-icons (primarily for React Native):

1. Install the package:
```bash
npm install @expo/vector-icons
```

2. Add web support (requires additional setup):
```bash
npm install react-native-web react-native-svg
```

3. Update `next.config.js`:
```javascript
const withTM = require('next-transpile-modules')([
  '@expo/vector-icons',
  'react-native-web',
  'react-native-svg',
]);

module.exports = withTM({
  // ... existing config
});
```

**Note:** @expo/vector-icons is designed for React Native. For web-only projects, **react-icons is the recommended solution** and is already configured in this project.

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety and better DX |
| **Tailwind CSS** | Utility-first CSS framework |
| **React Icons** | Icon library (FontAwesome, Material, etc.) |
| **Axios** | HTTP client (ready for API integration) |
| **clsx** | Conditional className utility |
| **Inter Font** | Google Font for clean typography |

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column grid)
- **Tablet**: 640px - 1024px (2 column grid)
- **Desktop**: 1024px+ (3-4 column grid)

All components are mobile-first and fully responsive.

## ♿ Accessibility Features

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Enter, Escape)
- Focus visible states with ring outlines
- Alt text on all images
- Color contrast meets WCAG AA standards
- Screen reader friendly

## 🎯 Available Pages

| Route | Description |
|-------|-------------|
| `/` | All products (home page) |
| `/best-sellers` | Products marked as best sellers |
| `/discounts` | Products with active discounts |
| `/most-common` | Most commonly purchased flowers |
| `/added-recently` | Newest products (sorted by date) |
| `/cart` | Shopping cart with checkout |
| `/flower/[slug]` | Individual product detail page |
| `/?q=search` | Search results |
| `/?favorites=true` | Favorite products only |

## 🧪 Testing the Application

### Test Shopping Flow

1. Browse products on home page
2. Click a product to view details
3. Add to cart with quantity selection
4. Click cart icon to view cart
5. Adjust quantities or remove items
6. Proceed to checkout (displays confirmation)

### Test Favorites

1. Hover over product image
2. Click heart icon
3. Click favorites count in header
4. View all favorited items

### Test Search

1. Type in search bar (e.g., "rose")
2. View dropdown results
3. Click result to navigate

### Test Dark Mode

1. Click moon/sun icon in header
2. Verify theme persists on reload

## 🔧 Troubleshooting

### Images not loading?

- Check internet connection (images from Unsplash)
- Verify `next.config.js` has correct `remotePatterns`
- Fallback placeholders should display if Unsplash fails

### Cart/Favorites not persisting?

- Check browser localStorage is enabled
- Clear localStorage and try again: `localStorage.clear()`

### TypeScript errors?

- Run `npm run type-check` to see all errors
- Ensure all dependencies installed: `npm install`

### Build fails?

- Delete `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Run build again: `npm run build`

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

For questions or support, use the call button in the header to reach us at **+4916099661885**.

---

Built with ❤️ and 🌿 by the GreenShop team.

