import { createTheme } from '@rneui/themed';

export const loginTheme = createTheme({
  components: {
    Button: {
      raised: true,
      color: "primary",
      radius:8,    
    },
    Input: {
      containerStyle: {
        marginBottom: 16,
      },
    },
  },
  lightColors:{
    primary: 'green',
    secondary: '#8e44ad',
    background: '#ecf0f1',
  }
  
    

});