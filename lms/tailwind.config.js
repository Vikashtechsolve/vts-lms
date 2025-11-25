// import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#121212",
        card: "#1E1E1E",
        red: "#C62828",
        "red-hover": "#B71C1C",
        muted: "#9CA3AF",
        white: "#FFFFFF",
      },
    },
  },
};
