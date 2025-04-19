import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', 'system-ui'],
      'soria': ['SORIA', 'system-ui'],
      'plus-jakarta': ['Plus Jakarta Sans', 'system-ui'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        'navy': '#2B3B4E',
        'sage': '#557B6E',
        'aqua': '#7FB5B5',
        'cream': '#F5E6D3',
        'soft-navy': '#3A4A5D',
        'deep-sage': '#456B5E',
        'light-aqua': '#8FC5C5',
        'warm-cream': '#FFE6D3',
        
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#557B6E',
          foreground: '#F5E6D3'
        },
        secondary: {
          DEFAULT: '#7FB5B5',
          foreground: '#2B3B4E'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: '#F5E6D3',
          foreground: '#2B3B4E'
        },
        accent: {
          DEFAULT: '#7FB5B5',
          foreground: '#2B3B4E'
        },
        popover: {
          DEFAULT: '#F5E6D3',
          foreground: '#2B3B4E'
        },
        card: {
          DEFAULT: '#F5E6D3',
          foreground: '#2B3B4E'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
