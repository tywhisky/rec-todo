import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided
} from "react-beautiful-dnd";
import { Box, Flex, Text } from '@radix-ui/themes';
import { useTaskStore } from "../store";
import { Task } from "../types/Task";
import { CSSProperties, createRef, useEffect, useRef } from "react";
import { CheckIcon, ClockIcon, ReloadIcon } from "@radix-ui/react-icons";
import Collapse from "./Collapse";
import dayjs from "dayjs";
import TaskContextMenu from "./ContextMenu";
import LineThroughAnimation from "./animation/LineThroughAnimation";
import ItemDropAnimation from "./animation/ItemDropAnimation";
import Checkbox from "./checkbox/index";

export default function List() {
  const taskStore: any = useTaskStore()
  const tasks: Task[] = taskStore.tasks;

  const lineThroughRefs = useRef<any>([]);
  lineThroughRefs.current = tasks.map((_, i) => lineThroughRefs.current[i] ?? createRef());

  const itemDropRefs = useRef<any>([]);
  itemDropRefs.current = tasks.map((_, i) => itemDropRefs.current[i] ?? createRef());

  const handleOnDragEnd = (result: DropResult) => {
    if (!result || !result.destination) return;
    taskStore.reorderTasks(result.source.index, result.destination.index)
  };

  const onComplete = (id: string, index: number) => {
    lineThroughRefs.current[index].current.showAnimation();
    setTimeout(() => {
      itemDropRefs.current[index].current.showAnimation();
    }, 300)
    setTimeout(() => {
      taskStore.completeTask(id)
    }, 800)
  }

  const onUndoComplete = (id: string) => {
    taskStore.undoCompleteTask(id)
  }

  const deadlineStyle = (deadline: Date) => {
    return dayjs().isBefore(dayjs(deadline)) && "text-gray-500" || "text-red-500"
  }

  const getItemStyle = (isDragging: boolean): CSSProperties => {
    return isDragging && {
      boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      background: "rgba(0, 0, 0, 0.15)"
    } || {}
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
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.filter(t => t.completed == false).map(({ id, title, description, deadline, completed }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <TaskContextMenu id={id} title={title}>
                        <div
                          className="mb-1"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <ItemDropAnimation key={id} ref={itemDropRefs.current[index]} completed={completed}>
                            <Box
                              className="mb-1 select-none bg-gray-200 bg-opacity-50 backdrop-blur-sm p-3 rounded-2xl"
                              style={getItemStyle(snapshot.isDragging)}
                            >
                              <Flex gap="2" justify="between">
                                <Box>
                                  <LineThroughAnimation key={id} ref={lineThroughRefs.current[index]} completed={completed}>
                                    <Text as="div" size="2">
                                      {title}
                                    </Text>
                                  </LineThroughAnimation>
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
                                <Checkbox onChange={() => onComplete(id, index)} />
                              </Flex>
                            </Box>
                          </ItemDropAnimation>
                        </div>
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
        {tasks.filter(t => t.completed == true).map(({ id, title, description, completedAt }) => {
          return (
            <TaskContextMenu key={id} id={id} title={title}>
              <Box className="mb-1 text-gray-500 select-none bg-gray-400 bg-opacity-30 backdrop-blur-sm p-3 rounded-2xl" >
                <Flex gap="2" justify="between">
                  <Box >
                    <Text className="line-through" as="div" size="2">
                      {title}
                    </Text>
                    <Text as="div" size="1" color="gray">
                      {description}
                    </Text>
                    <Flex>
                      <CheckIcon />
                      <Text as="div" size="1">
                        {dayjs(completedAt).format("MM/DD/YYYY HH:mm:ss")}
                      </Text>
                    </Flex>
                  </Box>
                  <ReloadIcon className="transition duration-300 ease-in-out hover:scale-110" onClick={() => onUndoComplete(id)} />
                </Flex>
              </Box>
            </TaskContextMenu>
          );
        })}
      </Collapse>
    </div >
  );
}
