import { useEffect, useState } from "react";

export const useSearchAnimation = (
  isSearching: boolean,
  steps: number[],
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
): [number | null, React.Dispatch<React.SetStateAction<number | null>>] => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isSearching) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = steps.indexOf(prevIndex!) + 1;
          if (nextIndex < steps.length) {
            return steps[nextIndex];
          } else {
            clearInterval(interval!);
            setIsSearching(false); // Stop the animation when done
            return prevIndex;
          }
        });
      }, 500); // Adjust delay as needed
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSearching, steps, setIsSearching]);

  return [currentIndex, setCurrentIndex];
};
