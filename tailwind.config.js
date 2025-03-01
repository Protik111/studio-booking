/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      },
      fontFamily: {
        sans: '"Open Sans", sans-serif',
        heading: '"Open Sans", sans-serif',
      },
      fontSize: {
        xxs: "0.625rem", //10px
        "13px": "0.8rem", //13px
        regular: "0.94rem", //15px
        lead: "2rem", // 32px
      },
      lineHeight: {
        1.15: "1.15",
        1.27: "1.27",
        1.65: "1.65",
        1.8: "1.8",
        1.87: "1.87",
        1.9: "1.9",
      },
      letterSpacing: {
        0: "0px",
        px: "1px", // 1px
        0.5: "0.125rem", //2px
        1: "0.25rem", // 4px
        1.25: "0.312rem", // 5px
        1.5: "0.375rem", // 6px
        2: "0.5rem", // 8px
        2.5: "0.625rem", //10px
      },
      borderRadius: {
        "4xl": "2.5rem", // 40px
      },
      borderWidth: {
        3: "3px",
        5: "5px",
        6: "6px",
        10: "10px",
      },
      colors: {
        dark: "#0d0d0d",
        theme: "#636FEF",
        flashWhite: "#f1f1f1",
        darkRaisin: "#272727",
        lightGray: "#6B7D94",
        darkNight: "#21252C",
        lightDark: "#4B5768",
      },
      spacing: {
        0.3: "0.3125rem", // 5px
        4.5: "1.125rem", // 18px
        7.5: "1.875rem", // 30px
        13: "3.125rem", // 50px
        15: "3.75rem", // 60px
        18: "4.5rem", // 72px
        "28rem": "28rem", // 448px
      },
      keyframes: {
        breaking: {
          "0%, 100%": {
            right: "-.5rem",
          },
          "50%": {
            right: "4rem",
          },
        },
      },
      animation: {
        "spin-slow": "spin 30s linear infinite",
        breaking: "breaking 2s ease infinite",
      },
      boxShadow: {
        content: "0px 4px 30px 0px rgba(0, 0, 1, 0.10)",
        darkNight: "0px 16px 32px -4px rgba(33, 37, 44, 0.08)",
        lightGray: "0px 8px 24px rgba(149, 157, 165, 0.2)",
      },
      zIndex: {
        1: "1",
        999: "999",
      },
      blur: {
        xs: "1.5px",
      },
      variants: {
        extend: {
          opacity: ["parent-group-hover", "child-group-hover"],
          display: ["parent-group-hover", "child-group-hover"],
        },
      },
    },
  },
  plugins: [],
};
