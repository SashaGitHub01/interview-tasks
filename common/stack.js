{
  /**
   * @param {string} s
   * @return {boolean}
   */

  const brakets = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  var isValid = function (s) {
    const stack = [];

    for (let str of s) {
      if (str in brakets) {
        stack.push(str);
      } else if (str !== brakets[stack.pop()]) {
        return false;
      }
    }

    return !stack.length;
  };
}
