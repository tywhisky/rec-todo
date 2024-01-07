import { TextField } from "@radix-ui/themes";
import List from "./components/List";
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from "react";
import { getTasks, addTask } from "./store";
import { NewTask } from "./types/Task";

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleKeyEnter = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      const new_task = new NewTask({ title: inputValue })
      addTask(new_task)
      console.log('Enter key pressed');
    }
  };

  return (
    <div className="p-4 relative h-full">
      <List />
      <div className="fixed bottom-6 w-8/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <TextField.Root >
          <TextField.Slot>
            <PlusIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyEnter}
            placeholder="Add a task" />
        </TextField.Root>
      </div>
    </div>
  );
}

export default App;
