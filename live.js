{
  const obj = {
    a: {
      b: {
        c: "d",
      },
    },
  };

  const get = (obj, path) => {
    return path.split(".").reduce((acc, s) => {
      acc = acc[s];
      return acc;
    }, obj);
  };

  console.log("get", get(obj, "a.b")); // { c : 'd' }
  console.log("get", get(obj, "a.b.c")); // 'd'
}

{
  const isMono = (nums) => {
    let isPos = false;
    let isNeg = false;

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > nums[i - 1]) {
        isPos = true;
      } else if (nums[i] < nums[i - 1]) {
        isNeg = true;
      }
    }

    return !(isPos && isNeg);
  };

  // [1, 2, 5, 5, 5, 2, 1]
  // Нужно убедиться, что числа в нем либо только возрастают, либо только убывают:
  console.log("isMono", isMono([1, 2, 5, 5, 5, 2, 1]));
  console.log("isMono", isMono([1, 2, 3, 4, 5]));
  console.log("isMono", isMono([5, 4, 3, 2, 0]));
}

{
  const sumToEleven = (nums) => {
    const map = {};

    return nums.reduce((acc, num) => {
      const target = 11 - num;
      map[target] = num;

      if (map[num]) acc.push([map[num], num]);

      return acc;
    }, []);
  };

  // Нужно найти в нем все комбинации из двух чисел сумма которых равна 11:
  // arg [3, 4, 5, 6, 7]
  // return [[4, 7], [5, 6]]
  console.log("sumToEleven", sumToEleven([3, 4, 5, 6, 7]));
}

{
  // Нужно реализовать банкомат:

  class ATM {
    vault = {
      5000: 0,
      2000: 0,
      1000: 0,
      500: 0,
      100: 0,
      50: 0,
    };

    deposit(bills) {
      if (!bills.length) {
        return "Положите деньги в купюроприемник";
      }

      const invalid = [];
      let total = 0;

      bills.forEach((bill) => {
        if (bill in this.vault) {
          this.vault[bill] = this.vault[bill] + 1;
          total += bill;
        } else {
          invalid.push(bill);
        }
      });

      return `Внесено ${total}. Заберите нераспознанные купюры ${invalid.join(
        ", "
      )}`;
    }

    whithdrow(amount) {
      if (amount > this.total) {
        return "Не могу выдать нужную сумму, недостаточно средств";
      }

      let rest = amount;

      const res = Object.entries(this.vault).reduceRight(
        (acc, [denomination, count]) => {
          const billsCount = Math.floor(rest / denomination);
          const availableBillsCount = billsCount > count ? count : billsCount;
          const bills = new Array(availableBillsCount).fill(denomination);
          rest = rest - availableBillsCount * denomination;
          acc.push(...bills);

          return acc;
        },
        []
      );

      if (rest) {
        return "Не могу выдать нужную сумму, недостаточно купюр";
      }

      return res;
    }

    // возвращает массив купюр который доступен на прием/выдачу
    get accept() {
      return Object.keys(this.vault);
    }

    // возвращает сколько всего денег во внутреннем хранилище
    get total() {
      return Object.entries(this.vault).reduce(
        (acc, pair) => acc + pair[0] * pair[1],
        0
      );
    }

    // возвращает касету с деньгами в виде объекта при инкассации
    get collect() {
      return this.vault;
    }
  }

  const atm = new ATM();
  // console.log("ATM accept", atm.accept); // [ 50, 100, 500, 1000, 2000, 5000 ]
  // console.log("ATM whithdrow", atm.whithdrow(3500)); // Error: Не могу выдать нужную сумму, недостаточно средств
  // console.log("ATM deposit", atm.deposit([])); // Error: Положите деньги в купюроприемник
  // console.log("ATM deposit", atm.deposit([5000, 1000, 5000, 500, 100, 50, 50])); // Внесено 11700
  // console.log("ATM deposit", atm.deposit([500, 10, 5])); // Внесено 500, Заберите нераспознанные купюры [10, 5]
  // console.log("ATM whithdrow", atm.whithdrow(3500));
  // console.log("ATM whithdrow", atm.whithdrow(11700)); // [1000, 500, 500, 100]
  // atm.whithdrow(0); // Error: Укажите корректную сумму
  // console.log("ATM total", atm.total);
  // console.log("ATM collect", atm.collect); // { '50': 2, '100': 0, '500': 0, '1000': 0, '2000': 0, '5000': 2 }
}

{
  /**
   * Дан массив билетов:
   * Нужно расположить их один за другим чтобы получился непрерывный маршрут:
   * @param {Object[]} tickets
   * @returns {Object[]}
   */
  const getRoute = (tickets) => {
    const from = new Set();
    const to = new Set();

    tickets.forEach((ticket) => {
      from.add(ticket.from);
      to.add(ticket.to);
    });

    // билет из начальной точки
    const first = tickets.find((ticket) => {
      return !to.has(ticket.from);
    });

    const res = [first];

    while (res.length < tickets.length) {
      const lastTicket = res[res.length - 1];
      const nextTicket = tickets.find((ticket) => {
        return ticket.from === lastTicket.to;
      });

      res.push(nextTicket);
    }

    return res;
  };

  console.log(
    getRoute([
      {from: "Astana", to: "Bali"},
      {from: "Moscow", to: "Astana"},
      {from: "Bali", to: "SPb"},
    ])
  );
  /*
  [
    { from: 'Moscow', to: 'Astana' },
    { from: 'Astana', to: 'Bali' },
    { from: 'Bali', to: 'SPb' }
  ]
*/
}

