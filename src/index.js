//import './style.css';

class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(array) {
		this.root = this.buildTree(array);
	}

	buildTree(array) {
		if (array.length === 0) return null;

		const uniqueArray = [...new Set(array)].sort((a, b) => {
			return a - b;
		});
		const middle = Math.floor(uniqueArray.length / 2);
		const root = new Node(uniqueArray[middle]);

		root.left = this.buildTree(uniqueArray.slice(0, middle));
		root.right = this.buildTree(uniqueArray.slice(middle + 1));

		return root;
	}
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

console.log(tree.root);
