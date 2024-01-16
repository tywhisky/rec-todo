import { Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import DateTimePicker from "./DateTimePicker"
import dayjs from "dayjs"

interface EditTaskDialogProps {
  title: string
  description?: string
  deadline?: any
  open: boolean
  onClose: () => void
  onConfirm: () => void
  onTitleChange: (e: any) => void
  onDescriptionChange: (e: any) => void
  onDeadlineChange: (e: any) => void
}
export default function EditTaskDialog(props: EditTaskDialogProps) {
  const handleKeyEnter = (event: { key: string; }) => {
    if (event.key == 'Enter') {
      props.onConfirm();
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>
        Edit Task
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 p-2">
          <TextField value={props.title} onKeyDown={handleKeyEnter} onChange={props.onTitleChange} label="Title" variant="standard" />
          <TextField value={props.description} onKeyDown={handleKeyEnter} onChange={props.onDescriptionChange} label="Description" variant="outlined" multiline rows={4} />
        </div>
        <div className="mt-2 text-xs" >
          <DateTimePicker
            label={props.deadline && dayjs(props.deadline).format("MM/DD/YYYY hh:mm:ss A") || null}
            defaultValue={dayjs(props.deadline)}
            onChange={props.onDeadlineChange}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
