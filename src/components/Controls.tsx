interface ControlsProps {
    target: number | null;
    setTarget: React.Dispatch<React.SetStateAction<number | null>>;
    startSearch: () => void;
    changeArray: () => void;
    isSearching: boolean;
  }
  
  const Controls: React.FC<ControlsProps> = ({
    target,
    setTarget,
    startSearch,
    changeArray,
    isSearching,
  }) => {
    return (
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
    );
  };
  
  export default Controls;
  