import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
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
      <div className="w-[150px] border-solid border-b-2 border-violet11 py-1 flex items-center justify-between mb-2">
        <span className="text-violet11 text-[15px] leading-[25px]">
          Completed
        </span>
        <Badge color="blue">{props.completedQty || 0}</Badge>
        <Collapsible.Trigger asChild>
          <button className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none data-[state=closed]:bg-white data-[state=open]:bg-violet3 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
            {open ? <Cross2Icon /> : <RowSpacingIcon />}
          </button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content>
        <animated.div style={styles}>
          {props.children}
        </animated.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

