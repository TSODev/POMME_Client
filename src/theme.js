import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ef702b',              //Mandarine
    },
    secondary: {
      main: '#b5856e',
    },
    error: {
      main: red.A400,
    },
    default: {
      white: '#fff',
      black: '#000',
      red: '#f00',
      paper: '#eee',
    },
    background: {
      default: '#fff',
      primary: '#ef702b',
      secondary: '#b5856e',
      paper: '#eee',
      greylight: '#aaa',
      greydark: '#666',
      yellowpaper: "#ffffee",
      purplepaper: "#eeeeff",
      greenpaper: '#eeeedd',
      greypaper: '#eeeeee',
    },
  },
});

export default theme;