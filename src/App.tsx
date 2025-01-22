import { useState } from "react";
import ArrayBlocks from "./components/ArrayBlocks";
import Controls from "./components/Controls";
import { linearSearch } from "./utils/algorithms";
import { useSearchAnimation } from "./hooks/useSearchAnimation";

function App() {
  const [array, setArray] = useState<number[]>([3, 1, 4, 1, 5, 9, 2, 6, 5]);
  const [target, setTarget] = useState<string | number | null>(null);
  const [steps, setSteps] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Get currentIndex and setCurrentIndex from the custom hook
  const [currentIndex, setCurrentIndex] = useSearchAnimation(isSearching, steps, setIsSearching);

  const startSearch = (): void => {
    // Reset pointer
    setCurrentIndex(null); // Always reset the pointer before starting a new search
    setSteps([]); // Clear previous steps

    if (target === null || isNaN(Number(target))) {
      console.error("Invalid target value.");
      return;
    }

    const parsedTarget = Number(target); // Parse the target as a number
    const steps = linearSearch(array, parsedTarget); // Generate the search steps
    setSteps(steps); // Update the steps for the search
    setIsSearching(true); // Start the search animation
  };

  const changeArray = (): void => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setTarget(null); // Reset target
    setSteps([]);
    setIsSearching(false); // Stop any ongoing search
  };

  const resetPointer = (): void => {
    setCurrentIndex(null); // Reset the pointer
    setSteps([]);
    setIsSearching(false); // Stop any ongoing search
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Finding Element Visualizer</h1>
      <ArrayBlocks array={array} currentIndex={currentIndex} />
      <Controls
        target={target}
        setTarget={setTarget}
        startSearch={startSearch}
        changeArray={changeArray}
        resetPointer={resetPointer}
        isSearching={isSearching}
      />
    </div>
  );
}

export default App;
