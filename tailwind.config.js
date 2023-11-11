export const purge = ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"];
export const darkMode = false;
export const theme = {
  extend: {
    screens: {
      m_lm: { max: "576px" },
      m_xs: { max: "616px" },
      m_s: { max: "877px" },
      m_l: "577px",
      t_s2: "706px",
      t_s: "768px",
      t_ms: "878px",
      t_m: "1000px",
      d_s: "1130px",
      d_m: "1367px",
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
