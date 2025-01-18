// const res = new Promise((res, rej) => {
//   rej("error");
// })
//   .then(
//     (val) => {
//       console.log(1, val);
//       return val;
//     },
//     (val) => {
//       console.log(2, val);
//       throw new Error("test");
//     }
//   )
//   .finally(() => console.log(3, "finally"))
//   .catch((err) => {
//     console.log(4, err);
//     return err;
//   })
//   .finally(() => console.log(5, "finally"))
//   .then((val) => {
//     console.log(6, val);
//     return val;
//   });

// 2 3 4 5 6

const setty = new WeakSet();
const mappy = new WeakMap();

setty.add({add: "rer"});
mappy.set({add: "rer"}, 123);

// new Promise((resolve) => {
//   console.log("res", a);

//   a += 55; // err 'a' not defined, если заменить на var ошибки не будет!
//   resolve(a);
// })
//   .then((res) => console.log("res", res))
//   .catch((err) => console.log("err", a)); // err 6;

// let a = 5;
// a++;

// var i = 0;

// while (i++ < 5) {
//   const newI = i;
//   setTimeout(() => console.log({i, newI}), 0);
// }

const summy = (...args) => {
  if (args.length >= 2) {
    return args[0] + args[1];
  } else {
    return (...args2) => summy(...args, ...args2);
  }
};

// console.log("summy", summy(4)(4), summy(5, 5));

// 1. Возвращаем функцию curried и замыкаем func, который хотим каррировать
// 2. Если кол-во аргументов, переданных в curried >= кол-ву аргументов каррированной func, то просто возвращаем результат func(...args)
// 3. Если кол-во аргументов в curried меньше, чем в func, то возврат функции, внутри которой рекурсивно вызывается curried с прошлыми и новыми аргументами
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...args2) {
        return curried(...args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

// console.log("curriedSum123", curriedSum(1, 2)(3));

function throttle(mainFunction, delay) {
  let timerFlag = null; // Variable to keep track of the timer

  // Returning a throttled version
  return (...args) => {
    if (timerFlag === null) {
      // If there is no timer currently running
      mainFunction(...args); // Execute the main function
      timerFlag = setTimeout(() => {
        // Set a timer to clear the timerFlag after the specified delay
        timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
      }, delay);
    }
  };
}

class Pet {
  constructor(n) {
    this._name = n;
  }

  getName = () => {
    return this?._name;
  };

  getIt = function () {
    return this?._name;
  };
}

const pet = new Pet("test");

const {getName, getIt} = pet;
//
// console.log("Pet", pet.getName(), getName(), getIt());

var obj = {
  i: 10,
  b: function () {
    const arr = () => {
      console.log("arrow in decl", this?.i);
    };
    return arr();
  },
  c: function () {
    console.log("declaration", this?.i);
  },
  g: () => {
    console.log("arrow", this?.i);
  },
};

// console.clear()
// obj.b();
// obj.c();
// obj.g();

// const {g, b} = obj;
// g();
// b();

// obj.b = obj.b.bind({i: 777});
// obj.b()

// for (var i = 0; i < 5; i++) {
//   let ui = i;
//   setTimeout(() => {
//     console.log(ui);
//   }, 0);
// }

// let b = { a: 1, b: 2, c: 3 };

// b = { ...b, e: 4 };

// console.log(b);

const summa = function () {
  const [n1, n2] = arguments;
  if (n2) {
    return n1 + n2;
  } else {
    return (n2) => {
      return n1 + n2;
    };
  }
};

// console.log(summa(1, 2), summa(1)(2));

// FLATTTTTTEN
// const flatten = (arr) => {
//   return arr.flat(Infinity);
// };

const flatten = (arr, deep = Infinity) => {
  const flat = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && deep > 0) {
      const flattedArr = flatten(arr[i], deep - 1);
      flat.push(...flattedArr);
    } else {
      flat.push(arr[i]);
    }
  }

  return flat;
};

// console.log(flatten([1, 2, 3, [4, [5, [6, [7, [[8]]]]]]], 1 ));

// const findUniq = (arr) => {
//   const map = {};

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] in map) {
//       map[arr[i]] += 1;
//     } else {
//       map[arr[i]] = 1;
//     }
//   }

//   return Object.keys(map).filter((key) => map[key] === 1);
// };

const findUniq = (arr) => {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }

  const res = [];

  map.forEach((val, key) => {
    if (val === 1) res.push(key);
  });

  return res;
};

