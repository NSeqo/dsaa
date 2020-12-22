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


        length++

        return true


    }

    // 删除操作，删除指定位置的节点
    this.remove = function (index) {

        if (index < 0 || index >= length) {
            //index越界
            return null
        } else {

            let targetNode = null  // 待删除的节点
            let targetPrevNode = null

            if (index === 0) {
                //删除的是首节点
                targetNode = head
                head = head.next
                length--

                if (length === 0) {
                    // 说明链表中已经没有节点了
                    tail = null
                }
            } else {
                //找到目标节点
                targetNode = head

                while (index--) {
                    targetPrevNode = targetNode
                    targetNode = targetNode.next
                }
                // targetNode被删除，它前一个节点的指向直接改为为targetNode.next
                targetPrevNode.next = targetNode.next
                targetNode.next = null

                if (targetNode === tail) {
                    //删除的时尾节点，尾节点的指向要改变一下
                    tail = targetPrevNode
                }
                length--
            }

            return targetNode.data
        }

    }



    // get方法，获取指定索引位置的节点数据

    this.get = function (index) {
        let target = head
        while (index-- > 0) {
            target = target.next
        }

        if (target) {
            return target.data
        }

        return null
    }


    // indexOf方法，返回指定元素所在的位置，如果链表中没有这个元素，返回-1，如果有多个，则返回第一个，需要传入参数data

    this.indexOf = function (data) {
        let idx = -1

        let nextNode = head
        while (nextNode) {
            if (nextNode.data === data) {
                return ++idx
            }
            nextNode = nextNode.next
        }
        return idx
    }




}



/**
 *  基于链表实现的Stack 和 Queue, 这种就是要了解栈和队列两种数据结构的特点了
 * 
 */




/**
 *  翻转链表
 *  使用递归 和 迭代两种方式来实现
 *  
 *  翻转链表就是指向全部转变，头结点变成尾节点
 *  
 *  使用迭代的方式就是从头节点开始遍历，需要三个指针变量 prev, curr (表示前一个节点，当前节点，下一个节点)
 *  
 *  每次迭代的时候就是操作
 *   
 *  next = curr.next // 下一个节点
 *  // 翻转链表节点的指向
 *  curr.next = prev
 *  
 *  指针变量移动
 *  prev = curr
 *  curr = next
 *   
 *  
 */

exports.reverse = function (head) {

    if (!head) {
        return null
    }

    let prev = null
    let curr = head
    while (curr) {

        let next = curr.next
        curr.next = prev

        prev = curr
        curr = next

    }
    return prev //返回最后有一个节点

}