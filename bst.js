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
    if (root === null) {
      return root;
    }

    if (value < root.data)
      root.left = this.deleteRecursive(root.left, value);
    else if (value > root.data)
      root.right = this.deleteRecursive(root.right, value);
    else {
      if (root.left == null)
        return root.right;
      else if (root.right == null)
        return root.left;
      
      root.data = this.min(root.right); // inorder successor

      root.right = this.deleteRecursive(root.right, root.data);
    }

    return root;
  }

  delete(value) {
    this.root = this.deleteRecursive(this.root, value);
  }

  find(value, root = this.root) {
    if (root == null)
      return root;

    if (value < root.data)
      root = this.find(value, root.left);
    else if (value > root.data)
      root = this.find(value, root.right);

    return root;
  }

  levelOrder(callback, root = this.root) {
    let queue = []
    let values = []
    queue.unshift(root);

    while (queue.length > 0) {
      let node = queue[queue.length - 1];
      if (node.left)
        queue.unshift(node.left);
      if (node.right)
        queue.unshift(node.right);
      
      if (!callback)
        values.push(node.data);
      else 
        callback(node);
      
      queue.pop();
    }

    if (!callback)
      return values;
  }

  inorder(callback, root = this.root) {
    if (root === null)
      return root;

    if (root.left)
      this.inorder(callback, root.left);
    callback(root);
    if (root.right)
      this.inorder(callback, root.right);
  }

  preorder(callback, root = this.root) {
    if (root === null)
      return root;

    callback(root);
    if (root.left)
      this.preorder(callback, root.left);
    if (root.right)
      this.preorder(callback, root.right);
  }

  postorder(callback, root = this.root) {
    if (root === null)
      return root;

    if (root.left)
      this.postorder(callback, root.left);
    if (root.right)
      this.postorder(callback, root.right);
      callback(root);
  }
  
  height(root = this.root) {
    let height = 0;
    let queue = [root];

    while (queue.length > 0) {

      let size = queue.length;

      while (size--) {
        let node = queue[queue.length - 1];
        queue.pop();
        if (node.left)
          queue.unshift(node.left);
        if (node.right)
          queue.unshift(node.right);      
      }
      height++;
    }

    return height;
  }

  depth(value, root = this.root) {
    let depth = 0;

    if (root == null)
      return 0;

    if (value < root.data) {
      depth = this.depth(value, root.left);
      depth++;
    }
      
    else if (value > root.data) {
      depth = this.depth(value, root.right);
      depth++;
    }

    return depth;   
  }

  isBalanced(root = this.root) {
    return Math.abs(this.height(root.left) - this.height(root.right)) <= 1
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
tree.insert(2);
tree.insert(123);
prettyPrint(tree.root);