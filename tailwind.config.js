export const purge = ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"];
export const darkMode = false;
export const theme = {
  extend: {
    screens: {
      t_s: "768px",
      d_s: "1024px",
      d_m: "1440px",
      d_l: "1720px",
    },

    animation: {
      "slide-down": "slide-down 0.5s forwards",
      "slide-down2": "slide-down 0.5s forwards",
    },
    keyframes: {
      "slide-down": {
        "0%": { transform: "translateY(100%)" },
        "100%": { transform: "translateX(0)" },
      },
      "slide-down2": {
        "0%": { transform: "translateY(100%)" },
        "100%": { transform: "translateX(0)" },
      },
    },
  },
};
export const variants = {
  extend: {},
};
export const plugins = [];
