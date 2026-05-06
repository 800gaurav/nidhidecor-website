import { useEffect, useRef, useState } from "react";

const CursorWaterDrop = () => {
  const dotRef = useRef(null);
  const ringContainerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Move yellow dot
      if (dot) {
        dot.style.left = `${clientX}px`;
        dot.style.top = `${clientY}px`;
      }

      // Reset idle timeout
      setIsIdle(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsIdle(true);
        // Create the ring
        if (ringContainerRef.current) {
          const ring = document.createElement("div");
          ring.className = "cursor-idle-ring";
          ring.style.left = `${clientX}px`;
          ring.style.top = `${clientY}px`;
          ringContainerRef.current.appendChild(ring);

          setTimeout(() => {
            ring.remove();
          }, 1000);
        }
      }, 400); // Delay before idle effect
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringContainerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]" />
    </>
  );
};

export default CursorWaterDrop;
