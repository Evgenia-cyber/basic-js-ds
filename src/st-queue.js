const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js'); // каждый узел имеет значение и указатель на следующий узел.

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */

// Связанный список LinkedList похож на массив. Но связанный список не имеет конкретное местоположение памяти / индекса, и его структура представляет собой цепочку узлов. Каждый узел содержит два элемента: значение и указатель на следующий узел цепочки.
// "+" Операции вставки и удаления в связанном списке имеют временную сложность O(1) быстрее, чем массив. В отличие от массива, узлы также легко удалить и добавить в связанный список без реорганизации всей структуры данных.
// "-" Операция поиска выполняется медленнее, чем в массиве, поскольку узлам требуется доступ, начиная с первого узла, и проходить через каждый узел за раз, чтобы найти элемент.
// "-" Использует больше памяти для хранения дополнительных указателей для связанных списков, чем в массивах.

// Есть три типа связанных списков:
// 1. Односвязные списки (Singly Linked Lists) : каждый узел содержит только один указатель на следующий узел.
// пример односвязанного списка
// const list = {head: { value: 6, next: { value: 10, next: { value: 3, next: null } } } }
// 2. Двусвязные списки (Doubly Linked Lists) : каждый узел содержит два указателя, указатель на следующий узел и указатель на предыдущий узел.
// 3. Циклические связанные списки (Circular Linked Lists) : Циклические связанные списки представляют собой разновидность связанного списка, в котором последний узел указывает на первый узел или любой другой узел перед ним, тем самым образуя цикл.

// Т.к. очередь должна быть на основе linked list(связанного списка), то вид очереди:

//    head
//     |
// { value: 1, next: <obj_2> } -> { value: 7, next: <obj_3> } -> { value: 2, next: null }

//            или как-то так

//    head
//     |
// { value: 1, next: { value: 7, next: { value: 2, next: null } } }

module.exports = class Queue {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  enqueue(value) {
    // throw new NotImplementedError('Not implemented');

    // добавить элемент в конец очереди
    const newElement = new ListNode(value);
    if (this.size === 0) {
      // если очереди(здесь - связанного списка) не было элементов => новый элемент будет первым элементом очереди(здесь - связанного списка) и на него должен указывать head
      this.head = newElement;
    } else {
      // надо пройти по всей очереди(здесь - связанному списку) и найти последний элемент - его ссылкой next станет новый элемент
      let currentElement = this.head;
      while (currentElement.next) {
        currentElement = currentElement.next;
      }
      currentElement.next = newElement;
    }

    // увеличить размер очереди на 1 элемент
    this.size++;
  }

  dequeue() {
    // throw new NotImplementedError('Not implemented');

    // удалить элемент из начала очереди(здесь - связанного списка) и вернуть его value, перевести указатель head на новый первый элемент
    const deletedElement = this.head;
    if (this.size > 0) {
      const newFirstElement = deletedElement.next;
      this.head = newFirstElement;
    }
    // уменьшить размер очереди на 1 элемент
    this.size--;
    return deletedElement.value;
  }

  getUnderlyingList() {
    // throw new NotImplementedError('Not implemented');

    // вернуть весь список
    return this.head;
  }
};
