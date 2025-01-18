function merge(left, right) {
  let sortedArr = []; // the sorted items will go here
  while (left.length && right.length) {
    // Insert the smallest item into sortedArr
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  // Use spread operators to create a new array, combining the three arrays
  return [...sortedArr, ...left, ...right];
}
merge([1, 4], [2, 6, 9]); // [1, 2, 4, 6, 9]

function mergeSort(arr) {
  // Base case
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  // Recursive calls
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
mergeSort([3, 5, 8, 5, 99, 1]); // [1, 3, 5, 5, 8, 99]

// quick sort
function partition(arr, start, end) {
  const pivotValue = arr[start];
  let swapIndex = start;
  for (let i = start + 1; i <= end; i++) {
    if (pivotValue > arr[i]) {
      swapIndex++;
      if (i !== swapIndex) {
        // SWAP
        [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
      }
    }
  }
  if (swapIndex !== start) {
    // Swap pivot into correct place
    [arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]];
  }
  return swapIndex;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
  // Base case
  if (start >= end) return;
  let pivotIndex = partition(arr, start, end);
  // Left
  quickSort(arr, start, pivotIndex - 1);
  // Right
  quickSort(arr, pivotIndex + 1, end);
  return arr;
}

// binarySearch
function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (arr[middle] < target) {
      // Search the right half
      start = middle + 1;
    } else if (arr[middle] > target) {
      // Search the left half
      end = middle - 1;
    } else if (arr[middle] === target) {
      // Found target
      return middle;
    }
  }
  // Target not found
  return -1;
}

{
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  var search = function (nums, target) {
    let start = 0;
    let end = nums.length - 1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);

      if (nums[mid] > target) {
        end = mid - 1;
      } else if (nums[mid] < target) {
        start = mid + 1;
      } else {
        return mid;
      }
    }

    return -1;
  };
  // console.log(search([-1,0,3,5,9,12]))
}

{
  /**
   * @param {number[]} prices
   * @return {number}
   */
  var maxProfit = function (prices) {
    let max = 0;

    for (let i = 0; i < prices.length; i++) {
      for (j = i + 1; j < prices.length; j++) {
        max = Math.max(max, prices[j] - prices[i]);
      }
    }

    return max;
  };

  // console.log(maxProfit([7,1,5,3,6,4]))
}

{
  /**
   * @param {number[]} prices
   * @return {number}
   */
  var maxProfit = function (prices) {
    let buy = prices[0];
    let profit = 0;

    for (let i = 1; i < prices.length; i++) {
      if (buy > prices[i]) {
        buy = prices[i];
      } else if (prices[i] - buy > profit) {
        profit = prices[i] - buy;
      }
    }

    return profit;
  };
}

{
  /**
   * @param {number[]} prices
   * @return {number}
   */
  var maxProfit = function (prices) {
    let max = 0;

    let left = 0;
    let right = 1;

    while (right < prices.length) {
      if (prices[left] < prices[right]) {
        max = Math.max(max, prices[right] - prices[left]);
      } else {
        left = right;
      }

      right++;
    }

    return max;
  };
  // console.log(maxProfit([7,1,5,3,6,4]))
}

{
  /**
   * @param {string} s
   * @return {number}
   */
  var lengthOfLongestSubstring = function (s) {
    let set = new Set();
    let left = 0;
    let max = 0;

    for (let i = 0; i < s.length; i++) {
      while (set.has(s[i])) {
        console.log(i, "delete");
        set.delete(s[left]);
        left++;
      }

      set.add(s[i]);
      max = Math.max(set.size, max);
    }

    return max;
  };

  // console.log(lengthOfLongestSubstring("abcabcbb"));
}

{
  /**
   * @param {string} s
   * @return {number}
   */
  var lengthOfLongestSubstring = function (s) {
    const history = new Map();
    let start = 0;
    let max = 0;

    for (let i = 0; i < s.length; i++) {
      if (history.has(s[i])) {
        start = Math.max(history.get(s[i]) + 1, start);
      }

      history.set(s[i], i);
      max = Math.max(max, i - start + 1);
    }

    return max;
  };
}

{
  /**
   * @param {string} s
   * @param {number} k
   * @return {number}
   */
  const characterReplacement = (s, k) => {
    const chars = new Map();
    let maxCount = 0;
    let start = 0;
    let ans = 0;

    for (let i = 0; i < s.length; i++) {
      const charCount = (chars.get(s[i]) || 0) + 1;
      chars.set(s[i], charCount);
      maxCount = Math.max(charCount, maxCount);

      if (i - start + 1 - maxCount > k) {
        chars.set(s[start], chars.get(s[start] - 1));
        start++;
      }

      ans = Math.max(i - start + 1, ans);
    }

    return ans;
  };
}
