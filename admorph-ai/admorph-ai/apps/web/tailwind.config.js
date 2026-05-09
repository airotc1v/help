/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "am-black": "#080A0F",
        "am-surface": "#0D1017",
        "am-panel": "#111620",
        "am-border": "#1E2535",
        "am-border-bright": "#2A3548",
        "am-amber": "#F5A623",
        "am-amber-dim": "#C47D0E",
        "am-amber-glow": "#F5A623",
        "am-green": "#00D4AA",
        "am-red": "#FF4757",
        "am-blue": "#4FC3F7",
        "am-text": "#E8EDF5",
        "am-muted": "#6B7A96",
        "am-subtle": "#3D4A62",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "pulse-amber": "pulseAmber 2s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
        "slide-in": "slideIn 0.4s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        pulseAmber: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        slideIn: {
          from: { opacity: 0, transform: "translateX(-16px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(12px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px rgba(245,166,35,0.3)" },
          to: { boxShadow: "0 0 25px rgba(245,166,35,0.6)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(30,37,53,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30,37,53,0.5) 1px, transparent 1px)",
        "amber-glow": "radial-gradient(ellipse at center, rgba(245,166,35,0.15) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};
