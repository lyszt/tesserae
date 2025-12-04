import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { compression } from 'vite-plugin-compression2'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from '@tailwindcss/vite';
import path from 'path'

export default defineConfig({
  // We assume users have modern browsers. This removes polyfills.
  build: {
    target: 'esnext', 
    modulePreload: {
      polyfill: false, // Don't ship the module preload polyfill (saves ~2kb)
    },
    minify: 'esbuild', // Fast and effective for JS
    cssMinify: 'lightningcss', // 2. Use LightningCSS (Rust) for styles. Better than esbuild.
    reportCompressedSize: true, // Let's see the savings
  },

  // Resolve aliases for editor and bundler path mapping
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },

  // 3. LightningCSS Configuration
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: {
        chrome: 120, // Aggressive targeting
        safari: 17,
        firefox: 120,
      },
    },
  },

  plugins: [
    solid(),
    tailwindcss(),
    
    // 4. Image Optimizer
    // Optimizes SVG, PNG, JPG at build time.
    ViteImageOptimizer({
      svg: {
        multipass: true,
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeDimensions', active: true },
        ],
      },
      png: { quality: 80 },
      jpeg: { quality: 75 },
      webp: { lossless: true },
    }),

    // 5. Brotli Compression (The heavy lifter)
    // Creates .br files. Your C-Kernel will serve these directly.
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      deleteOriginalAssets: false, // Keep originals just in case
    }),

    // 6. Visualizer
    // Generates a stats.html file so you can see exactly what is taking up space.
    visualizer({
      emitFile: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})