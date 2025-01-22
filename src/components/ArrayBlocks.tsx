interface ArrayBlocksProps {
    array: number[];
    currentIndex: number | null;
  }
  
  const ArrayBlocks: React.FC<ArrayBlocksProps> = ({ array, currentIndex }) => {
    return (
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
    );
  };
  
  export default ArrayBlocks;
  