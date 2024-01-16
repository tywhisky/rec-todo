import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { ContextMenu, Text } from '@radix-ui/themes';
import EditTaskDialog from './EditTaskDialog';

interface TaskContextMenuProps {
  children: React.ReactNode
  id: string
  onDelete: () => void
}
export default function TaskContextMenu(props: TaskContextMenuProps) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {props.children}
      </ContextMenu.Trigger>
      <ContextMenu.Content color="teal">
        <EditTaskDialog {...props}>
          <ContextMenu.Item onSelect={(e) => e.preventDefault()}>
            <Text>Edit</Text>
            <Pencil2Icon className="ml-2" />
          </ContextMenu.Item>
        </EditTaskDialog>
        <ContextMenu.Separator />
        <ContextMenu.Item onSelect={() => props.onDelete()}>
          <Text>Delete</Text>
          <TrashIcon className="ml-2" />
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root >
  )
}
