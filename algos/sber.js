//_______Задача_1_______
// Напишите функцию, которая принимает две строки и возвращает n,
// где n равно количеству символов,
// на которые нужно сдвинуть первую строку вперед,
// чтобы она совпала со второй.

function shiftedDiff(first, second) {
  let shifted = first;

  if (first === second) return 0;

  for (let i = 0; i < first.length; i++) {
    const last = first.length - 1;
    shifted = shifted[last] + shifted.slice(0, -1);

    if (shifted === second) {
      return i + 1;
    } else if (i === last) {
      return -1;
    }
  }
}

// console.log(shiftedDiff("coffee", "eecoff")); // "coffee", "eecoff" => 2
// console.log(shiftedDiff("eecoff", "coffee")); // "eecoff", "coffee" => 4
// console.log(shiftedDiff("isn't", "'tisn")); // "isn't", "'tisn" => 2
// console.log(shiftedDiff("Esham", "Esham")); // "Esham", "Esham" => 0
// console.log(shiftedDiff("moose", "Moose")); // "moose", "Moose" => -1
// console.log(shiftedDiff("dog", "god")); // "dog", "god" => -1 gdo - ogd - dog

//_______Задача_3_______

function partReverse(array, length) {
  if (length === 0) return array;

  const newArr = [];

  for (let i = 0; i < array.length; i += length) {
    const subArr = array.slice(i, i + length).reverse();
    newArr.push(subArr);
  }

  return newArr.flat(1);
}

// console.log(partReverse([2, 4, 6, 8, 10, 12, 14, 16], 3)); //[6,4,2,12,10,8,16,14]
// console.log(partReverse([1, 2, 3, 4, 5, 6], 2)); //[2,1,4,3,6,5]
// console.log(partReverse([1, 2, 3, 4, 5, 6], 10)); //[1,2,3,4,5,6]
// console.log(partReverse([1, 2, 3, 4, 5, 6], 0)); //[1,2,3,4,5,6]
// console.log(partReverse([1, 2, 3, 4, 5, 6], 1)); //[6,5,4,3,2,1]

//_______Задача_4_______

//Исограмма (Isogram) - это слово или фраза,
//в которой каждая буква встречается только один раз,
//независимо от регистра.

//Напишите функцию, которая определяет является ли строка исограммой

const isIsogram = (str) => {
  return new Set(str.toLowerCase()).size === str.length;
};

// console.log(isIsogram("Dermatoglyphics")); //true
// console.log(isIsogram("isogram")); //true
// console.log(isIsogram("aba")); //false
// console.log(isIsogram("moOse")); //false
// console.log(isIsogram("isIsogram")); //false

//* Найти все группы в скобках
// (dolor sit amet)
// (labore)
// (non proident)
// */
const txt =
  "Lorem ipsum (dolor sit amet), consectetur adipiscing elit, sed do eiusmod tempor incididunt ut (labore) et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat (non proident), sunt in culpa qui officia deserunt mollit anim id est laborum.";

const extractBrackets = (text) => {
  const res = [];
  let open = false;
  let group = "";

  for (let i = 0; i < text.length; i++) {
    const symbol = text[i];

    if (open) {
      group += symbol;
    }

    if (symbol === "(") {
      open = true;
      group += symbol;
    } else if (symbol === ")") {
      open = false;
      res.push(group);
      group = "";
    }
  }

  return res;
};

// console.log(extractBrackets(txt));

//Перевернуть слова в предложении
const sentence = "Хочу найти работу мечты";

const reverseSentence = (sentence) => {
  return sentence
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
};

// console.log(reverseSentence(sentence));
//'учоХ итйан утобар ытчем'

// Дано два массива чисел, отличающихся одним элементом. Найдите его
const arr1 = [1, 3, 5, 7, 9, 8, 6, 4, 2, 10];
const arr2 = [9, 1, 8, 2, 7, 3, 10, 5];

const findMissing = (nums1, nums2) => {
  const commonArr = [...nums1, ...nums2];
  const map = {};

  commonArr.forEach((val, i, arr) => {
    if (val in map) {
      map[val] += 1;
    } else {
      map[val] = 1;
    }
  });

  return Object.keys(map).filter((key) => map[key] === 1);
};

// console.log(findMissing(arr1, arr2));

const dates = [
  {data: "1988-07-31", amount: 5000},
  {data: "2015-07-31", amount: 5000},
  {data: "2016-12-11", amount: 5020},
  {data: "2001-11-01", amount: 4023},
  {data: "2012-04-30", amount: 1923},
  {data: "2016-01-24", amount: 1283},
  {data: "2011-06-12", amount: 4218},
  {data: "2012-12-04", amount: 8412},
  {data: "2002-05-26", amount: 5832},
  {data: "2007-07-19", amount: 8123},
  {data: "2020-09-13", amount: 1238},
  {data: "2023-10-25", amount: 8142},
];

// Вывести объект с отсортированными ключами (по году) и значениям
// где значение это массив строк вида '${месяц-день}'

// {
//   "2001": [
//       "11-01"
//   ],
//   "2002": [
//       "05-26"
//   ],
//   "2007": [
//       "07-19"
//   ],
//   "2011": [
//       "06-12"
//   ],
//   "2012": [
//       "04-30",
//       "12-04"
//   ],
//   "2015": [
//       "07-31"
//   ],
//   "2016": [
//       "01-24",
//       "12-11"
//   ],
//   "2020": [
//       "09-13"
//   ],
//   "2023": [
//       "10-25"
//   ]
// }

