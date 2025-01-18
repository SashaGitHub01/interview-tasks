{
  // Two pointers
  var twoSum = function (nums, target) {
    let left = 0;
    let right = 1;

    while (left < right) {
        const a = nums[left];
        const b = nums[right];

        if (a + b === target) {
            return [left, right]
        } else if (right === nums.length - 1) {
            left += 1;
            right = left + 1;
        } else {
            right++
        }
    }
};

  var twoSum2 = function (nums, target) {
    const diffMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];

        if (diffMap.has(diff)) return [i, diffMap.get(diff)]

        diffMap.set(nums[i], i)
    }
};
}

// var isPalindrome = function (s) {
//     const clearString = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
//     return clearString === clearString.split('').reverse().join('').toLowerCase()
// };
{
  var isPalindrome = function (s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
      if (!isAlphaNumeric(s[left])) {
        left++;
      } else if (!isAlphaNumeric(s[right])) {
        right--;
      } else if (s[left].toLowerCase() !== s[right].toLowerCase()) {
        return false;
      } else {
        left++;
        right--;
      }
    }

    return true;
  };

  function isAlphaNumeric(char) {
    const code = char.charCodeAt(0);
    return (
      (code >= 48 && code <= 57) ||
      (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122)
    );
  }
}

{
  var twoSum = function (numbers, target) {
    let start = 0;
    let end = numbers.length - 1;

    while (start < end) {
      if (numbers[start] + numbers[end] > target) {
        end--;
      } else if (numbers[start] + numbers[end] < target) {
        start++;
      } else if (numbers[start] + numbers[end] === target) {
        return [start + 1, end + 1];
      }
    }
  };
}

// 1. Перебор каждого элемнента массива
// 2. two pointers
function threeSum(nums) {
  const res = [];

  nums.sort((a, b) => a - b);

  const target = 0;

  for (let i = 0; i < nums.length - 2; i++) {
      if (nums[i] > target) break;

      if (i > 0 && nums[i] === nums[i - 1]) continue;

      let j = i + 1;
      let k = nums.length - 1;

      while (j < k) {
          const sum = nums[i] + nums[j] + nums[k];

          if (sum === target) {
              res.push([nums[i], nums[j], nums[k]])
          } else if (sum > target) {
              k--
              continue;
          } else if (sum < target) {
              j++
              continue;
          }

          while (nums[j] === nums[j + 1]) j++;
          while (nums[k] === nums[k - 1]) k--;

          j++;
          k--;
      }
  }

  return res;
};