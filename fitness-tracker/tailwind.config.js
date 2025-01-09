/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins:['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'workoutBackground':'url(./assets/background1.jpeg)',
        'background2': 'url(./assets/background2.jpg)',
        'formImage':'url(./assets/FormImage.jpeg)',
      },
      colors: {
        'specialCream': '#FEF9E1',
        'specialGray':'#727D73',
      },
    },
  },
  plugins: [],
}

