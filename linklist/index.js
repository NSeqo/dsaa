/*

    链表结构，可以在物理存储单元上存储非连续，非顺序的数据结构，由一系列的节点组成，这些个节点包含数据域和指针域，指针域指向下一个节点的地址
    这样节点就串起来了

    
    概念：

    节点 - 链表上某一个存储单元，包含数据域和指针域，第一个节点是首节点，最后一个是尾节点




 */


//  链表的实现

function LinkList() {

    function Node(data) {
        this.data = data
        this.next = null
    }

    let length = 0
    let head = null // 头节点
    let tail = null // 尾节点


    // 添加一个节点,尾部添加了
    this.append = function (data) {
        let node = new Node(data)

        if (head == null) {
            head = node
            tail = node
        } else {
            tail.next = node
            tail = node
        }

        length++
        return true //表示添加成功了
    }


    // 打印链表print,主要涉及到链表中节点的遍历操作，

    this.print = function () {

        // 链表的遍历一般都是从head开始的

        let currentNode = head

        let str = ""

        while (currentNode) {
            str += currentNode.data.toString()
            currentNode = currentNode.next
        }

        console.log(str);

    }


    // insert方法，表示在链表中任意位置插入一个新的节点，这个方法和append不同的时，append方法是在末尾添加一个节点

    this.insert = function (data, index) {
        // 首先构造节点
        const node = new Node(data)

        // 找到index下标的位置的节点

        let targetNode = null

        if (index <= 0) {
            //直接在首部添加
            targetNode = head
            node.next = targetNode
            head = node
        } else if (index > length) {
            //相当于append
            this.append(data)
        } else {
            targetNode = head
            let targetPrevNode = targetNode
            // 在首尾节点之间插入
            while (index--) {
                targetPrevNode = targetNode
                targetNode = targetNode.next
            }

            //target前一个节点是targetPrevNode
            node.next = targetNode
            targetPrevNode.next = node
        }


    }

}