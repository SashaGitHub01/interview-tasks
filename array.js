const arr = [1, 2, 3, 4, 5];

Array.prototype.myForEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb?.(this[i], i, this);
  }
};

// arr.myForEach((item, i, arr) => console.log({item}));

Array.prototype.myMap = function (cb) {
  const res = [];

  for (let i = 0; i < this.length; i++) {
    const newItem = cb?.(this[i], i, this);
    res.push(newItem);
  }

  return res;
};

const mapped = arr.myMap((item) => ({[item]: item}));
// console.log(mapped);

Array.prototype.myFilter = function (cb) {
  const res = [];

  for (let i = 0; i < this.length; i++) {
    const isValid = cb?.(this[i], i, this);
    if (!!isValid) {
      res.push(this[i]);
    }
  }

  return res;
};

const filtred = arr.myFilter((item) => item > 2);
// console.log(filtred);

Array.prototype.myFind = function (cb) {
  for (let i = 0; i < this.length; i++) {
    const isValid = cb?.(this[i], i, this);
    if (!!isValid) {
      return this[i];
    }
  }
};

const found = arr.myFind((item) => item === 55);
// console.log(found);

Array.prototype.myReduce = function (cb, initValue) {
  let acc = initValue;

  for (let i = 0; i < this.length; i++) {
    acc = cb(acc, this[i], i, this);
  }

  return acc;
};

const reduced = arr.myReduce((acc, item) => acc + item, 0);
// console.log(reduced);
