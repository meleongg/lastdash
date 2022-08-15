import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    brand: {
      blue: '#005DAA',
      white: '#FFF',
      black: '#333',
      darkBlue: '#004279'
    }
  }
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;