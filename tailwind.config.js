const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './templates/**/*.php',
        './views/**/*.twig',
        './assets/js/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                // RAM Marketing exacte kleuren
                'ram-blue': {
                    50: '#e6f3ff',
                    100: '#cce7ff',
                    200: '#99cfff',
                    300: '#66b7ff',
                    400: '#339fff',
                    500: '#0087ff',  // Primaire kleur
                    600: '#006ccc',
                    700: '#005199',
                    800: '#003666',
                    900: '#001b33',
                },
                'ram-purple': {
                    50: '#f5e6ff',
                    100: '#ebccff',
                    200: '#d799ff',
                    300: '#c366ff',
                    400: '#af33ff',
                    500: '#9b00ff',  // Secundaire kleur
                    600: '#7c00cc',
                    700: '#5d0099',
                    800: '#3e0066',
                    900: '#1f0033',
                },
                'ram-gray': {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                }
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
                display: ['Montserrat', ...defaultTheme.fontFamily.sans],
                body: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            boxShadow: {
                'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
                'medium': '0 4px 20px rgba(0, 0, 0, 0.1)',
                'hard': '0 8px 30px rgba(0, 0, 0, 0.15)',
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.ram-gray.700'),
                        a: {
                            color: theme('colors.ram-blue.500'),
                            '&:hover': {
                                color: theme('colors.ram-blue.600'),
                            },
                        },
                        h1: {
                            color: theme('colors.ram-gray.900'),
                            fontFamily: theme('fontFamily.display').join(', '),
                        },
                        h2: {
                            color: theme('colors.ram-gray.900'),
                            fontFamily: theme('fontFamily.display').join(', '),
                        },
                        h3: {
                            color: theme('colors.ram-gray.900'),
                            fontFamily: theme('fontFamily.display').join(', '),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
    ],
} 