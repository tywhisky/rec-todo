import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided
} from "react-beautiful-dnd";
import { Box, Card, Flex, IconButton, Text } from '@radix-ui/themes';
import { useTaskStore } from "../store";
import { Task } from "../types/Task";
import { useEffect } from "react";
import { CheckIcon, ClockIcon } from "@radix-ui/react-icons";
import Collapse from "./Collapse";
import dayjs from "dayjs";
import TaskContextMenu from "./ContextMenu";

export default function List() {
  const taskStore: any = useTaskStore()
  const tasks: Task[] = taskStore.tasks;

  const handleOnDragEnd = (result: DropResult) => {
    if (!result || !result.destination) return;
    taskStore.reorderTasks(result.source.index, result.destination.index)
  };

  const onComplete = (id: string) => {
    taskStore.completeTask(id)
  }

  const onUndoComplete = (id: string) => {
    taskStore.undoCompleteTask(id)
  }

  const deadlineStyle = (deadline: Date) => {
    return dayjs().isBefore(dayjs(deadline)) && "text-gray-500" || "text-red-500"
  }

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
              {tasks.filter(t => t.completed == false).map(({ id, title, description, completed, deadline }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <TaskContextMenu id={id} title={title}>
                        <Card
                          asChild
                          className="mb-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          size="1">
                          <Box>
                            <Flex gap="2" justify="between">
                              <Box className={completed && "line-through text-gray-500" || ""}>
                                <Text as="div" size="2">
                                  {title}
                                </Text>
                                <Text as="div" size="1" color="gray">
                                  {description}
                                </Text>
                                {
                                  deadline && (
                                    <Flex align="center">
                                      <ClockIcon className={`mr-1 ${deadlineStyle(deadline)}`} />
                                      <Text size="1" className={deadlineStyle(deadline)}>
                                        {dayjs(deadline).format('MM/DD/YYYY HH:mm:ss')}
                                      </Text>
                                    </Flex>
                                  )
                                }
                              </Box>
                              <IconButton onClick={() => onComplete(id)} color="gray" variant="outline" size="1" >
                                <CheckIcon width="18" height="18" />
                              </IconButton>
                            </Flex>
                          </Box>
                        </Card>
                      </TaskContextMenu>
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
      <Collapse completedQty={tasks.filter(t => t.completed).length}>
        {tasks.filter(t => t.completed == true).map(({ id, title, description, completed }) => {
          return (
            <TaskContextMenu id={id} title={title}>
              <Card
                asChild
                key={id}
                className="mb-2"
                size="1">
                <Box>
                  <Flex gap="2" justify="between">
                    <Box className={completed && "line-through text-gray-500" || ""}>
                      <Text as="div" size="2">
                        {title}
                      </Text>
                      <Text as="div" size="1" color="gray">
                        {description}
                      </Text>
                    </Box>
                    <IconButton onClick={() => onUndoComplete(id)} color="teal" variant="soft" size="1" >
                      <CheckIcon width="18" height="18" />
                    </IconButton>
                  </Flex>
                </Box>
              </Card>
            </TaskContextMenu>
          );
        })}
      </Collapse>
    </div>
  );
}
