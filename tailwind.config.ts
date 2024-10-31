import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        '3': '3%', // Adding 3% letter-spacing
      },
      lineHeight: {
        '28': '28px', 
        '24':'24px',
        '21':'21px',
        '30':'30px',
      },
      colors:{
          'custom-green':'#00FF66',
          'whitesmoke':'#F5F5F5',
          palette: {
            dark: '#2B202C',  // Dominant dark tone
            mutedPurple: '#573F59',  // Muted purple shade
            lightTone: '#F2EFF2',  // Light, almost white tone
            lavender: '#96699B',  // Lavender-like hue
            deepPurple: '#865F8A',  // Deep purple tone
            darkPurple: '#3A202D',  // Dark purple, near black
          },
          'check-red': "#DB4444",
          'footer-white':"#FFFFFF",

      },
     
      fontFamily:{
        Pop:['Poppins','...defaultTheme.fontFamily.sans'],
        
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "custom-image":"url('/NewArrival-images/first.png')",
          "newArrival-2":"url('/NewArrival-images/second.jpeg')",
          "newArrival-3":"url('/NewArrival-images/third.png')",
          "newArrival-4":"url('/NewArrival-images/four.png')",
          "signup-1":"url('/signup/main.jpeg')",
          "wishlist-1":"url('/Product-images/laptop.png')",
          "mastercard":"url('/Card-Images/image 31.svg')",
          "visa":"url('/Card-Images/Visa.svg')",
          "nagad":"url('/Card-Images/Nagad.svg')",
          "paypal":"url('/Card-Images/Paypal.svg')",
         
      },
    },
  },
  plugins: [],
};
export default config;
