const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

// Ребро - это связь между двумя узлами
// Граф состоит из узлов и ребер
// Дерево - граф, который не имеет циклов - т.е. двигаясь по ребрам графа нельзя прийти в одну и ту же точку через какое-то другое ребро. Дерево может иметь сколько угодно потомков
// Корень дерева - root - первый узел
// Лист - leaf - узел, у которого нет потомков
// Высота дерева - height - высота у корня равна нулю - считаются все остальные уровни
// Бинарное поисковое дерево - binary search tree
// Бинарное - это дерево, у каждого узла которого может быть не более двух потомков.
// Поисковое - значение узла слева меньше, чем значение узла-родителя; значение узла справа больше, чем значение узла-родителя. Т.е. все элементы слева меньше, чем текущая вершина, все элементы справа больше, чем текущая вершина. То есть данные в двоичном дереве поиска хранятся отсортированными. Каждый раз, когда вы добавляете новый или удаляете существующий узел, отсортированный порядок дерева сохраняется. При поиске элемента значение поиска сравнивается с корнем. Если желаемое больше корня, то поиск продолжается в правомпотомок корня, если меньше , то слева , если равно , то значение найдено и поиск прекращается.

module.exports = class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    // throw new NotImplementedError('Not implemented');

    // вернуть корневой узел дерева
    return this.rootNode;
  }

  add(data) {
    // throw new NotImplementedError('Not implemented');

    // добавить в дерево узел с data

    const addNodeToCorrectPosition = (node, data) => {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addNodeToCorrectPosition(node.left, data);
      } else {
        node.right = addNodeToCorrectPosition(node.right, data);
      }

      return node;
    };

    this.rootNode = addNodeToCorrectPosition(this.rootNode, data);
  }

  has(data) {
    // throw new NotImplementedError('Not implemented');

    // возвращает, true если узел с data существует в дереве, и в false противном случае

    const node = this.find(data);
    return Boolean(node);
  }

  find(data) {
    // throw new NotImplementedError('Not implemented');

    // возвращает узел с data если узел с data существует в дереве,иначе возвращает null

    const searchInTree = (node, data) => {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        return searchInTree(node.left, data);
      } else {
        return searchInTree(node.right, data);
      }
    };

    return searchInTree(this.rootNode, data);
  }

  remove(data) {
    // throw new NotImplementedError('Not implemented');

    // удаляет узел с data из дерева, если узел с data существует

    const removeCorrectlyNode = (node, data) => {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeCorrectlyNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeCorrectlyNode(node.right, data);
        return node;
      } else {
        // если data === node.data
        if (!node.left && !node.right) {
          // если узел - это лист, то удаляем его.
          return null;
        }

        if (!node.left) {
          // если есть один потомок - надо не только удалить узел, но и вместо удаленного узла поставить ребенка удаленного узла
          // если нет левого потомка
          node = node.right;
          return node;
        }

        if (!node.right) {
          // если есть один потомок - надо не только удалить узел, но и вместо удаленного узла поставить ребенка удаленного узла
          // если нет правого потомка
          node = node.left;
          return node;
        }

        // если есть два потомка - надо не только удалить узел, но и вместо удаленного узла поставить минимум из правого поддерева ИЛИ максимум из левого поддерева
        let minFromRightTree = node.right;
        while (minFromRightTree.left) {
          minFromRightTree = minFromRightTree.left;
        }
        node.data = minFromRightTree.data;

        // из правого узла удаляем найденный минимум
        node.right = removeCorrectlyNode(node.right, minFromRightTree.data);

        return node;
      }
    };

    this.rootNode = removeCorrectlyNode(this.rootNode, data);
  }

  min() {
    // throw new NotImplementedError('Not implemented');

    // возвращает минимальное значение, хранящееся в дереве (или null если дерево не имеет узлов )

    if (!this.rootNode) {
      return null;
    }

    let node = this.rootNode;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    // throw new NotImplementedError('Not implemented');

    // возвращает максимальное значение, хранящееся в дереве (или null если дерево не имеет узлов )

    if (!this.rootNode) {
      return null;
    }

    let node = this.rootNode;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
};
