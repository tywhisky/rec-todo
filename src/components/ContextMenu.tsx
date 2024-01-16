import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { ContextMenu, Text } from '@radix-ui/themes';

interface TaskContextMenuProps {
  children: React.ReactNode
  id: string
  onDelete: () => void
  onEdit?: () => void
}
export default function TaskContextMenu(props: TaskContextMenuProps) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {props.children}
      </ContextMenu.Trigger>
      <ContextMenu.Content color="teal">
        {props.onEdit && (
          <div>
            <ContextMenu.Item onSelect={() => props.onEdit?.()}>
              <Text>Edit</Text>
              <Pencil2Icon className="ml-2" />
            </ContextMenu.Item>
            <ContextMenu.Separator />
          </div>
        )}
        <ContextMenu.Item onSelect={() => props.onDelete()}>
          <Text>Delete</Text>
          <TrashIcon className="ml-2" />
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root >
  )
}
