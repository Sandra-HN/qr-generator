module.exports = {
  purge: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    content: [
      //   "./packages/material-tailwind-react/src/components/**/*.{js,ts,jsx,tsx}",
      //   "./packages/material-tailwind-react/src/theme/components/**/**/*.{js,ts,jsx,tsx}",
      //   "./pages/**/*.{js,ts,jsx,tsx}",
      //   "./components/**/*.{js,ts,jsx,tsx}",
      //   "./redux/**/*.{js,ts,jsx,tsx}",
      //   "./public/material-tailwind-html-v2.js",
      //   "./react-draft-wysiwyg/**/*.css",
      //   "./node_modules/react-tailwindcss-select/dist/index.esm.js",
      "./node_modules/.vite/**/*.{js,ts,jsx,tsx}",
    ],
    extend: {
      colors: {
        primary: "#390050",
        secondary: "#fbfbe4",
      },
    },
  },
  variants: {},
  plugins: [],
};
