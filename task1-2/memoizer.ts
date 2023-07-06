function memoizer<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}

function sum(a: number, b: number): number {
  console.log("Executed! - Because new arguements are passed.");
  return a + b;
}

const memoizedSum = memoizer(sum);

console.log(memoizedSum(1, 1));
console.log(memoizedSum(1, 1));
console.log(memoizedSum(1, 2));
console.log(memoizedSum(1, 1));
console.log(memoizedSum(1, 2));
console.log(memoizedSum(1, 2));
