class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor(head) {
        this.HEAD = head;
        this.HEAD.nextNode = null; // to prevent some unexpected bugs.
    }

    get head() {
        return this.HEAD;
    }

    get tail() {
        let i = this.HEAD;
        while (i.nextNode !== null) {
            i = i.nextNode; 
        }

        return i;
    }

    get size() {
        let i = 1;
        let node = this.HEAD;

        while (node.nextNode !== null) {
            i += 1;
            node = node.nextNode; 
        }

        return i
    }

    append(value) {
        let newNode = new Node(value);
        this.tail.nextNode = newNode;
    }

    prepend(value) {
        let newNode = new Node(value, this.HEAD);
        this.HEAD = newNode;
    }

    /** Counting starts at 0 like in a default array. */
    at(index) {
        let node = this.HEAD;

        for (let i = 0; i < index; i++) {
            if (node.nextNode === null) {
                return null;
            }   
            node = node.nextNode;
        }
        return node;
    }

    pop() {
        let preTailNode = this.at(this.size - 2);
        preTailNode.nextNode = null;
    }

    contains(value) {
        let node = this.head;
        while (node !== null) {
            if (node.value === value) return true;
            node = node.nextNode; 
        }
        return false;
    }

    find(value) {
        let node = this.head;
        let i = 0;
        while (node !== null) {
            if (node.value === value) return i;
            node = node.nextNode; 
            i += 1;
        }
        return null;  
    }

    toString() {
        let s = ''
        let node = this.HEAD;
        while (node !== null) {
            s += `( ${node.value} ) -> `
            node = node.nextNode; 
        }
        s += 'null'
        return s
    }
}

const list = new LinkedList(new Node(1));
list.prepend(3);
list.append(15);
list.append(6);
list.pop();
console.log(list.toString());