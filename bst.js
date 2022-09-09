class Node {
    /**
     * @param {number} value
     * @param {Node} left 
     * @param {Node} right 
     */
    constructor(value = null, left = null, right = null) {
        this.data = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
  /** @param {Array<number>} array */
  constructor(array) {
      array = array.sort((a, b) => a - b);
      array = array.filter((item, pos) => { return array.indexOf(item) == pos })
      this.root = this.buildTree(array);
    }

  /** @param {Array<number>} array */
  buildTree(array) {   

    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid + 1, array.length);

    if (array[mid] === undefined)
      return null;

    let node = new Node(array[mid], this.buildTree(left), this.buildTree(right))

    return node;
  }

  insert(value) {
    let node = new Node(value);
    let temp = this.root;
    let prev = this.root;

    if (this.root === null) {
      this.root = node;
      return;
    }

    while (temp) {
      if (value < temp.data) {
        prev = temp;
        temp = temp.left;
      } else {
        prev = temp;
        temp = temp.right;
      }
    }

    if (value < prev.data) {
      prev.left = node;
    } else {
      prev.right = node;
    }
  }

  min(root) {
    let node = root;
    let minv = node.data;
    while (node.left != null) {
      minv = node.left.data;
      node = node.left;
    }

    return minv;
  }

  deleteRecursive(root, value) {
    let node = root;

    if (node === null) {
      return node;
    }

    if (value < node.data)
      node.left = this.deleteRecursive(node.left, value);
    else if (value > node.data)
      node.right = this.deleteRecursive(node.right, value);
    else {
      if (node.left == null)
        return node.right;
      else if (node.right == null)
        return node.left;
      
      node.data = this.min(node.right); // inorder successor

      node.right = this.deleteRecursive(node.right, node.data);
    }

    return node;
  }

  delete(value) {
    this.root = this.deleteRecursive(this.root, value);
  }

  find(value, root = this.root) {
    let node = root;

    if (node == null)
      return node;

    if (value < node.data)
      node = this.find(value, node.left);
    else if (value > node.data)
      node = this.find(value, node.right);

    return node;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.delete(1);
prettyPrint(tree.root);
console.log(tree.find(4));