{
  //   Дано число:
  // -123
  // Нужно его перевернуть:
  // -321

  const reverseNumber = (num) => {
    const isNegative = num < 0;
    const reversed = Math.abs(num).toString().split("").reverse().join("");

    return isNegative ? -Number(reversed) : Number(reversed);
  };

  console.log("reverseNumber", reverseNumber(-123)); // -321
  console.log("reverseNumber", reverseNumber(123)); // 321
}

{
  // https://leetcode.com/problems/merge-intervals/submissions/1289826836/

  /**
   * @param {Number[][]} intervals
   * @returns {Boolean}
   */
  const isMeetingsNotOverlap = (intervals) => {
    for (let i = 0; i < intervals.length; i++) {
      const [x1, x2] = intervals[i];

      for (let j = i + 1; j < intervals.length; j++) {
        const [y1, y2] = intervals[j];

        if (x2 >= y1 && x1 <= y2) {
          return false;
        }
      }
    }

    return true;
  };

  console.log(
    "isMeetingsNotOverlap",
    isMeetingsNotOverlap([
      [5, 10],
      [0, 30],
      [15, 20],
    ])
  ); // false
  console.log(
    "isMeetingsNotOverlap",
    isMeetingsNotOverlap([
      [5, 8],
      [9, 15],
      [16, 23],
      [234, 344],
    ])
  ); // true
}

{
  /**
   * @param {string[]} event1
   * @param {string[]} event2
   * @return {boolean}
   */
  var haveConflict = function (event1, event2) {
    const toDecimal = (hhmm) => {
      const [h, m] = hhmm.split(":");
      return parseInt(h) + parseFloat(parseInt(m) / 60);
    };

    const [x1, x2] = [toDecimal(event1[0]), toDecimal(event1[1])];
    const [y1, y2] = [toDecimal(event2[0]), toDecimal(event2[1])];

    if (x2 >= y1 && x1 <= y2) {
      return true;
    }

    return false;
  };

  // event1 = ["01:15","02:00"]
  // event2 = ["02:00","03:00"]
}

{
  function normalizePath(inputPath) {
    let res = [];

    inputPath.split("/").forEach((path) => {
      if (path === "..") {
        res.pop();
      } else if (path !== ".") {
        res.push(path);
      }
    });

    return res.join("/");
  }

  // Дан относительный путь:
  // "./components/../__tests__/../__tests__/../components/Navbar/./Link"

  // Нужно сделать из него абсолютный:
  // "components/Navbar/Link"

  console.log(
    "normalizePath",
    normalizePath(
      "./components/../__tests__/../__tests__/../components/Navbar/./Link"
    )
  );
}

{
  const findOdd = (nums) => nums.findIndex((num) => num % 2 !== 0);

  console.log("findOdd", findOdd([2, 4, 6, 8, 10, 3]));
}

{
  const deepCopy = (obj) => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    } else if (Array.isArray(obj)) {
      return obj.map((item) => deepCopy(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = deepCopy(obj[key]);
      return acc;
    }, {});
  };

  const obj = {a: {b: {c: [1]}}, d: 2};
  console.log("deepCopy", deepCopy(obj));
}

{
  //   Дана строка:
  // "abcdabcde"
  // Нужно найти в ней самую длинную последовательнось уникальных символов и вывести результат:
  // 5
  const maxUniqSequence = (str) => {
    let start = 0;
    let max = 0;
    const set = new Set();

    for (let end = 0; end < str.length; end++) {
      // убираем все символы до дублирующегося включительно
      while (set.has(str[end])) {
        set.delete(str[start]);
        start++;
      }

      set.add(str[end]);
      max = Math.max(max, end - start + 1);
    }

    return max;
  };

  console.log("maxUniqSequence", maxUniqSequence("abcdebcde"));
}

{
  //  Дан массив:
  // [2, 3, 1, 2, 3, 5]
  // Нужно найти самую длинную последовательность чисел, которые увеличиваются на плюс один и вывести ее длину:
  // 3
  const findLongestSiquence = () => {};

  console.log("findLongestSiquence", findLongestSiquence([2, 3, 1, 2, 3, 5]));
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const numsMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (numsMap.has(target - nums[i])) {
            return [numsMap.get(target - nums[i]), i]
        }
        
        numsMap.set(target - nums[i], i);
    }
};

function fuzzysearch(needle, stack) {
  // Инициализируем индекс для отслеживания позиции в строке needle
  let needleIndex = 0;
  // Получаем длину строки needle для последующей проверки
  let needleLength = needle.length;
  
  // Проходим по каждому символу в строке stack
  for (let i = 0; i < stack.length; i++) {
    // Проверяем, совпадает ли текущий символ stack с текущим символом needle
    if (stack[i] === needle[needleIndex]) {
      // Если совпадает, увеличиваем needleIndex для проверки следующего символа needle
      needleIndex++;
      // Если достигли конца строки needle, значит нашли все символы в нужном порядке
      if (needleIndex === needleLength) {
        return true; // Возвращаем true, так как needle является подпоследовательностью stack
      }
    }
  }
  
  // Если цикл завершился и мы не нашли все символы needle, возвращаем false
  return false;
}

// fuzzysearch('car', 'cartwheel')      // true
// fuzzysearch('cwhl', 'cartwheel')     // true
// fuzzysearch('we', 'cartwheel')       // true
// fuzzysearch('cartwheel', 'cartwheel') // true
// fuzzysearch('cwheeel', 'cartwheel')  // false
// fuzzysearch('lw', 'cartwheel')       // false

