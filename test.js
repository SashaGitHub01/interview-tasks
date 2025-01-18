/*
  Дан список неотрицательных целых чисел, повторяющихся элементов в списке нет. 
  Нужно преобразовать его в строку, сворачивая соседние по числовому ряду числа в диапазоны.

Примеры:
  [1,4,5,2,3,9,8,11,0] => "0-5,8-9,11"
  [1,4,3,2] => "1-4" [1,2,3,4,6,8] => "1-4" let start = 0; let end = 3;
  [1,4] => "1,4"
  [1,2] => "1-2"
*/
{
  function compress(nums) {
    const list = [...nums].sort((a, b) => a - b);

    let result = [];
    let start = 0;
    let end = start + 1;

    while (end < list.length) {
      if (list[end] === list[end - 1] + 1) {
        end++;
      } else {
        if (end - start === 1) {
          result.push(list[start]);
        } else {
          result.push(`${list[start]}-${list[end - 1]}`);
        }

        start = end;
        end++;
      }
    }

    if (start === end - 1) {
      result.push(list[start]);
    } else {
      result.push(`${list[start]}-${list[end - 1]}`);
    }

    return result.join(",");
  }

  // console.log(compress([1, 4, 5, 2, 3, 9, 8, 11]), "res: 0-5,8-9,11");
  // console.log(compress([1, 4, 3, 2]), "res: 1-4");
  // console.log(compress([1, 4]), "res: 1,4");
  // console.log(compress([1, 2]), "res: 1-2");
}

{
  const getRanges = (list) => {
    const res = [];
    let start = list[0];
    let end = list[0];
    
    for (let i = 1; i < list.length; i++) {
      const current = list[i];
      
      if(current === end + 1) {
        end = list[i];
      } else {
        if (end - start >= 2) {
          res.push(`${start}-${end}`)
        } else {
          for (let j = start; j <= end; j++) {
            res.push(j)
          }
        }
        
        start = list[i]
        end = list[i]
      }
    }
    
    if (end - start >= 2) {
      res.push(`${start}-${end}`)
    } else {
      for (let j = start; j <= end; j++) {
            res.push(j)
      }
    }
    
    return res.join(',');
  }
  
  const range = [-10, -9, -8, -7, -3, -2, -1, 0, 1, 3, 4, 5, 14, 15, 17, 18, 19, 20, 566, 776];
  console.info(getRanges(range));
  console.info(getRanges(range) === "-10--7,-3-1,3-5,14,15,17-20,566,776");
}

{
  /*
   * Разработать функцию
   * На вход подаётся неупорядоченное множество целых чисел
   * Функция возвращает длину наибольшей последовательности
   */
  const input1 = [12, 13, 4, 5, 6, 7, 33, 42, 43]; // 4
  const input2 = [5, 6, 7]; // 3

  const getMaxSequenceLength = (nums) => {
    let maxLength = 0;
    let currentLength = 1;

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] === nums[i - 1] + 1) {
        currentLength++;
      } else {
        maxLength = Math.max(maxLength, currentLength);
        currentLength = 1;
      }
    }

    return Math.max(maxLength, currentLength);
  };

  console.log(getMaxSequenceLength(input1));
  console.log(getMaxSequenceLength(input2));
}

{
  const arr1 = [3, 5, 6, 10, 11, 20];
  const arr2 = [1, 2, 7, 8, 15, 19];

  // O(n) time & O(n) space
  function mergeTwo(arr1, arr2) {
    let merged = [];
    let index1 = 0;
    let index2 = 0;
    let current = 0;

    while (current < arr1.length + arr2.length) {
      let unmerged1 = arr1[index1];
      let unmerged2 = arr2[index2];

      // if next comes from arr1
      if (unmerged1 < unmerged2) {
        merged[current] = unmerged1;
        index1++;

        // if next comes from arr2
      } else {
        merged[current] = unmerged2;
        index2++;
      }

      current++;
    }

    return merged;
  }

  console.log(mergeTwo(arr1, arr2));
  // [1, 2, 3, 5, 6, 7, 8, 10, 11, 15, 19, undefined]
}
