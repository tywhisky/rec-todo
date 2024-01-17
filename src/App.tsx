import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddTask from "./components/AddTask";
import List from "./components/List";
import { ThemeProvider, createTheme } from '@mui/material';
import { useTaskStore } from './store';
import { Task } from './types/Task';
import dayjs from 'dayjs';

function App() {
  const tasks: Task[] = useTaskStore((state: any) => state.tasks)
  const hasTaskDays = tasks.filter(t => t.completed == false && t.deadline != null).map(t => dayjs(t.deadline).format("MM/DD/YYYY"))

  const theme = createTheme({
    palette: {
      primary: { main: "#12A594" },
    },
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: (props: any) => {
            const day = dayjs(props.ownerState.day).format("MM/DD/YYYY")
            if (hasTaskDays.includes(day)) {
              return {
                "&::before": {
                  content: '""',
                  position: "absolute",
                  bottom: '4px',
                  left: '16px',
                  width: '5px',
                  height: '5px',
                  backgroundColor: '#86EAD4',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '5px',
                }
              };
            }
            return {}
          }
        }
      }
    } as any
  });

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
