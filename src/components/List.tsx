import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided
} from "react-beautiful-dnd";
import { Box, Card, Checkbox, Flex, IconButton, Text } from '@radix-ui/themes';
import { useTaskStore } from "../store";
import { Task } from "../types/Task";
import { useEffect } from "react";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";

export default function List() {
  const taskStore: any = useTaskStore()
  const tasks: Task[] = taskStore.tasks;

  const handleOnDragEnd = (result: DropResult) => {
    if (!result || !result.destination) return;

    const items = [...tasks];
    const [draggedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, draggedItem);
  };

  useEffect(() => {
    async function fetch() { await taskStore.getTasks() };
    fetch();
  }, [])

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided: DroppableProvided) => (
            <div
              className="tbody-ele"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map(({ id, title, description, completed }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <Card asChild
                        className="mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        size="1">
                        <Box>
                          <Flex gap="2" direction="row-reverse" justify="between">
                            <Flex gap="2">
                              <IconButton color="crimson" variant="soft" size="1">
                                <TrashIcon width="18" height="18" />
                              </IconButton>
                              <IconButton color="cyan" variant="soft" size="1" >
                                <CheckIcon width="18" height="18" />
                              </IconButton>
                            </Flex>
                            <Box className={completed && "line-through text-gray-500" || ""}>
                              <Text as="div" size="2" weight="bold">
                                {title}
                              </Text>
                              <Text as="div" size="2" color="gray">
                                {description}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      </Card>

                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )
          }
        </Droppable >
      </DragDropContext >
    </div >
  );
}
