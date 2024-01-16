import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { useTaskStore } from "../store"

export default function DeleteTaskDialog(props: any) {
  const taskStore: any = useTaskStore()
  const onDelete = (id: string) => {
    taskStore.deleteTask(id)
  }
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        {props.children}
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete Task</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? "{props.title}" will be deleted.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={() => { onDelete(props.id) }} variant="solid" color="red">
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
