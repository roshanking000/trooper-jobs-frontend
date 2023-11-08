/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#1C1C27',
        'hover': '#23232C',
        'secondary': '#1E1E1E',
        'mandatory': '#0D0D12',
        'button-primary': 'rgba(0, 0, 0, 0.4)',
        'button-hover': '#23232C',
        'gray': 'rgba(244, 244, 247, 0.08)',
        'grey': '#2B2B34',
        'roadmap-current': '#515FFF',
        'app-normal': '#1A1A23',
        'transparent': 'rgba(0, 0, 0, 0)',
        'switch-off': 'rgba(244, 244, 247, 0.08)',
        'switch-on': '#515FFF',
        'switch-thumb': '#1A1A23',
        'indigo': 'rgba(81, 95, 255, 0.08)'
      },
      textColor: {
        'primary': '#F4F4F7',
        'menu': 'rgba(244, 244, 247, 0.7)',
        'menu-hover': 'rgba(244, 244, 247, 1)',
        'normal': 'rgba(244, 244, 247, 0.5)',
        'desc': 'rgba(244, 244, 247, 0.5)',
        'secondary': 'rgba(81, 95, 255, 0.7)',
        'secondary-hover': 'rgba(81, 95, 255, 1)',
        'small': 'rgba(81, 95, 255, 1)',
        'mandatory': '#1A1A23',
        'ceo': 'rgba(168, 81, 255, 1)',
        'cmo': 'rgba(81, 255, 245, 1)',
        'guild-manager': 'rgba(252, 255, 81, 1)',
        'nft-trader': 'rgba(255, 175, 81, 1)',
        'green': '#2FE28C',
        'error': '#E22F70'
      },
      borderColor: {
        'primary': 'rgba(244, 244, 247, 0.08)',
        'primary1': 'rgba(244, 244, 247)',
        'secondary': 'rgba(81, 95, 255, 0.7)',
        'mandatory': '#515FFF',
        'ceo': 'rgba(168, 81, 255, 1)',
        'cmo': 'rgba(81, 255, 245, 1)',
        'guild-manager': 'rgba(252, 255, 81, 1)',
        'nft-trader': 'rgba(255, 175, 81, 1)',
        'transparent': 'rgba(0, 0, 0, 0)',
        'green': '#2FE28C',
        'red': '#E22F70',
        'purple': 'rgba(81, 95, 255, 1)',
        'error' : '#E00000',
        'official' : '#F0F000',
        'switch' : 'rgba(244, 244, 247, 0.08)',
        'indigo': 'rgba(81, 95, 255, 0.32)'
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(47, 64, 255, 1)',
        '4xl': [
          '0 35px 35px rgba(47, 64, 255, 0.25)',
          '0 45px 65px rgba(47, 64, 255, 0.15)'
        ]
      },
      boxShadow: {
        'button-hover': '0px 0px 8px #2F40FF',
        'official-avatar': '0px 0px 8px #F0f000',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

