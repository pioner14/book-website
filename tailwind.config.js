/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#2d3748', // Темно-серый для текста
        },
        paper: {
          DEFAULT: '#f7f1e3', // Теплый оттенок старой бумаги
        },
        primary: {
          DEFAULT: '#4a5568', // Более темный серо-синий
        },
        accent: {
          DEFAULT: '#d69e2e', // Золотисто-желтый акцент
        },
        secondary: {
          DEFAULT: '#718096', // Серый для второстепенного текста
        },
        parchment: {
          DEFAULT: '#f7fafc', // Светло-синий фон
        }
      },
      fontFamily: {
        body: ['Merriweather', 'serif'],
        heading: ['Pacifico', 'cursive'],
        serif: ['Merriweather', 'serif'],
        lora: ['Lora', 'serif'],
        garamond: ['EB Garamond', 'serif'],
        'pt-serif': ['PT Serif', 'serif'],
        'heading-serif': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
        '.bg-body-pattern': {
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmYWZhZmEiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')",
          backgroundSize: '40px 40px',
        }
      })
    },
  ],
}

