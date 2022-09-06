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
    constructor(array) {
        this.root = buildTree(array);
    }
}