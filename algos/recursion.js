
{
  const multiply = (arr, n) => {
    if (n === -1) return 1;

    return arr[n] * multiply(arr, n - 1);
  };

  console.log("multiply", multiply([1, 2, 3, 4, 5], 4));
}

{
  const isPalindrome = (num, i, j) => {
    if (i >= j) {
      return true;
    }

    return num[i] === num[j] && isPalindrome(num, i + 1, j - 1);
  };

  console.log("isPalindrome", isPalindrome("199991", 0, 5));
  // console.log("isPalindrome", isPalindrome('198991', 0, 5));
  // console.log("isPalindrome", isPalindrome('100001', 0, 5));
}

{
  const isPalindrome = (num, i, j) => {
    if (i >= j) {
      return true;
    }

    return num[i] === num[j] && isPalindrome(num, i + 1, j - 1);
  };

  console.log("isPalindrome", isPalindrome("199991", 0, 5));
}

{
  const binarySearch = (nums, target, lo, hi) => {
    if (lo > hi) return -1;

    const mid = Math.floor((lo + hi) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] > target) return binarySearch(nums, target, lo, mid - 1)

    return binarySearch(nums, target, mid + 1, hi)
  };

  console.log("binarySearch", binarySearch([1, 3, 5, 7, 26, 27], 7, 0, 5));
}
