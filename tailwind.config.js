/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Orange
        LightOrange: "#FFA726", //Usage: Background highlights, hover effects, or call-to-action (CTA) buttons.
        BrightOrange: "#FB8C00", //Usage: Primary buttons, links, or key sections of the website.
        DeepOrange: "#E65100",
        // Blue
        LightBlue: "#42A5F5", //Usage: Background sections to contrast orange, subtle banners, or secondary buttons.
        BrightBlue: "#1E88E5", //Usage: Text for links or navigation menus.
        DeepBlue: "#023e7d", //Usage: Header backgrounds, footer sections, or active menu items.
        // Accent
        ShinyGold: "#FBC02D", //Usage: Highlights for special elements, badges, or icons
        White: "#FFFFFF", //Usage: Text, icons, and content backgrounds to ensure readability.
        Black: "#212121", //Usage: Shadows, borders, or text on light-colored backgrounds.
      },
      fontFamily: {
        MangaTemple: ["Manga Temple", "sans-serif"],
      },
    },
  },
  plugins: [],
};
