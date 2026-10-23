/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--color-background) / <alpha-value>)',
                surface: 'rgb(var(--color-surface) / <alpha-value>)',
                card: 'rgb(var(--color-card) / <alpha-value>)',
                border: 'rgb(var(--color-border) / <alpha-value>)',
                foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
            },
            fontSize: {
                'hero': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
                'display': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
            },
            animation: {
                'blink': 'blink 1s step-end infinite',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                'slide-up': 'slide-up 0.6s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite',
                'float-blob': 'float-blob 8s ease-in-out infinite',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
                'marquee': 'marquee 30s linear infinite',
                'spin-slow': 'spin 20s linear infinite',
                'bounce-slow': 'bounce 3s ease-in-out infinite',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'slide-up': {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                glow: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.8' },
                },
                'float-blob': {
                    '0%, 100%': { transform: 'translateY(0px) scale(1)' },
                    '50%': { transform: 'translateY(-24px) scale(1.04)' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(124,255,155,0.15)' },
                    '50%': { boxShadow: '0 0 40px rgba(124,255,155,0.35)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
        },
    },
    plugins: [],
};