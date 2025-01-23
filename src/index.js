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

	insert(value) {
		let parent;
		let current = this.root;

		while (current) {
			parent = current;

			if (current.value > value) {
				current = current.left;
			} else if (current.value < value) {
				current = current.right;
			}
		}

		if (parent.value === value) return;

		const node = new Node(value);

		if (parent.value > value) {
			parent.left = node;
		} else {
			parent.right = node;
		}

		return this.root;
	}
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

console.log(tree.root);

tree.insert(10);
tree.insert(12);
tree.insert(11);

console.log(tree.root);
