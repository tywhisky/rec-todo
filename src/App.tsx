import AddTask from "./components/AddTask";
import List from "./components/List";
function App() {
  return (
    <div className="p-4 relative h-full">
      <List />
      <AddTask />
    </div>
  );
}

export default App;