const sortDates = (dates) => {
  return dates
    .sort((a, b) => Date.parse(a.data) - Date.parse(b.data))
    .reduce((acc, item) => {
      const dates = item.data.split("-");
      const year = dates[0];
      const monthAndDay = dates.slice(1).join("-");

      if (year in acc) {
        acc[year].push(monthAndDay);
      } else {
        acc[year] = [monthAndDay];
      }

      return acc;
    }, {});
};

// console.log(sortDates(dates));

// Есть дерево обьектов формата
// {
//    left: {},
//    right: {},
//    value: <number>
// }
// Поля left и right опционально содержат в себе обьект с такой же
// структурой. Value присутствует всегда.
//
// Необходимо посчитать сумму всех value.

const tree = {
  left: {
    left: {
      left: {
        right: {
          left: {
            value: 7,
          },
          right: {
            value: 14,
          },
          value: 66,
        },
        value: 23,
      },
      value: 90,
    },
    right: {
      value: 67,
    },
    value: 34,
  },
  right: {
    value: 11,
  },
  value: 16,
};

function treeValueSumm(value) {
  return Object.values(value).reduce((acc, node) => {
    if (typeof node === "number") {
      acc += node;
    } else {
      acc += treeValueSumm(node);
    }

    return acc;
  }, 0);
}

// console.log(treeValueSumm(tree));
// console.log(treeValueSumm(tree) === 328);

// Необходимо реализовать функцию,которая удалит в строке
// все повторяющиеся подряд символы таким образом, чтобы
// на выходе получилось:
// "Кот Барсик запрыгнул на забор"

{
  const sentence = "Кккоооот Бааарссиккк зззапрыыгнннул наааа   зааабоооррррр";

  function removeRepeats(value) {
    let res = "";
    const symbolsArr = value.split("");
    let prevSymbol;

    symbolsArr.forEach((sym) => {
      if (sym.toLowerCase() !== prevSymbol) {
        res += sym;
      }

      prevSymbol = sym.toLowerCase();
    });

    return res;
  }

  // console.log(removeRepeats(sentence));
  // console.log(removeRepeats(sentence) === "Кот Барсик запрыгнул на забор");
}

{
  //init code
  const el = document.createElement("div");
  const el2 = document.createElement("div");

  el.className = "js-node";
  el2.className = "js-node";

  document.body.append(el, el2);

  //Реализовать функцию $, которая позволит последовательно вызывать
  // 1. функции addClass для добавления класса,
  // 2. html для вставки html внутрь выбранного элемента
  // 3. toggleClass для переключения класса
  // 4. css для добавления css свойств

  class Jquery {
    constructor(elements) {
      this.elements = elements;
    }

    html(content) {
      this.elements.forEach((el) => {
        el.innerHTML = content;
      });

      return this;
    }

    css(stylesObj) {
      this.elements.forEach((el) => {
        Object.assign(el.style, stylesObj);
      });

      return this;
    }

    addClass(className) {
      this.elements.forEach((el) => {
        el.classList.add(className);
      });

      return this;
    }

    toggleClass(className) {
      this.elements.forEach((el) => {
        el.classList.toggle(className);
      });

      return this;
    }
  }

  function $(selector) {
    const elements = document.querySelectorAll(selector);
    return new Jquery(elements);
  }

  // пример использования
  const $node = $(".js-node");
  $node
    .html("<li>hello</li>")
    .addClass("testik")
    .addClass("class")
    .toggleClass("disabled")
    .toggleClass("disabled")
    .css({color: "red"});

  // $node.addClass("bordered").html("<li>hello</li>").toggleClass("disabled").css({
  //   color: "green",
  //   padding: "10px"
  // });
}

/*
  У нас есть набор билетов вида:
  const tickets = [
    {from: 'London',to: 'Moscow'},
    {from: 'NY',to: 'London'},
    {from: 'Portugal',to: 'NY'},
    {from: 'Moscow',to: 'SPb'},
    {from: 'SPb',to: 'Kairo'}
  ];

  [
    {
        "from": "Portugal",
        "to": "NY"
    },
    {
        "from": "NY",
        "to": "London"
    },
    {
        "from": "London",
        "to": "Moscow"
    },
    {
        "from": "Moscow",
        "to": "SPb"
    },
    {
        "from": "SPb",
        "to": "Kairo"
    }
]

  Из этих билетов можно построить единственный, неразрывный маршрут.
  Петель и повторов в маршруте нет.

  Нужно написать программу, которая возвращает билеты 
  в порядке следования по маршруту.
*/

const getRoute = (tickets) => {
  const mapFromTo = new Map();
  const set = new Set();

  tickets.forEach(({from, to}) => {
    if (set.has(from)) {
      set.delete(from);
    } else {
      set.add(from);
    }

    if (set.has(to)) {
      set.delete(to);
    } else {
      set.add(to);
    }

    mapFromTo.set(from, to);
  });

  const arr = [...set];

  const start = mapFromTo.has(arr[0]) ? arr[0] : arr[1];

  const path = [];

  path.push({from: start, to: mapFromTo.get(start)});

  while (path.length < tickets.length) {
    const current = path[path.length - 1].to;
    path.push({from: current, to: mapFromTo.get(current)});
  }

  return path;
};

// console.log(
//   getRoute([
//     {from: "NY", to: "London"},
//     {from: "Portugal", to: "NY"},
//   ])
// );

// [
//   {
//       "from": "Portugal",
//       "to": "NY"
//   },
//   {
//       "from": "NY",
//       "to": "London"
//   }
// ]

// console.log(
//   getRoute([
//     {from: "London", to: "Moscow"},
//     {from: "NY", to: "London"},
//     {from: "Portugal", to: "NY"},
//     {from: "Moscow", to: "SPb"},
//     {from: "SPb", to: "Kairo"},
//   ])
// );
