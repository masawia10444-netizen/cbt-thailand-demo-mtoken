import { useEffect, useState, useRef, useMemo } from "react";

const useResizeObserver = ({ ref = {}}:{ref :any }) => {
    const defaultRef = useRef(null);
    ref = ref || defaultRef;
  
    const [dimensions, setDimensions] = useState({});
  
    useEffect(() => {
      if (!ref.current) return;
  
      const element = ref.current;
      //@ts-ignore
      const resizeObserver = new ResizeObserver(entries => {
        const entry = entries[0];
        setDimensions(entry.contentRect.toJSON());
      });
  
      resizeObserver.observe(element);
      return () => resizeObserver?.unobserver?.(element);
    }, [ref]);
  
    return { ref, dimensions };
}

export default useResizeObserver;
