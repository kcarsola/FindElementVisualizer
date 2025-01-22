interface ControlsProps {
    target: string | number | null; // Include null
    setTarget: React.Dispatch<React.SetStateAction<string | number | null>>; // Update type
    startSearch: () => void;
    changeArray: () => void;
    resetPointer: () => void;
    isSearching: boolean;
  }
  

const Controls: React.FC<ControlsProps> = ({
    target,
    setTarget,
    startSearch,
    changeArray,
    resetPointer,
    isSearching,
}) => {
    return (
        <div className="flex gap-2">
            <input
                type="text" // Changed to text to handle empty values
                className="border p-2"
                placeholder="Target Value"
                value={target ?? ""}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) { // Only allow numeric input
                        setTarget(value); // Update state
                    }
                }}
                disabled={isSearching}
            />
            <button
                className="bg-green-800 text-white px-4 py-2"
                onClick={startSearch}
                disabled={isSearching} // Disable button while searching
            >
                Start Search
            </button>
            <button
                className="bg-blue-800 text-white px-4 py-2"
                onClick={changeArray}
                disabled={isSearching} // Disable button while searching
            >
                Change Array
            </button>
            <button
                className="bg-red-800 text-white px-4 py-2"
                onClick={resetPointer}
                disabled={isSearching}
            >
                Reset Array Pointer
            </button>
        </div>
    );
};

export default Controls;
