module.exports = {
  content: [
    './index.html',          // Archivo principal de HTML
    './src/**/*.{vue,js,ts}', // Archivos Vue, JavaScript o TypeScript en la carpeta src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f8ceb"
      }
    },
  },
  plugins: [],
};
