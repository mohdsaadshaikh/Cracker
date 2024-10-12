/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Make sure this is correctly imported
  daisyui: {
    themes: ["light", "dark"], // Ensure "light" and "dark" themes are available
  },
};
