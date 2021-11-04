module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      stroke: (theme) => ({
        black: theme("colors.black"),
        white: theme("colors.white"),
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
