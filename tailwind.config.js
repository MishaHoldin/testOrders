/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
       fontFamily: {
        fira: ['FiraSans'],

        ttinterfaces: ['TTInterfaces'],
        cantarell: ['Cantarell'], // Добавляем Cantarell
        ramillas: ['TT Ramillas TRL'], // Добавляем шрифт Ramillas
      },
    },
  },
  plugins: [],
}