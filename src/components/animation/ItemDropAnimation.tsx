import { animated, useSpring } from "@react-spring/web";
import { forwardRef, useImperativeHandle, useState } from "react";

const ItemDropAnimation = forwardRef((props: any, ref) => {
  const [isVisible, setIsVisible] = useState(props.completed);
  // const animationProps = useSpring({
  //   from: isVisible && { x: 0, opacity: 0 } || { x: 0, opacity: 1 },
  //   to: isVisible && { y: 50, opacity: 0.7 } || { y: 0, opacity: 1 },
  //   config: { duration: 500 }
  // });

  const animationProps = useSpring({
    opacity: isVisible ? 0 : 1,
    transform: `perspective(600px) rotateX(${isVisible ? 180 : 0}deg)`,
    hight: 10,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  useImperativeHandle(ref, () => ({
    showAnimation() {
      setIsVisible(!isVisible);
    }
  }));

  return (
    <animated.div style={animationProps}>
      {props.children}
    </animated.div>
  )
});

export default ItemDropAnimation;
