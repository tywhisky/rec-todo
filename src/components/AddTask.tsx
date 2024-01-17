import { Box, Flex } from "@radix-ui/themes";
import { PlusIcon, ReaderIcon } from '@radix-ui/react-icons'
import { useState } from "react";
import { useTaskStore } from "../store";
import { NewTask } from "../types/Task";
import { Dayjs } from 'dayjs';
import DateTimePicker from "./DateTimePicker";
import { IconButton } from "@mui/material";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const taskStore: any = useTaskStore();

  const onAddTask = () => {
    if (title == "") return
    const new_task = new NewTask({ title: title, description: description, deadline: deadline && deadline.toDate() || null });
    taskStore.addTask(new_task);
    setTitle("");
    setDescription("");
    setDeadline(null);
  }
  const handleKeyEnter = (event: { key: string; }) => {
    if (title == "" || event.key !== 'Enter') return
    onAddTask();
  };

  return (
    <div className="fixed justify-center flex backdrop-blur-sm bottom-[-60px] h-[120px] w-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 border p-2">
      <Flex align="center" gap="2" className="w-1/2 border bg-white rounded-2xl p-2">
        <Flex direction="column" className="w-full">
          <input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={handleKeyEnter} className="w-full text-base h-6 px-2 outline-none" placeholder="Title" />
          <Flex align="center">
            {!focus && <ReaderIcon width="16" className="ml-[6px]" />}
            <input value={description} onChange={(e) => setDescription(e.target.value)} onKeyDown={handleKeyEnter} className="w-full
            text-xs h-6 px-2 outline-none" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder="Description" />
          </Flex>
          <Flex align="center" justify="between">
            <DateTimePicker
              label={deadline == null ? null : deadline.format('MM/DD/YYYY HH:mm:ss')}
              value={deadline}
              onChange={(newValue: Dayjs) => setDeadline(newValue)}
            />
          </Flex>
        </Flex>
        <Box className="bg-teal2 rounded-full active:bg-teal3 hover:bg-teal3">
          <IconButton onClick={() => onAddTask()} className="shrink-0">
            <PlusIcon height="18" width="18" className="text-teal12" />
          </IconButton>
        </Box>
      </Flex>
    </div>
  )
}
