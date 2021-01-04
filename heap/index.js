
/*

    数据结构 - 堆 heap

    经常能看到一些技术文章中写 堆内存，栈内存，比如引用类型的的变量存在堆内存中，那么堆到底是什么？



    概念：
    
    关键码 一个能够标识数据记录的数据项，并可以依据它对数据进行组织，称之为关键码 key, 例如数字中的下表索引

    如果有一个关键码集合K = {k0 , k1 , k2 , k3 , ... kn-1 } ，把它的所有元素按照完全二叉树的顺序存储方式存放在一个一维数组中，
    并且满足ki ≤ k2i+1 且 ki ≤ k2i+2 （或者 ki ≥ k2i+1 且 ki ≥ k2i+2） ,i = 0, 1,2, ... (n-2)/2,则称这个集合为最小堆(最大堆)

    最小堆：直观上看就是父节点小于它的左右子节点，从上到下都是这个规律

    最大堆：与最小堆刚好相反，父节点大于它的左右子节点

    一维的数组中数字映射到完全二叉树的时候，从根节点，一层一层往下，从左至右，对应数组索引从0开始到数组末尾

    所有有一些的对应关系：
    
    1. 数组中下标索引i的数字在树中的位置，它的左孩子在数组总的索引就是2i+1, 右孩子2i+2(如果有的话)

    完全二叉树： 从根到k-1层都是满二叉树，最后一层叶子节点从左到有可以有缺少


    2. 最后一个有子节点的父节点对应的索引应该是(n-2)/2, 从1中的有节点下标规律推出来, 2i+2 = n ( n是数组的长度 )





 */


//  最小堆的实现

function MinHeap(size) {

    let heap = new Array(size)

    let currSize = 0 // 当前堆的大小

    let maxSize = size // 堆的最大容量


    // 将二叉树调整到最小堆的表示方法

    /**
     * 
     * @param {*} start 开始的节点的下标，就是对应的局部父节点 
     * @param {*} m  数组的最大索引值等于长度-1
     */
    let shiftDown = function (start, m) {
        let parentIdx = start
        let leftChildIdx = start * 2 + 1  // 左节点一定是存在的，即使是树最后一层
        let miniIdx = leftChildIdx

        while (miniIdx <= m) {
            // 找到左右孩子的较小值，以及对应的索引
            if (miniIdx + 1 <= m && heap[miniIdx] > heap[miniIdx + 1]) {
                // 说明有右节点，需要比较左右两个节点的较小值
                miniIdx = miniIdx + 1
            }

            if (heap[parentIdx] <= heap[miniIdx]) {
                // 这种情况是不需要调整
                break;
            } else {

                // 需要交换父节点和较小的节点的位置
                let temp = heap[parentIdx]
                heap[parentIdx] = heap[miniIdx]
                heap[miniIdx] = temp

                // 注意父子节点位置的交换会导致其它的下一层的关系发生变化，下一次循环处理
                // 这里赋值的时候总是从左节点开始的，左孩子一定是存在的
                parentIdx = miniIdx
                miniIdx = 2 * parentIdx + 1

            }

        }
    }


    this.init = function (array = []) {

        // 传入一个数组，完整最小堆的排序

        // maxSize = array.length

        currSize = array.length

        heap = new Array(array.length)

        //参数中的数组全部填充的heap数组中
        for (let i = 0; i < currSize; i++) {
            heap[i] = array[i]
        }

        // 找到堆的最后的一个分支节点的索引
        let start = Math.floor((currSize - 2) / 2)
        while (start >= 0) {
            shiftDown(start, currSize - 1)
            start--
        }

    }


    // for test

    this.print = function () {
        return heap
    }


    // insert方法， 插入一个节点的时候肯定就是从最后的叶子节点插入的，那么需要从下往上与父节点进行比较大小，然后调整位置
    let shiftUp = function (start) {

        let childIdx = start; // 当前节点是叶子节点

        // 找到他的父节点, 这里为啥不是 (childIdx-2)/2,插入的时候也有可能是右侧的节点位置
        let parentIdx = Math.floor((childIdx - 1) / 2)

        while (childIdx > 0) {

            if (heap[parentIdx] <= heap[childIdx]) {

                break
            } else {

                let temp = heap[parentIdx]

                heap[parentIdx] = heap[childIdx]

                heap[childIdx] = temp

                childIdx = parentIdx

                parentIdx = Math.floor((parentIdx - 1) / 2)

            }

        }
    }

    this.insert = function (item) {
        
        if(currSize >= maxSize) {
            // 超过了设计最大值，
            return false
        }

        heap[currSize] = item
        shiftUp(currSize)
        currSize++
        return true
    }




}



exports.MinHeap = MinHeap