import { useState, useEffect, useMemo } from "react";

/**
 * Utility function to generate animation variants for table rows
 * Creates cascading top-to-bottom animation for progressive data loading effect
 *
 * @param {number} index - The index of the row
 * @param {string} direction - Direction: 'left', 'right', 'top', or 'bottom' (default: 'top')
 * @param {number} delayMultiplier - Delay multiplier between rows for cascading effect (default: 0.08)
 * @param {number} duration - Animation duration in seconds (default: 0.4)
 * @returns {object} Animation variants object for framer-motion
 */
export const getRowAnimation = (
  index,
  direction = "top",
  delayMultiplier = 0.08,
  duration = 0.4
) => {
  // Base offset distance
  const offset = 50;

  let hiddenState = {
    opacity: 0,
  };

  // Set initial position based on direction
  switch (direction) {
    case "left":
      hiddenState.x = -offset;
      break;
    case "right":
      hiddenState.x = offset;
      break;
    case "top":
      hiddenState.y = -offset;
      break;
    case "bottom":
      hiddenState.y = offset;
      break;
    default:
      hiddenState.x = -offset;
  }

  return {
    hidden: hiddenState,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        delay: index * delayMultiplier,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
};

/**
 * Hook to manage table row animation state
 * Always uses 'top' direction for cascading top-to-bottom effect
 * @param {boolean} loading - Loading state
 * @param {number} dataLength - Length of data array
 * @returns {object} { isDataLoaded: boolean, direction: string } - Animation state and direction
 */
export const useTableAnimation = (loading, dataLength) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Always use 'top' direction for cascading effect (top to bottom)
  const direction = "top";

  useEffect(() => {
    if (!loading && dataLength > 0) {
      // Small delay to ensure smooth animation after loading
      const timer = setTimeout(() => {
        setIsDataLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!loading) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [loading, dataLength]);

  return { isDataLoaded, direction };
};
