const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined with this interface
 * function ListNode(x) {
 *   this.value = x;
 *   this.next = null;
 * }
 */

// См. теорию в st-queue

module.exports = function removeKFromList(l, k) {
  // throw new NotImplementedError('Not implemented');

  // надо пройти по всему связанному списку и сравнить value текущего элемента с k - если совпали => удалить этот элемент из связанного списка
  // если с k совпал с первым элементом списка, то надо удалить этот элемент и head теперь должен указывать на новый первый элемент

  if (l.value === k) {
    l = l.next;
  }

  let currentElement = l;
  let nextElement = currentElement.next;

  while (nextElement) {
    if (nextElement.value === k) {
      currentElement.next = nextElement.next;
    }
    currentElement = currentElement.next;
    nextElement = currentElement.next;
  }

  return l;
};
