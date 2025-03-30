//========================== 1
const count = (a, b) => {
  return a + b;
};

const memo = (fn) => {};

const memoCount = memo(count);

console.log(memoCount(1, 2)); // 3 (вызов Count)
console.log(memoCount(3, 1)); // 4 (вызов Count)
console.log(memoCount(1, 2)); // 3 (обращение к cache)

//========================== 2
const isAnagram = (str1, str2) => {};

console.log(isAnagram("offer", "reffo")); // true
console.log(isAnagram("rat", "car")); // false

//========================== 3
const getUniq = (arr) => {};

console.log(getUniq([1, 1, 2, 2, 3, 4, 5, 5, 5]), "uniq"); // 1, 2, 3, 4, 5

//========================== 4
const getUniq2 = (arr) => {};

console.log(getUniq([1, 1, 2, 2, 3, 4, 5, 5, 5]), "uniq"); // 3, 4

// ===================== 5
const onlyDubles = (arr) => {};

console.log(onlyDubles([1, 1, 1, 2, 3, 3, 4, 7, 9, 9, 9]), "not uniq"); // 1 3 9

{
  // Проверка на палиндром
  // Example 1:
  // Input: s = "A man, a plan, a canal: Panama"
  // Output: true
  // Explanation: "amanaplanacanalpanama" is a palindrome.

  // Example 2:
  // Input: s = "race a car"
  // Output: false
  // Explanation: "raceacar" is not a palindrome.

  var isPalindrome = function (s) {};
}
