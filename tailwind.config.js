/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        leafygreen: "#314f33",
        leafygreen1: "#7c967d",
        leafygreen2: "#335135",
        lightgreen: "#38a169",
        soilBrown: "#8D6E63",
        creamBase: "#FFF8E1",
        skyBlue: "#64B5F6",
        sunny: "#FBC02D",
        black: "#000000ff",
        white: "#ffffffff",
        green: "#476A49",
        red: "#CD1C18",

        gray50: "#F9FAFB",
        gray100: "#F3F4F6",
        gray200: "#E5E7EB",
        gray300: "#D1D5DB",
        gray400: "#9CA3AF",
        gray500: "#6B7280",
        gray600: "#4B5563",
        gray700: "#374151",
        gray800: "#1F2937",
        gray900: "#111827",
      },
    },
  },
  plugins: [],
};
