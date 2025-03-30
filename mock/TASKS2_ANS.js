{
  //========================== 1
  const count = (a, b) => {
    return a + b;
  };

  const memo = (fn) => {
    const cache = new Map();

    return (...args) => {
      const key = JSON.stringify(args);

      if (cache.has(key)) {
        console.log("from cache");
        return cache.get(key);
      }

      console.log("call fn");
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  };

  const memoCount = memo(count);

  console.log(memoCount(1, 2)); // 3 (вызов Count)
  console.log(memoCount(3, 1)); // 4 (вызов Count)
  console.log(memoCount(1, 2)); // 3 (обращение к cache)
}

{
  //========================== 2
  const isAnagram = (str1, str2) => {
    if (str1.length !== str2.length) return false;

    const sort = (str) => str.split("").sort().join("");
    return sort(str1) === sort(str2);
  };
}

{
  //========================== 3
  const getUniq = (arr) => [...new Set(arr)];
}

{
  //========================== 4
  const getUniq2 = (arr) => {
    const count = {};

    for (const item of arr) {
      count[item] = (count[item] || 0) + 1;
    }

    return arr.filter((item) => count[item] === 1);
  };
}

{
  //========================== 5
  const onlyDubles = (arr) => {
    const count = {};
    for (const num of arr) {
      count[num] = (count[num] || 0) + 1;
    }

    return [...new Set(arr.filter((num) => count[num] > 1))];
  };
}

{
  var isPalindrome = function (s) {
    const clearString = s.replace(/[^a-z0-9]/gi, "").toLowerCase();
    return (
      clearString === clearString.split("").reverse().join("").toLowerCase()
    );
  };
}
