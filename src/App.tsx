import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddTask from "./components/AddTask";
import List from "./components/List";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="p-4 relative h-full">
        <List />
        <AddTask />
      </div>
    </LocalizationProvider>
  );
}

export default App;
