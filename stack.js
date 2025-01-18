/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];
  const operators = new Set(["+", "-", "*", "/"]);

  tokens.forEach((tkn) => {
    if (operators.has(tkn)) {
      const v2 = stack.pop();
      const v1 = stack.pop();
      const value =
        tkn === "/"
          ? Math.trunc(eval(`(${v1})${tkn}(${v2})`))
          : eval(`(${v1})${tkn}(${v2})`);
      stack.push(value);
    } else {
      stack.push(tkn);
    }
  });

  return stack[0];
};

// console.log(evalRPN(["2","1","+","3","*"]))
// console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))

{
  /**
   * @param {number[]} temperatures
   * @return {number[]}
   */
  var dailyTemperatures = function (temperatures) {
    const stack = [];
    const res = new Array(temperatures.length).fill(0);

    for (let i = temperatures.length - 1; i >= 0; i--) {
      while (stack.length && temperatures[i] >= temperatures[stack[0]]) {
        stack.shift();
      }

      if (stack.length === 0) {
        res[i] = 0;
      } else {
        res[i] = stack[0] - i;
      }

      stack.unshift(i);
    }

    return res;
  };

  // console.log(dailyTemperatures([73,74,75,71,69,72,76,73]))
  // console.log(dailyTemperatures([30,40,50,60]))
}

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

