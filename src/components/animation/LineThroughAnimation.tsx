import { animated, useSpring } from "@react-spring/web";
import { forwardRef, useImperativeHandle, useState } from "react";

const LineThroughAnimation = forwardRef((props: any, ref) => {
  const [isVisible, setIsVisible] = useState(props.completed);

  const { width } = useSpring({
    from: { width: "0%" },
    to: { width: isVisible && "100%" || "0%" }
  });

  useImperativeHandle(ref, () => ({
    showAnimation() {
      setIsVisible(!isVisible);
    }
  }));

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {props.children}
      <animated.div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width,
          height: `1px`,
          background: "black"
        }}
      />
    </div>
  )
});

export default LineThroughAnimation;
