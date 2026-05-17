import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        ink: {
          900: '#05060a',
          800: '#0a0d14',
          700: '#0f1320',
          600: '#141a2c',
        },
        accent: {
          blue: '#3b82f6',
          electric: '#0ea5ff',
          cyan: '#22d3ee',
          purple: '#8b5cf6',
          violet: '#a78bfa',
          glow: '#60a5fa',
        },
        signal: {
          green: '#10b981',
          amber: '#f59e0b',
          red: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern':
          'linear-gradient(to right, rgba(59, 130, 246, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.07) 1px, transparent 1px)',
        'hero-glow':
          'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.18), rgba(139, 92, 246, 0.08) 40%, transparent 70%)',
      },
      backgroundSize: {
        grid: '60px 60px',
        'grid-sm': '32px 32px',
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'gradient-y': 'gradient-y 8s ease infinite',
        'gradient-xy': 'gradient-xy 14s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite alternate',
        scan: 'scan 4s linear infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 40s linear infinite',
        marquee: 'marquee 40s linear infinite',
        'fade-in-up': 'fade-in-up 0.8s ease forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59,130,246,0.18)' },
          '100%': { boxShadow: '0 0 40px rgba(139,92,246,0.32)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(59,130,246,0.25)',
        'glow-lg': '0 0 60px rgba(59,130,246,0.35)',
        'glow-purple': '0 0 40px rgba(139,92,246,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
