import { Box, Flex } from "@radix-ui/themes";
import { Cross1Icon, PlusIcon, ReaderIcon } from '@radix-ui/react-icons'
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
    const new_task = new NewTask({ title: title, description: description, deadline: deadline?.toDate() });
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
    <div className="fixed bottom-[-20px] w-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border p-2 rounded-2xl">
      <Flex align="center" gap="2" className="w-full">
        <Flex direction="column" className="w-full">
          <input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={handleKeyEnter} className="w-full text-base h-6 px-2 outline-none" placeholder="Title" />
          <Flex align="center">
            {!focus && <ReaderIcon width="16" className="ml-[6px]" />}
            <input value={description} onChange={(e) => setDescription(e.target.value)} onKeyDown={handleKeyEnter} className="w-full text-xs h-6 px-2 outline-none" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder="Description" />
          </Flex>
          <Flex align="center" justify="between">
            <DateTimePicker
              label={deadline == null ? null : deadline.format('MM/DD/YYYY HH:mm:ss')}
              value={deadline}
              onChange={(newValue: Dayjs) => setDeadline(newValue)}
            />
            {/* {deadline && (<Cross1Icon height="12" width="12" className="ml-2 mr-1 cursor-pointer" onClick={() => setDeadline(null)} />)} */}
          </Flex>
        </Flex>
        <Box className="bg-teal-100 rounded-full active:bg-teal-200 hover:bg-teal-200">
          <IconButton onClick={() => onAddTask()} className="shrink-0">
            <PlusIcon height="18" width="18" className="text-teal12" />
          </IconButton>
        </Box>
      </Flex>
    </div>
  )
}
