import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddTask from "./components/AddTask";
import List from "./components/List";
import { ThemeProvider, createTheme } from '@mui/material';

function App() {
  const theme = createTheme(
    {
      palette: {
        primary: { main: "#12A594" },
      },
    },
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <div className="p-4 relative h-full">
          <List />
          <AddTask />
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
