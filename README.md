# binary-search-trees

This is an exercise where I created a Tree class that contains, but not limited to, an algorithm to create a
balanced binary search tree and tree traversal algorithms such as breadth-first and depth-first search.

Live Demo: https://worriorbeast.github.io/binary-search-trees/

Objective:

1. Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right
   children
2. Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute,
   which uses the return value of buildTree which you will write next
3. Write a buildTree(array) function that takes an array of data
   (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node
   objects appropriately placed (do not forget to sort and remove duplicates!). The buildTree function should
   return the level-0 root node
4. Write insert(value) and deleteItem(value) functions that insert/delete the given value
5. Write a find(value) function that returns the node with the given value
6. Write a levelOrder(callback) function that accepts a callback function as its parameter
7. Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a
   parameter
8. Write a height(node) function that returns the given node’s height
9. Write a depth(node) function that returns the given node’s depth
10.   Write an isBalanced function that checks if the tree is balanced
11.   Write a rebalance function that rebalances an unbalanced tree

What I learned:

After having completed the binary search tree practice, I now understand why understanding recursions is important.
Recursion can allow much more readable and easier to understand code. This especially noticeable with the buildTree
function. In the function we can observe a handful of lines which make it clear every time the function is called,
a new node is being created and added into the tree. On the contrary, recursion may not be the best technique to
use, instead a loop would be better suited for the problem. When you look at both the recursive and iterative level
order functions, you will notice you will spend less time reading and understanding the iterative approach. That
being said, both have their appropriate use cases. It comes down to knowing when to use which approach and weighing
their pros and cons.

Building a tree recursively is fairly simple. Before building the array must be sorted. This is because the value of
the middle of the array element is used to create a new node. The left and right branches of the newly created node
are then assigned the return value of the recursive function with the respective left or right array as the argument.

For inserting a node, it is relatively simple. The algorithm traverses through the tree by checking whether the
current node value is greater than or less than to decide which branch is needed to be traversed through next until
reaching a leaf node which, will become the parent node of the newly inserted leaf node. Before inserting the value
of the leaf node and value to be inserted is compared to decide which branch the new node will be inserted.

Deleting a node is much more complex because there are various scenarios that have to be considered. The first being
where the node to be deleted is a leaf node. Second, the node contains one leaf node on either branch. Lastly, both
right and left branches are not null. In the first case, the leaf node is deleted without having to worry about other
nodes contained by the leaf node. In the second case, the child node is moved up to replace the deleted parent node.
The last case is trickier than the previous two because the deleted node has to be replaced by its successor. To
find the successor we have to traverse one branch to the right then continue traversing left until a leaf node is
reached. That leaf node is the successor of the deleted node. The reason this works is because by definition in a
balanced binary search tree, the right branch of the root node is always greater than the left branch. With this,
we always know the leaf node to the farthest left in the right branch has the closest value to the root node.

Writing the level order function iteratively was fairly simple by using a queue. A queue has to be used if the
approach is iterative because nodes do not have a reference to other nodes on the same depth. Only parent nodes
have a reference to nodes in the branches. The root node value is read then if branches exist are pushed into the
queue from left branch to right branch. This makes the level order function read the tree from top to bottom and
left to right. On the other hand, recursive level order was more complex. This approach entailed nesting a function
to be executed recursively in the parent function. The result would lead to multiple arrays in the array representing
each level of the tree. To use the callback on each node, I had to merge all arrays and iterate through the merged
array. Iterating through the array after iterating through the tree seems inefficient. At the moment I am unaware of
a more efficient approach.

Depth-first search algorithms is really simple. The order in which the recursive calls are made and root node is
read will determine the type of depth-first search. There are three depth-first search algorithms: pre-order,
in-order, post-order. The prefix indicates when the root node is read. For example, pre means before, so pre-order
reads the root node first then recursively calls the function for the left branch then right branch. To flatten a
binary search tree and rebalance the binary search tree, in-order is really useful because a sorted array is
returned. This is important because instead of getting all data from the binary search tree then sorting, in-order
sorts as it traverses the tree. This means in-order has a time complexity of O(n) instead of O(n + k), making
in-order more efficient.
