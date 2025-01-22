export const linearSearch = (arr: number[], target: number): number[] => {
    const steps: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      steps.push(i); // Track the current index
      if (arr[i] === target) break;
    }
    return steps;
  };
  