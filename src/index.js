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

	deleteItem(value) {
		if (!this.root) return null;

		let previous = null;
		let current = this.root;

		while (current && current.value !== value) {
			previous = current;

			if (current.value > value) {
				current = current.left;
			} else if (current.value < value) {
				current = current.right;
			}
		}

		if (!current) return this.root;

		if (!current.left || !current.right) {
			let newCurrent = !current.left ? current.right : current.left;

			if (!previous) {
				this.root = newCurrent;
			} else if (previous.left === current) {
				previous.left = newCurrent;
			} else if (previous.right === current) {
				previous.right = newCurrent;
			}
		} else if (current.left && current.right) {
			let successor = current.right;
			let successorParent = null;

			while (successor.left) {
				successorParent = successor;
				successor = successor.left;
			}

			if (successorParent) {
				successorParent.left = successor.right;
			} else {
				current.right = successor.right;
			}

			current.value = successor.value;
		}

		return this.root;
	}

	find(value) {
		let current = this.root;

		while (current && current.value !== value) {
			if (current.value > value) {
				current = current.left;
			} else {
				current = current.right;
			}
		}

		if (!current) return null;

		return current;
	}

	levelOrderIterative(callback) {
		if (typeof callback !== 'function') {
			throw new TypeError(
				'A callback function must be passed into function',
			);
		}

		if (!this.root) return null;

		let queue = [this.root];

		while (queue.length) {
			const node = queue.shift();

			callback(node);

			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}
	}

	levelOrderRecursive(callback) {
		if (typeof callback !== 'function') {
			throw new TypeError(
				'A callback function must be passed into function',
			);
		}

		if (!this.root) return null;

		const CURRENTLEVEL = 0;
		let result = [];

		const traverse = (node, level) => {
			if (!node) return;

			if (!result[level]) result[level] = [];

			result[level].push(node);

			traverse(node.left, level + 1);
			traverse(node.right, level + 1);
		};

		traverse(this.root, CURRENTLEVEL);

		const mergedLevels = [].concat(...result);

		mergedLevels.forEach((node) => {
			callback(node);
		});
	}

	inOrder(callback) {
		if (typeof callback !== 'function') {
			throw new TypeError(
				'A callback function must be passed into function',
			);
		}

		const traverse = (node) => {
			if (!node) return;

			traverse(node.left);
			callback(node);
			traverse(node.right);
		};

		traverse(this.root);
	}

	preOrder(callback) {
		if (typeof callback !== 'function') {
			throw new TypeError(
				'A callback function must be passed into function',
			);
		}

		const traverse = (node) => {
			if (!node) return;

			callback(node);
			traverse(node.left);
			traverse(node.right);
		};

		traverse(this.root);
	}

	postOrder(callback) {
		if (typeof callback !== 'function') {
			throw new TypeError(
				'A callback function must be passed into function',
			);
		}

		const traverse = (node) => {
			if (!node) return;

			traverse(node.left);
			traverse(node.right);
			callback(node);
		};

		traverse(this.root);
	}

	height(node) {
		if (!node) {
			return -1;
		} else {
			const leftHeight = this.height(node.left);
			const rightHeight = this.height(node.right);

			return Math.max(leftHeight, rightHeight) + 1;
		}
	}

	depth(node) {
		if (!node) return -1;

		let current = this.root;
		let depth = 0;

		while (current && current !== node) {
			if (current.value > node.value) {
				current = current.left;
				depth++;
			} else {
				current = current.right;
				depth++;
			}
		}

		if (!current) return -1;

		return depth;
	}

	isBalanced() {
		if (!this.root) return false;

		const leftHeight = this.height(this.root.left);
		const rightHeight = this.height(this.root.right);

		const heightDifference =
			Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight);

		return heightDifference > 1 ? false : true;
	}

	rebalance() {
		const inOrderArray = [];

		this.inOrder((node) => inOrderArray.push(node.value));

		this.root = this.buildTree(inOrderArray);
	}
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

tree.insert(24);
tree.insert(25);
tree.insert(26);

console.log(tree.isBalanced()); // Expected output: false

tree.rebalance();

console.log(tree.isBalanced()); // Expected output: true
console.log(tree.root);
