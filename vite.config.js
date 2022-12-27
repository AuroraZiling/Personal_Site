import solid from 'solid-start/vite'
import unocss from 'unocss/vite'
import resolver from './scripts/resolver'
import replaceMath from './scripts/replaceMath'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    host: '127.0.0.1'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [
    replaceMath(),
    {
      ...(await import('@mdx-js/rollup')).default({
        jsx: true,
        jsxImportSource: 'solid-mdx',
        providerImportSource: 'solid-mdx'
      }),
      enforce: 'pre'
    },
    resolver(),
    solid({ extensions: ['.mdx', '.md'] }),
    unocss()
  ]
})
