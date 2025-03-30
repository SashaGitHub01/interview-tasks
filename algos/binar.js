{
  const lowerBound = (nums, target) => {
    let start = 0;
    let end = nums.length - 1;
    let ans = -1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2)

      if (nums[mid] < target) {
        start = mid + 1;
      } else {
        ans = mid;
        end = mid - 1;
      }
    }

    return ans;
  };

  console.log(
    "lowerBound",
    lowerBound([1, 7, 14, 26, 27, 32, 34, 38, 42, 56, 75], 0)
  );
  console.log(
    "lowerBound",
    lowerBound([1, 7, 14, 26, 27, 32, 34, 38, 42, 56, 75], 78)
  );
}

{
  const upperBound = (nums, target) => {
    let start = 0;
    let end = nums.length - 1;
    let ans = -1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2)

      if (nums[mid] <= target) {
        start = mid + 1;
      } else {
        ans = mid;
        end = mid - 1;
      }
    }

    return ans;
  };

  console.log(
    "upperBound",
    upperBound([2, 7, 14, 26, 27, 32, 34, 38, 42, 56, 75], 34)
  );
  console.log(
    "upperBound",
    upperBound([1, 7, 14, 26, 27, 32, 34, 38, 42, 56, 75], 78)
  );
}
