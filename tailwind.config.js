/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark design system tokens
        surface: {
          DEFAULT: '#1e2128', // card / panel surface
          raised:  '#262b35', // slightly elevated surface
          overlay: '#2e3340', // hover / interactive surface
        },
        bg: {
          DEFAULT: '#13161c', // page background
          deep:    '#0d1014', // deeper background (modals backdrop)
        },
        border: {
          subtle:  '#2a2f3a',
          DEFAULT: '#363c4a',
          strong:  '#4a5165',
        },
        accent: {
          DEFAULT: '#facc15', // yellow-400 — primary accent
          dim:     '#ca9a04',
        },
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%':   { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-in-bounce': {
          '0%':   { opacity: '0', transform: 'scale(0.6)' },
          '70%':  { opacity: '1', transform: 'scale(1.08)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pop-in': {
          '0%':   { opacity: '0', transform: 'scale(0.5)' },
          '60%':  { opacity: '1', transform: 'scale(1.15)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-6px)' },
          '40%':      { transform: 'translateX(6px)' },
          '60%':      { transform: 'translateX(-4px)' },
          '80%':      { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'fade-in':             'fade-in 0.5s ease-out both',
        'fade-in-slow':        'fade-in 1s ease-out both',
        'fade-in-up':          'fade-in-up 0.5s ease-out both',
        'fade-in-up-delay':    'fade-in-up 0.5s ease-out 0.25s both',
        'fade-in-up-delay2':   'fade-in-up 0.5s ease-out 0.45s both',
        'fade-in-down':        'fade-in-down 0.45s ease-out both',
        'fade-in-down-delay':  'fade-in-down 0.45s ease-out 0.2s both',
        'scale-in':            'scale-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        'scale-in-delay':      'scale-in 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.3s both',
        'scale-in-bounce':     'scale-in-bounce 0.5s ease-out both',
        'slide-in-left':       'slide-in-left 0.4s ease-out both',
        'slide-in-right':      'slide-in-right 0.4s ease-out both',
        'pop-in':              'pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        'pop-in-delay':        'pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s both',
        'pulse-soft':          'pulse-soft 2s ease-in-out infinite',
        'shake':               'shake 0.5s ease-in-out both',
      },
    },
  },
  plugins: [],
}
