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
  const get = (obj, path) => {
    return path.split(".").reduce((acc, segment) => {
      return acc[segment];
    }, obj);
  };

  //   console.log("get", get(obj, "a.b")); // { c : 'd' }
  //   console.log("get", get(obj, "a.b.c")); // 'd'
  //   console.log("get", get(obj, "name")); // 'tester'
}

{
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
}

{
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
}

{
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

  const getConcated = (arr) => {
    const str = arr
      .filter((item) => !item.expired)
      .sort((a, b) => a.order - b.order)
      .map((item) => item.value.split("").reverse().join(""))
      .join("");

    return Array.from(new Set(str)).join("");
  };

  console.log(getConcated(input), "getConcat"); // Результат - 1zyx2badc
}

{
  const ownFilter = (arr, cb) => {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      if (cb(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }

    return result;
  };
}

{
  const curry = (fn) => {
    return function resultFunc(...args) {
      if (args.length >= fn.length) {
        return fn(...args);
      } else {
        return (...args2) => {
          return resultFunc(...args.concat(args2));
        };
      }
    };
  };
}

{
  const debounce = (fn, ms) => {
    let timeId = null;

    return (...args) => {
      clearTimeout(timeId);

      timeId = setTimeout(() => {
        fn(...args);
      }, ms);
    };
  };

  const throttle = (fn, ms) => {
    let timer = null;

    return (...args) => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
        }, ms);

        return fn(...args);
      }
    };
  };
}
