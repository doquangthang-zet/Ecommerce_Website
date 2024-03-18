/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
      extend: {
        boxShadow: {
          'all': '0 0 10px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
        width: {
          '48%': '48%',
          '128': '32rem',
          "1/10": "10%",
          "15%": "15%",
        },
        height: {
          '48%': '48%',
          '100': '28rem',
        },
        lineHeight: {
          '2': "8px",
        },
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
    plugins: [],
}