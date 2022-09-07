class Node {
    /**
     * @param {number} data
     * @param {Node} left 
     * @param {Node} right 
     */
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    /** @param {Array<number>} array */
    constructor(array) {
        this.root = this.buildTree(array);
    }

    /** @param {Array<number>} array */
    buildTree(array) {
        
        if (array.length <= 1) return new Node(array[0]);

        let mid = Math.floor(array.length / 2);
        let left = array.slice(0, mid);
        let right = array.slice(mid + 1, array.length);

        let node = new Node(array[mid], this.buildTree(left), this.buildTree(right))

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

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

prettyPrint(tree.root)