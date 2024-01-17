import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useSpring, animated } from "@react-spring/web";
import { Button } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Badge } from '@radix-ui/themes';

export default function Collapse(props: any) {
  const [open, setOpen] = useState(false);

  const styles = useSpring({
    opacity: open ? 1 : 0,
    y: open ? 1 : 0,
  })

  const rotate = useSpring({
    transform: `perspective(600px) rotate(${open ? 90 : 0}deg)`,
    config: { mass: 2, tension: 800, friction: 80 },
  })

  return (
    <Collapsible.Root className="w-full" open={open}>
      <Collapsible.Trigger asChild>
        {props.completedQty && (
          <div className='flex items-center pt-1 pb-1.5'>
            <Button
              onClick={() => setOpen(!open)}
              variant="text"
              size="small"
              sx={{ width: 'auto', height: 30, lineHeight: 30, borderRadius: 2 }}
              startIcon={
                <animated.div style={rotate}>
                  <ChevronRightRoundedIcon className='relative bottom-[1.5px]' />
                </animated.div>
              } >
              COMPLETED
              <Badge className='ml-2 cursor-pointer' color="teal" radius='full'>{props.completedQty || 0}</Badge>
            </Button>
          </div>
          // <div className="w-[150px] transition duration-300 ease-in-out cursor-pointer select-none hover:bg-teal3 bg-teal2 px-2 rounded-lg py-[2px] flex items-center justify-between my-2">
          //   <Flex align="center" gap="1">
          //     {open ? <ChevronDownIcon color='teal' /> : <ChevronRightIcon color="teal" />}
          //     <Text className="text-teal8 text-[14px] leading-[25px]">
          //       COMPLETED
          //     </Text>
          //   </Flex>
          //   <Flex className='text-xs'>{props.completedQty || 0}</Flex>
          // </div>
        )}
      </Collapsible.Trigger>
      <Collapsible.Content>
        <animated.div style={styles}>
          {props.children}
        </animated.div>
      </Collapsible.Content>
    </Collapsible.Root >
  );
};

