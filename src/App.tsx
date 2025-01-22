import { useState, useEffect } from "react";

function App() {
  const [array, setArray] = useState<number[]>([3, 1, 4, 1, 5, 9, 2, 6, 5]);
  const [target, setTarget] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Linear search algorithm
  const linearSearch = (arr: number[], target: number): number[] => {
    const steps: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      steps.push(i); // Track the current index
      if (arr[i] === target) break;
    }
    return steps;
  };

  const [steps, setSteps] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false); // State to control animation

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isSearching) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = steps.indexOf(prevIndex!) + 1; // Get the next step index
          if (nextIndex < steps.length) {
            return steps[nextIndex];
          } else {
            clearInterval(interval!);
            setIsSearching(false); // Stop the animation when done
            return prevIndex;
          }
        });
      }, 500); // Adjust delay as needed (500ms in this case)
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSearching, steps]);

  const startSearch = (): void => {
    if (target === null) return;
    const steps = linearSearch(array, target);
    setSteps(steps);
    setCurrentIndex(steps[0]); // Start at the first step
    setIsSearching(true); // Start the animation
  };

  const changeArray = (): void => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)); // Generate a random array
    setArray(newArray);
    setTarget(null); // Reset target
    setSteps([]);
    setCurrentIndex(null); // Reset current index
    setIsSearching(false); // Stop any ongoing search
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Finding Element Visualizer</h1>

      {/* Array Blocks */}
      <div className="flex justify-center gap-2 mb-6">
        {array.map((value, index) => (
          <div
            key={index}
            className={`w-12 h-12 flex justify-center items-center border ${
              currentIndex === index ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <input
          type="number"
          className="border p-2"
          placeholder="Target Value"
          value={target ?? ""}
          onChange={(e) => setTarget(Number(e.target.value))}
          disabled={isSearching} // Disable input while searching
        />
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={startSearch}
          disabled={isSearching} // Disable button while searching
        >
          Start Search
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2"
          onClick={changeArray}
          disabled={isSearching} // Disable button while searching
        >
          Change Array
        </button>
      </div>
    </div>
  );
}

export default App;
