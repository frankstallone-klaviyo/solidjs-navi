module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          neutral: {
            subtle: {
              base: "#F2F4F5",
              hovered: "#DFE3E6"
            }
          }
        },
        border: {
          neutral: {
            subtle: {
              base: "#DFE3E6"
            }
          }
        }
      }
    }
  },
  plugins: [],
};
