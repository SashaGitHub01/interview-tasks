{
  /**
   * Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
  /**
   * @param {ListNode} head
   * @return {ListNode}
   */
  var reverseList = function (head) {
    let current = head; // 1, 1-null, 2, 2-1-null, 3, 3-2-1-null, 4
    let next = null; // null, 2, 3, 4,
    let prev = null; // null, 1-null, 2-1-null, 3-2-1-null,

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    return prev;
  };
  // console.log(reverseList([1,2,3,4,5]));

  // [1,2,3,4,5]
  // [5,4,3,2,1]
}

{
  /**
   * Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
  /**
   * @param {y} list1
   * @param {ListNode} list2
   * @return {ListNode}
   */
  var mergeTwoLists = function (l1, l2) {
    let left = l1;
    let right = l2;
    const dummy = new ListNode();
    let tail = dummy;

    while (left && right) {
      if (left.val < right.val) {
        tail.next = left;
        left = left.next;
      } else {
        tail.next = right;
        right = right.next;
      }

      tail = tail.next;
    }

    if (right) {
      tail.next = right;
    } else if (left) {
      tail.next = left;
    }

    return dummy.next;
  };

  // console.log(mergeTwoLists([1,2,4], [1,3,4]));
}

{
  function middleNode(head) {
    let fast = head;
    let slow = head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }
}

{
  /**
   * Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val === undefined ? 0 : val)
   *     this.next = (next === undefined ? null : next)
   * }
   */
  /**
   * @param {ListNode} head
   * @return {void} Do not return anything, modify head in-place instead.
   */
  var reorderList = function (head) {
    if (!head || !head.next) return;

    // Find the middle of the linked list
    let slow = head;
    let fast = head;

    while (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    // Reverse the second half of the linked list
    let prev = null;
    let curr = slow.next;

    while (curr) {
      let nextNode = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nextNode;
    }
    slow.next = null;

    // Merge the two halves
    let p1 = head;
    let p2 = prev;

    while (p1 && p2) {
      let nextP1 = p1.next;
      let nextP2 = p2.next;

      p1.next = p2;
      p2.next = nextP1;

      p1 = nextP1;
      p2 = nextP2;
    }
  };

   // console.log(mergeTwoLists([1,2,3,4])) //[1,4,2,3];
}
