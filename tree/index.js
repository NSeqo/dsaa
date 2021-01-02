/*
 
    tree 数据结构  树
    
    这种结果在前端是非常常用的一种数据结构，比如说浏览器的dom就是组成了一个dom树，
    vue.js, react.js 中核心的虚拟dom也是一种树的结构

    所以说这种结构对于前端来说是必须要特别熟悉掌握的
x
    特殊的树 - 二叉树


    // 二叉树的广义表达式
    A(B(D,E(G,)),C(,F))#

    A表示根节点，括号内是它的左右子树用逗号隔开，没有左子树逗号不能省略，#表示结束


 */

const { Stack } = require('../stack')

//  二叉树的节点


let BinTreeNode = function (data) {

    this.data = data; // 数据

    this.leftChild = null; //左子树
    this.rightChild = null; //右子树
    this.parentNode = null;  // 父节点

}


//定义二叉树类
function BinaryTree() {

    let root = null; // 根节点

    // 初始化二叉树,参数就是广义的表达式字符串
    /*
        遍历的思路：
        1. 遇到左括号，说明前一个是父节点，括号可能还有嵌套的括号，那么就是需要一个先进后出的结构来存储节点，这个地方有地类似之前处理 括号嵌套校验是否合法的做法
           左括号入栈，遇到右括号与之匹配的左括号弹出栈，最后栈内就是空的说明是合法的，这样左右括号都是成对的出现的，而且嵌套的规则也是对的。

        2. 这里模仿这个思路，括号前面的是父节点，括号内是左右子节点，遇到右侧括号说明当前子树处理完了，弹出栈顶的父节点

        3. 需要一个 标记量来表示当前处理的是左子树还是右子树， 这个要用一个flag
     */
    this.init = function (string) {

        let stack = new Stack()

        let flag = 0

        let newNode = null // 存父节点


        for (let i = 0; i < string.length; i++) {
            const item = string[i];

            if (item === '(') {

                // 遇到左侧括号，那么就是直接将父节点添加进去
                stack.push(newNode)

                flag = 1; //表示接下里要处理的是左子树


            } else if (item === ')') {
                //遇到的是右侧的括号,说明的当前这个子树已经处理完毕，可以弹出父节点

                stack.pop()

            } else if (item === ',') {
                // 表示接下里要处理的是右子树
                flag = 2
            } else {

                // 这里既是各个节点

                newNode = new BinTreeNode(item)


                if (root === null) {

                    root = newNode

                } else if (k === 1) {

                    //左子树
                    let parent = stack.top()

                    parent.leftChild = newNode

                    newNode.parentNode = parent;

                } else {
                    //右子树

                    let parent = stack.top()

                    parent.rightChild = newNode

                    newNode.parentNode = parent

                }

            }

        }


    }


    // 前序遍历

    this.preOrder = function (node) {
        if (node == null) {
            return

        }

        console.log(node.data);

        this.preOrder(node.leftChild)
        this.preOrder(node.rightChild)
    }

    // 中序遍历
    this.inOrder = function (node) {

        if (node == null) return

        this.inOrder(node.leftChild)

        console.log(node.data);

        this.inOrder(node.rightChild)

    }

    // 后续遍历
    this.postOrder = function (node) {
        if (node == null) return

        this.postOrder(node.leftChild)
        this.postOrder(node.rightChild)

        console.log(node.data);
    }


    // 返回节点的数量，也是用递归的思路，每一层往下叠加
    this.size = function () {

        // 计算从某个节点开始往下的所有的子节点的数量
        let treeNodeCount = function (node) {
            if (node == null) {
                return 0
            }

            let leftChildCount = treeNodeCount(node.leftChild)
            left rightChildCount = treeNodeCount(node.rightChild)

            // 总和
            return leftChildCount + rightChildCount + 1
        }

        return treeNodeCount(root)
    }


    // 树的高度计算，也是递归的思路，叶子节点高度为0，依次向上层加1
    this.height = function () {

        let treeHeight = function (node) {
            if (node == null) return 0

            let leftChildHeight = treeHeight(node.leftChild)
            let rightChildHeight = treeHeight(node.rightChild)

            return leftChildHeight + rightChildHeight + 1
        }

        return treeHeight(root)

    }

    // 查看某个节点，查找的过程就是涉及到整棵树的遍历，就涉及到遍历的方式，前中后

    this.find = function (data) {

        let findNode = function (node, data) {
            if (node == null) return null

            // 这里就是中序遍历了
            if (node.data == data) {
                return node
            }
            return findNode(node.leftChild, data) || findNode(node.rightChild, data)
        }

        return findNode(root, data)
    }



    // 对一颗树进行镜像翻转，就是说把这棵树的节点的左右子树交换位置
    // 这里也是采用递归的方式来实现，同时也是涉及到树的节点的遍历方式，前中后

    this.mirrorByPost = function () {

        // 采用后序遍历
        let mirror = function (node) {

            //先左子树，右子树，节点
            if (node == null) return

            let left = mirror(node.leftChild)
            let right = mirror(node.rightChild)

            node.leftChild = right
            node.rightChild = left

            return node

        }

        mirror(root)

    }


    this.mirrorByPrev = function () {
        let mirror = function (node) {

            // 前序的遍历方式
            if (node == null) return

            let temp = node.leftChild

            node.leftChild = node.rightChild

            node.rightChild = temp

            mirror(node.leftChild)
            mirror(node.rightChild)
        }

        mirror(root)
    }


    // 不适用递归的方式来实现前序的遍历，这里就要使用while循环，需要处理的就是右子树的访问，左子树可以通过node.leftChild,
    // 逐层向下访问的时候，上一层的右子树是要访问的话需要使用一个容器先存起来，先进后出的方式这里使用栈

    this.preOrder2 = function () {

        let stack = new Stack()

        let currentNode = root

        while (currentNode) {

            // 前序遍历访问
            console.log(currentNode.data)

            if (currentNode.rightChild) {
                stack.push(currentNode.rightChild)
            }

            // 之后就是左子树，最后是右子树
            if (currentNode.leftChild) {
                currentNode = currentNode.leftChild
            } else {
                currentNode = stack.pop()
            }
        }
    }


    // 非递归的方式来实现 中序遍历

    this.inOrder2 = function () {

        // 基本的思路和前序遍历是一样的，有所不同的是，前序遍历使用while循环可以从树的顶层一级一级往下
        // 使用中序遍历的话，因为是先左节点，然后是父节点，最后是右节点这个方式来遍历，当遍历左节点的时候，会一直往下层找
        // 一直找到最底层，因为当层的节点如果有左节点，就要先遍历它的左节点，这样会一直递归下去先找到最底层的左节点
        // 这样一层一层的左节点就要是使用一个栈来存储下来

        let stack = new Stack()

        let currentNode = root

        while (true) {

            // 遇到左子树就存入栈内
            while (currentNode) {
                stack.push(currentNode)
                currentNode = currentNode.leftChild

            }

            // 弹出栈顶，左子树, 下次循环的时候弹出的父节点
            let pop = stack.pop()

            console.log(pop.data);

            // 找到 右子树
            currentNode = top.rightChild

            // 如果右子树为null,下次循环，就会跳过while(currentNode) 这个循环

            if (!currentNode && stack.isEmpty()) {
                break;
            }


        }

    }


}




// 一棵树的遍历方法分为 前，中，后序遍历，本质都是通过递归的方式来实现的，因为你根本不清楚到底有多少层，所以需要是用递归
// 递归的终止条件就是当前节点没有子节点

// 中序遍历的顺序就是先   左子树--当前节点--右子树
// 前序遍历 顺序就是     当前节点 -- 左子树 -- 右子树
// 后续遍历             左子树 -- 右子树 -- 当前节点

