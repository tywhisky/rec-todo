import { Dialog, DialogActions, Button, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

interface DeleteTaskDialogProps {
  title: string
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteTaskDialog(props: DeleteTaskDialogProps) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>
        Delete Task
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Are you sure? "${props.title}" will be deleted.`}
        </DialogContentText>
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
