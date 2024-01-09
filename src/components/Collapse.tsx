import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronRightIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useSpring, animated } from "@react-spring/web";
import { Badge } from '@radix-ui/themes';

export default function Collapse(props: any) {
  const [open, setOpen] = useState(false);

  const styles = useSpring({
    opacity: open ? 1 : 0,
    y: open ? 1 : 0,
  })

  return (
    <Collapsible.Root className="w-full" open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <div className="w-[150px] cursor-pointer select-none hover:bg-teal4 bg-teal3 px-2 rounded-lg py-1 flex items-center justify-between mb-2">
          {open ? <ChevronDownIcon className='teal12' /> : <ChevronRightIcon className='teal12' />}
          <span className="text-teal12 font-light text-[15px] leading-[25px]">
            Completed
          </span>
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

