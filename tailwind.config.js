/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#F5F0E8',
        ink: '#1C1008',
        'ink-soft': '#5A4A3A',
        periwinkle: '#7B8CDE',
        coral: '#E8553E',
        amber: '#F0A846',
        cream: '#FDFAF4',
        deep: '#12100E',
        border: '#E2DAD0'
      },
      fontFamily: {
        display: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        ui: ['Inter', 'DM Sans', 'sans-serif'],
        body: ['DM Sans', 'Inter', 'sans-serif']
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '16px',
        4: '24px',
        5: '32px',
        6: '48px',
        7: '64px',
        8: '96px',
        9: '128px'
      },
      borderRadius: {
        card: '20px',
        pill: '100px',
        badge: '100px'
      },
      boxShadow: {
        card: '0 2px 16px rgba(28,16,8,0.06)',
        'card-hover': '0 8px 32px rgba(28,16,8,0.12)'
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        reveal: 'reveal 0.7s ease-out forwards',
        slideIn: 'slideIn 0.35s ease-out forwards'
      }
    }
  },
  plugins: []
};
