import { useState } from "react";
import ArrayBlocks from "./components/ArrayBlocks";
import Controls from "./components/Controls";
import { linearSearch } from "./utils/algorithms";
import { useSearchAnimation } from "./hooks/useSearchAnimation";

function App() {
  const [array, setArray] = useState<number[]>([3, 1, 4, 1, 5, 9, 2, 6, 5]);
  const [target, setTarget] = useState<number | null>(null);
  const [steps, setSteps] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const currentIndex = useSearchAnimation(isSearching, steps, setIsSearching);

  const startSearch = (): void => {
    if (target === null) return;
    const steps = linearSearch(array, target);
    setSteps(steps);
    setIsSearching(true);
  };

  const changeArray = (): void => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setTarget(null);
    setSteps([]);
    setIsSearching(false);
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
        isSearching={isSearching}
      />
    </div>
  );
}

export default App;