// const findUniq = (arr) => {
//   const valsMap = {};
//   const valsHistory = {};

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] in valsMap) {
//       delete valsMap[arr[i]];
//     } else if (!(arr[i] in valsHistory)) {
//       valsMap[arr[i]] = arr[i];
//       valsHistory[arr[i]] = arr[i];
//     }
//   }

//   return Object.values(valsMap);
// };

// console.log(findUniq([1, 1, 1, 3, 4, 4, 2, 5, 5, 5, 8]));

// const usePropsChanges = (props) => {
//   const prevProps = useRef();

//   useEffect(() => {
//     for (let key in props) {
//       if (props[key] !== prevProps[key]) {
//         console.log("change", key);
//       }
//     }

//     prevProps.current = props;
//   }, []);
// };

// intersection
// [1, 4, 5, 10, 8], [1, 8, 7, 9, 5] => [1, 8, 5]

function intersection(a, b) {
  const setA = new Set(a);

  return b.filter((val) => setA.has(val));
}

// console.log('intersection', intersection([1, 4, 5, 10, 8], [1, 8, 7, 9, 5]));

// class C {
//   a = 1;
//   autoBoundMethod = () => {
//     console.log(this);
//   };
// }

// const c = new C();
// c.autoBoundMethod(); // 1
// const { autoBoundMethod } = c;
// autoBoundMethod(); // 1
// If it were a normal method, it should be undefined in this case

class Singleton {
  static obj = null;

  constructor() {
    if (Singleton.obj) {
      return Singleton.obj;
    }

    Singleton.obj = this;
  }
}

const objy = new Singleton();
const objy2 = new Singleton();
// console.log(objy === objy2);

// Откладывает выполнение функции на опр. кол-во времени
const debouncer = (func, delay) => {
  let timer;

  return (...args) => {
    // При каждом вызове создается новый таймер
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const debbyLog = debouncer(() => console.log("debouncer"), 1000);
// debbyLog();
// debbyLog();
// debbyLog();

const throttler = (func, period) => {
  let timer;

  return (...args) => {
    if (!timer) {
      func(...args);
      timer = setTimeout(() => {
        timer = null;
      }, period);
    }
  };
};

const throttyLog = debouncer(() => console.log("throttler"), 1000);
// throttyLog();
// throttyLog();
// throttyLog();

Function.prototype.customBind = function (ctx, ...args) {
  const fn = this; // not work for arrow functions

  return function (...args2) {
    return fn.apply(ctx, [...args, ...args2]);
  };
};

Function.prototype.customCall = function (objRef, ...args) {
  const fn = this;

  return fn.bind(objRef)(...args);
};

Function.prototype.customApply = function (objRef, args = []) {
  const fn = this;

  return fn.call(objRef, ...args);
};

Function.prototype.customCall2 = function (objRef, ...args) {
  const symbolId = Symbol("fn");

  const otherObj = Object.create(objRef);
  otherObj[symbolId] = this;

  return otherObj[symbolId](...args);
};

const testobj = {
  name: "Namer",
};

const func = function () {
  return this.name;
};

const boundFn = func.customBind(testobj);

// console.log("customBind", boundFn());

// console.log("customCall", func.customCall(testobj));
// console.log("customCall2", func.customCall2(testobj));

// console.log("customApply", func.customApply(testobj));

const promiseAll = function (arr) {
  const result = [];
  let completedCount = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then((res) => {
          result[i] = res;
          completedCount += 1;

          if (completedCount === arr.length) {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
};

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

const taskList = [delay(1000), delay(2000), delay(3000)];

// promiseAll(taskList)
//   .then((results) => {
//     console.log("promiseAll", results);
//   })
//   .catch(console.error);

const promiseRace = function (promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, i) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

const promiseAny = function (promisesArray) {
  const promiseErrors = new Array(promisesArray.length);
  let counter = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, i) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((err) => {
          promiseErrors[i] = err;
          counter += 1;

          if (counter === promiseErrors.length) {
            reject(promiseErrors);
          }
        });
    });
  });
};

// promiseAny(taskList).then((res) => console.log("promiseAny", res));

const str = "one.two.three.four.five";

// RESULT
// {
//   one: {
//     two: {
//       three: {
//         four: {
//           five: {}
//         }
//       }
//     }
//   }
// }

// 1
// const getObject = (someStr) => {
//   const arr = someStr.split(".");
//   const obj = {};
//   const key = arr[0];

//   if (!someStr) return obj;

//   arr.shift();
//   obj[key] = getObject(arr.join("."));

//   return obj;
// };

// 2
// const getObject = (someStr) => {
//   const arr = someStr.split(".");

//   return arr.reduceRight((acc, key) => {
//     return {[key]: acc};
//   }, {});
// };

// 3
const getObject = (someStr) => {
  const arr = someStr.split(".");

  let result = {};
  let currentObj = result;

  arr.forEach((key) => {
    currentObj[key] = {};
    currentObj = currentObj[key];
  });

  return result;
};

// console.log(getObject(str));

{
  const example = {
    a: 1,
    b: 2,
    c: [2, 3, 4],
    d: {
      e: {
        test: "jeyz",
      },
      f: ["ley", "gee"],
    },
  };

  function deepClone(obj) {
    if (obj === null || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) return obj.map(deepClone);

    const res = {};

    for (let key in obj) {
      res[key] = deepClone(obj[key]);
    }

    return res;
  }

  const resultObj = deepClone(example);
  // console.log(
  //   resultObj,
  //   resultObj.func === example.func,
  //   resultObj === example
  // );

  const isEqual = (obj1, obj2) => {
    if (
      obj1 === null ||
      obj2 === null ||
      typeof obj1 !== "object" ||
      typeof obj2 !== "object"
    ) {
      return obj1 === obj2;
    }

    if (Array.isArray(obj1) && Array.isArray(obj1)) {
      if (obj1.length === obj2.length) {
        return obj1.every((elem, i) => isEqual(elem, obj2[i]));
      }
    }

    if (
      !obj1 ||
      !obj2 ||
      Object.keys(obj1).length !== Object.keys(obj2).length
    ) {
      return false;
    }

    return Object.keys(obj1).every((key) => isEqual(obj1[key], obj2[key]));
  };

  // console.log(isEqual(example, resultObj));
}

// COMPRESS => AAAABBBACC => A4B3C2
{
  const compressString = (str) => {
    const arr = str.split("");
    let res = "";
    let prevSym;
    let count = 0;

    arr.forEach((item, i, array) => {
      if (!prevSym) {
        prevSym = item;
      }

      if (prevSym === item) {
        count++;

        if (array[i + 1] !== item) {
          res = count > 1 ? res + item + count : res;
          prevSym = null;
          count = 0;
        }
      }
    });

    return res;
  };

  // console.log(compressString("AAAABBBACC"));
}

{
  function sortOddArray(array) {
    // фильтр нечетных чисел и их сортировка по возрастанию
    const odd = array.filter((x) => x % 2).sort((a, b) => a - b);
    // if x нечетная вставляем на ее место отсортированное нечетное odd.shift() else оставляем четное x на своем месте
    return array.map((x) => (x % 2 ? odd.shift() : x));
  }

  // console.log(sortOddArray([5, 3, 2, 8, 1, 4]));
}

{
  const sortOdd = (arr) => {
    const positions = [];
    const values = [];

    arr.forEach((value, i) => {
      if (value % 2 === 1) {
        positions.push(i); // пушим индексы нечетных чисел
        values.push(value); // пушим нечетные значения
      }
    });

    values.sort((a, b) => a - b); // сортируем нечетные значения по возр.

    for (let i = 0; i < positions.length; i++) {
      arr[positions[i]] = values[i]; // значение по индексу из positions в исходном массиве равно отсортированному значению из values
    }

    return arr;
  };

  // console.log(sortOdd([2, 3, 1, 7, 4, 9, 5, 8])); // [2, 1, 3, 5, 4, 7, 9, 8]
  // console.log(sortOdd([1, 2])); // [1, 2]
}

{
  const sortOdd = (arr) => {
    const odds = arr.filter((x) => x % 2).sort((a, b) => a - b);
    let oddIdx = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2) arr[i] = odds[oddIdx++];
    }

    return arr;
  };

  // console.log(sortOdd([2, 3, 1, 7, 4, 9, 5, 8])); // [2, 1, 3, 5, 4, 7, 9, 8]
  // console.log(sortOdd([1, 2])); // [1, 2]
}

{
  const limits = {
    5000: 5,
    2000: 3,
    1000: 5,
    500: 8,
    200: 2,
    100: 2,
    50: 4,
  };

  const atm = (sum, limits) => {
    let rest = sum;

    return Object.entries(limits).reduceRight((acc, [denomination, count]) => {
      const requiredCount = Math.floor(rest / denomination);
      const availableCount = requiredCount > count ? count : requiredCount;
      acc[denomination] = availableCount;
      rest -= denomination * availableCount;
      limits[denomination] = limits[denomination] - availableCount;
      return acc;
    }, {});
  };

  console.log(atm(11300, limits));
}

class MinStack {
  constructor() {
    this.stack = [];
  }

  push(val) {
    if (!this.stack.length) {
      this.stack.push({min: val, val});
    } else {
      const min = Math.min(this.getMin(), val);
      this.stack.push({val, min});
    }
  }

  pop() {
    this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1]?.val || null;
  }

  getMin() {
    return this.stack[this.stack.length - 1]?.min || null;
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 */
var obj = new MinStack();
obj.push(1);
obj.push(2);
obj.push(3);
obj.push(4);
obj.push(0);
obj.pop();

// console.clear();
// console.log(obj.top(), obj.getMin());
