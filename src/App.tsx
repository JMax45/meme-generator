import BoxesProvider from './BoxesContext';
import Dashboard from './components/Dashboard';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2D3047',
    },
    secondary: {
      main: '#f2f3d9',
    },
  },
});

const App = () => {
  return (
    <BoxesProvider>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </BoxesProvider>
  );
};

export default App;