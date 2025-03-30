{
  const obj = {
    a: {
      b: {
        c: "d",
      },
    },
    name: "tester",
  };

  // Написать функцию get -> get(obj, 'a.b.c')
  const get = (obj, path) => {};

  //   console.log("get", get(obj, "a.b")); // { c : 'd' }
  //   console.log("get", get(obj, "a.b.c")); // 'd'
  //   console.log("get", get(obj, "name")); // 'tester'
}

// ================== 1
// [1, 2, [3, 4], [[5, [6]]], 7, 8] ==>> [1, 2, 3, 4, 5, 6, 7, 8]

const flatten = (arr) => {};

console.log(flatten([1, 2, [3, 4], [[5, [6]]], 7, 8]));

// ================= 3
// Результат - строка из сконкотенированных value элементов,
// расположенных в обратном порядке,
// в порядке возрастания order,
// не содержит одинаковых букв, не содержит expired элементов
const input = [
  {value: "abcd", order: 4, expired: false},
  {value: "qwer", order: 2, expired: true},
  {value: "xyz1", order: 1, expired: false},
  {value: "abx2", order: 3, expired: false},
];

const getConcated = (arr) => {};

console.log(getConcated(input), "getConcat"); // Результат - 1zyx2badc

// ================= 4
const ownFilter = (arr, cb) => {};

console.log(ownFilter([1, 2, 3, 4], (val) => val > 3));

{
  const curry = (fn) => {};

  const sum = (a, b, c) => {
    return a + b + c;
  };

  const curriedSum = curry(sum);
  // console.log(curriedSum(5, 5)(5), curriedSum(5)(5)(5)); // 15
}

{
  const logger = (val) => {
    console.log("logger", val);
  };

  //
  {
    const debounce = (fn, ms) => {};

    const debouncedLogger = debounce(logger, 500);
    // Должен вызваться только один раз c 6
    // debouncedLogger(1);
    // debouncedLogger(2);
    // debouncedLogger(3);
    // debouncedLogger(4);
    // debouncedLogger(5);
    // debouncedLogger(6);
  }

  //
  {
    const throttle = (fn, ms) => {};

    const throttledLogger = throttle(logger, 1500);
    //   Должен вызваться только один раз c 1
    //   throttledLogger(1);
    //   throttledLogger(2);
    //   throttledLogger(3);
    //   throttledLogger(4);
    //   throttledLogger(5);
    //   throttledLogger(6);
  }
}

{
  const sleep = (ms) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(ms);
      }, ms);
    });
  };

  // Написать свой Promise.all()
  const promiseAll = (promises) => {};

  // promiseAll([sleep(3000), sleep(1000), sleep(2000)]).then((res) => {
  //   console.log(res);
  // });
}
