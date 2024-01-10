import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { ContextMenu, Text } from '@radix-ui/themes';
import Dialog from './Dialog';

export default function TaskContextMenu(props: any) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {props.children}
      </ContextMenu.Trigger>
      <ContextMenu.Content color="teal">
        <ContextMenu.Item>
          <Text>Edit</Text>
          <Pencil2Icon className="ml-2" />
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <Dialog id={props.id} title={props.title}>
          <ContextMenu.Item onSelect={(e) => e.preventDefault()}>
            <Text>Delete</Text>
            <TrashIcon className="ml-2" />
          </ContextMenu.Item>
        </Dialog >
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
