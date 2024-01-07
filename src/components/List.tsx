import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided
} from "react-beautiful-dnd";
import { Box, Card, Checkbox, Flex, Text } from '@radix-ui/themes';
import { getTasks } from "../store";
import { Task } from "../types/Task";

export default function List() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result || !result.destination) return;

    const items = [...tasks];
    const [draggedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, draggedItem);

    setTasks(items);
  };

  useEffect(() => {
    getTasks().then(result => {
      setTasks(result as Task[])
    })
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
                            <Checkbox defaultChecked />
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
