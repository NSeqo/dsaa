/*
    队列是一种特殊的线性表，它的特点是一头进，一头出，先进先出的特点，类似一个管道或者排队购买



 */


function Queue() {
    const items = [] // 存储数据

    //api 方法
    //队列尾部添加到队列
    this.enqueue = function (item) {
        items.push(item)
    }

    //队列首部删除
    this.dequeue = function () {
        return items.shift()
    }

    //head 返回头部元素
    this.head = function () {
        return items[0]
    }

    // size
    this.size = function () {
        return items.length
    }

    // clear
    this.clear = function () {
        items = []
    }


    this.isEmpty = function () {
        return items.length === 0
    }

    // 返回尾部的元素
    this.tail = function (params) {
        return items[items.length - 1]
    }

}


// 约瑟夫环
/*
    一个长度为100的数组，存放数组0-99，要求每隔两个数字就删除一个，到数组末尾时自动从数组头部继续，直到最后数组中剩下一个数字，求最后剩下的数字是？

    思路：
    这个问题就是别3整除的数字删除，然后呢，到数组末尾的时候怎么和数字头部接上去呢，形成一个闭环的？
    显然使用数组解决这个问题比较不直观，那么这个考虑使用队列来处理，头部的依次从队列头部取出来，然后判断是否需要删除，不删除的元素就接着放回到队列的
    尾部，这样刚好就形成了一个闭环
    
 */


exports.delRing = function (array = []) {

    const queue = new Queue()

    for (let i = 0; i < array.length; i++) {
        const num = array[i];
        queue.enqueue(num)
    }

    let idx = 0;

    while (queue.size() > 1) {
        const head = queue.dequeue()
        idx++
        if (idx % 3 !== 0) {
            queue.enqueue(head)
        }
    }

    return queue.dequeue() // 最后剩下一个元素

}



/*

    斐波那契数列的计算
    斐波那契数列，前两项是1，从第三项开始等于前两项之和,递归公式 f(n) = f(n-1) + f(n-2)

    思路：
    利用队列的特点，开始存前两项，之后从头部删除元素，将其和之后的头部元素计算结果加入到队列的尾部，这样保证队列中始终都是两项，队尾就是要计算的第
    n项
    
 */


exports.fibonacci = function (n) {
    if (n < 3) return 1

    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(1)

    //第n项需要计算n-2次
    while (n - 2 > 0) {
        const head = queue.dequeue()
        const top = queue.head()
        queue.enqueue(head + top)
        n--
    }

    return queue.tail()
}


/*

使用队列的例子还有很多，比如逐层打印一颗树上的节点。
像kafka，rabbitmq这类消息队列，其形式就是一种队列，消息生产者把消息放入队列中（尾部），消费者从队列里取出消息进行处理（头部），只不过背后的实现更为复杂。

如果你了解一点socket，那么你应该知道当大量客户端向服务端发起连接，而服务端忙不过来的时候，就会把这些请求放入到队列中，
先来的先处理，后来的后处理，队列满时，新来的请求直接抛弃掉。

 */




//  使用队列来实现栈的结构
/*

    栈的特点是 先进后出，只能操作栈顶的元素，方法有push, top, pop

    队列的特点是先进的先出，push方法就是队列的尾部插入元素，top方法就是放回队列的尾部元素，
    pop方法比较麻烦，需要将队尾的元素的删除，那么队列中只能把队尾之前的元素全部删除后，在删除队尾的元素，
    实际上队尾之前的元素是需要的，删除后必须要有地方存起来，那么只能借助两个队列，这样的话两个队列中就会存在一各是空队列，一个是满元素状态


 */

exports.simulateStack = function () {

    const q1 = new Queue()
    const q2 = new Queue()

    this.push = function (item) {
        // 非空的队列来添加元素
        if (q1.isEmpty()) {
            q2.enqueue(item)
        } else {
            q1.enqueue(item)
        }
    }

    this.top = function () {
        if (q1.isEmpty()) {
            return q2.tail()
        }
        return q1.tail()
    }


    this.pop = function () {
        if (q1.isEmpty()) {
            //遍历q2，删除最后一个之前的元素，删除的元素要重新放到q1中
            while (q2.size() > 1) {
                const item = q2.dequeue()
                q1.enqueue(item)
            }

            // 删除最有一个元素
            return q2.dequeue()
        } else {
            //遍历q1，删除最后一个之前的元素，删除的元素要重新放到q1中
            while (q1.size() > 1) {
                const item = q1.dequeue()
                q2.enqueue(item)
            }

            // 删除最有一个元素
            return q1.dequeue()
        }
    }
}


/*
    打印杨辉三角
    杨辉三角就是每一个除了收尾元素，中间的元素等于上一个行的左右肩上的数字之和，第n行就有n各数字

            1
           1 1
          1 2 1
         1 3 3 1
        1 4 6 4 1 

        // 第i行第j个数字的规律，显然是一个递归的公式，如果是用队列处理
        // 对于这种递归的问题，大概都可以使用队列来处理，因为是使用队列刚好就可以前两项处理之后的结果放到队尾
    这个f(i)(j) = f(i-1)(j-1) + f(i-1)(j)

    思路：
    使用队列来处理计算每一个行的数字，必定是两层循环，外层循环是第i行，内层循环是第j个数字，每次循环的操作其实计算的是下一行的值，
    始终保持队列中保存的是两个数字
 */


 exports.yanghui = function(n) {
    // 输出从1到n行的杨辉三角
    let queue = new Queue()

    queue.enqueue(1); // 第一行就一个数字1

    const temp = [];

    temp[0] = [1]; // 二维数组表示杨辉三角
    
    for (let i = 1; i < n; i++) {

        //每次循环其实是计算下一行的数字

        temp[i] = []

        let prev = 0

        const nextQueue = new Queue()

        while(!queue.isEmpty()) {
            
            

            let item = queue.dequeue()

            let value = prev + item

            temp[i].push(value)

            nextQueue.enqueue(value)

            prev = item

        }

        // 每一行最后一个是1
        temp[i].push(1)
        nextQueue.enqueue(1)

       
        //下次循环的时候，将nextQueue赋值给queue
        queue = nextQueue
        
    }

    return temp
    
 }