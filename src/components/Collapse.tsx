import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronRightIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useSpring, animated } from "@react-spring/web";
import { Badge, Flex } from '@radix-ui/themes';

export default function Collapse(props: any) {
  const [open, setOpen] = useState(false);

  const styles = useSpring({
    opacity: open ? 1 : 0,
    y: open ? 1 : 0,
  })

  return (
    <Collapsible.Root className="w-full" open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <div className="w-[150px] transition duration-300 ease-in-out cursor-pointer select-none hover:bg-teal4 bg-teal3 px-2 rounded-lg py-[2px] flex items-center justify-between my-2">
          <Flex align="center">
            {open ? <ChevronDownIcon className='teal12' /> : <ChevronRightIcon className='teal12' />}
            <span className="text-teal12 font-light text-[14px] leading-[25px] ml-1">
              Completed
            </span>
          </Flex>
          <Badge className='text-teal11'>{props.completedQty || 0}</Badge>
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <animated.div style={styles}>
          {props.children}
        </animated.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

