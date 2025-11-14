/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "british-green-0": "#006E3E",
        "british-green-1": "#004225",
        "british-green-2": "#005F36",
        "british-green-3": "#165E3F",
        "british-green-4": "#1A704B",
        "british-green-5": "#7DD181",
        "light-green": "#AAAE7F",
        beige: "#D0D6B3",
        "orange-1": "#FF6B35",
        "orange-2": "#DF6B35",
        "orange-3": "#f5a105",
        "orange-4": "#DE9204",
        "light-purple": "#DECDF5",
        "light-purple-2": "#6A5B6E",
      },
      screens: {
        xs: { max: "639px" },
        "sm-md": { max: "891px" },
        // 'sm-md': {'min': '769px', 'max': '891px'},
      },
    },
    // fontFamily: {
    //   Rubik: ['rubik', 'sans-serif'],
    // },
    // fontWeight: {
    //   light: '300',
    //   regular: '400',
    //   medium: '500',
    //   semibold: '600',
    //   bold: '700',
    //   extrabold: '800',
    // },
    fontFamily: {
      sans: ["var(--font-rubik)"],
      // 'light': [
      //     'rubik, sans-serif',
      //     {
      //         fontVariationSettings: '"wght" 300',
      //     },
      //   ],
      //   'normal': [
      //       'rubik, sans-serif',
      //       {
      //           fontVariationSettings: '"wght" 400',
      //       },
      //   ],
      //   'medium': [
      //       'rubik, sans-serif',
      //       {
      //           fontVariationSettings: '"wght" 500',
      //       },
      //   ],
      //   'semibold': [
      //       'rubik, sans-serif',
      //       {
      //           fontVariationSettings: '"wght" 600',
      //       },
      //   ],
      //   'bold': [
      //       'rubik, sans-serif',
      //       {
      //           fontVariationSettings: '"wght" 700',
      //       },
      //   ],
      //   'extrabold': [
      //       'rubik, sans-serif',
      //       {
      //           fontVariationSettings: '"wght" 800',
      //       },
      //   ],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
