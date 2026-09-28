/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#FFFFFF',
          DEFAULT: '#FDFBF7',
          subtle: '#F7F4EB',
          border: '#E5DECE',
          darkBorder: '#D8CEBC'
        },
        ft: {
          claret: '#990000',
          darkClaret: '#7A0000',
          gold: '#D97706',
          slate: '#374151',
          marine: '#0284C7',
          emerald: '#059669',
          amber: '#D97706'
        },
        ink: {
          DEFAULT: '#111827',
          light: '#4B5563',
          muted: '#6B7280'
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace']
      },
      boxShadow: {
        'ft-card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'ft-elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}
