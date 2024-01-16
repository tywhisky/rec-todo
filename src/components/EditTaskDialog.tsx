import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { useTaskStore } from "../store"
import { TextField } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { StaticDateTimePicker } from "@mui/x-date-pickers"

export default function EditTaskDialog(props: any) {
  const [deadline, setDeadline] = useState<Dayjs | null>(props.deadline && dayjs(props.deadline) || null)
  const [title, setTitle] = useState<string>(props.title)
  const [description, setDescription] = useState<string>(props.description)
  const taskStore: any = useTaskStore()
  const onEdit = (id: string) => {
    const newTask = { title: title, description: description, deadline: deadline }
    taskStore.updateTask(id, newTask)
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        {props.children}
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Edit Task</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <Flex direction="column" gap="1">
            <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="standard" />
            <TextField value={description} onChange={(e) => setDescription(e.target.value)} label="Description" variant="standard" />
            <StaticDateTimePicker
              minDateTime={dayjs()}
              value={deadline}
              onChange={(newValue) => setDeadline(newValue)}
              slotProps={{ actionBar: { actions: [] } }}
            />
          </Flex>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Button onClick={() => setDeadline(null)} variant="surface" color="gray">
            Clear Deadline
          </Button>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={() => { onEdit(props.id) }} variant="solid" color="teal">
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
