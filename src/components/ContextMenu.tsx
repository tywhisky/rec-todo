import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { ContextMenu, Text } from '@radix-ui/themes';
import DeleteTaskDialog from './DeleteTaskDialog';

interface TaskContextMenuProps {
  children: React.ReactNode
  title: string
  id: string
}
export default function TaskContextMenu(props: TaskContextMenuProps) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {props.children}
      </ContextMenu.Trigger>
      <ContextMenu.Content color="teal">
        <ContextMenu.Item onSelect={(e) => e.preventDefault()}>
          <Text>Edit</Text>
          <Pencil2Icon className="ml-2" />
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <DeleteTaskDialog id={props.id} title={props.title}>
          <ContextMenu.Item onSelect={(e) => e.preventDefault()}>
            <Text>Delete</Text>
            <TrashIcon className="ml-2" />
          </ContextMenu.Item>
        </DeleteTaskDialog >
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
