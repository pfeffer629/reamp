/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buttonBg: "#111111",
        sidebarMenuHoverBg: "#222222",
        searchBarText: "#949494",
        sidebarBg: "#131313",
        darkLine: "#1F1F1F",
        whiteDisabled: "#6F6F6F",
        selectedTab: "#34F3FF",
        blackSecondary: "#171717",
        // primary: "#cc1f28",
        // bg: "#ffffff",
        // bgDark: "#12161b",
        // bgLighter: "#f8f8f8",
        // bgLighterDark: "#1b2129",
        // borderColorDark: "#12161b",
        brown: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
        },
        verifiedSign: "rgb(32, 129, 226)",
        verifiedSignHover: "rgb(24, 104, 183)",
      },
      fontFamily: {
        Gilroy: ["Gilroy-Semibold"],
        pangram: ["Pangram"],
        sans: ["Pangram", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      fontFamily: ["hover", "focus"],
    },
  },
  plugins: [],
  corePlugins: {
    fontFamily: true,
  },
};
