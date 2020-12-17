
/**
 *  stack 
 *  
 * feature:
 *   FILO (frist in last out)
 *     
 * method:
 *   push 
 *   pop 
 *   top
 *   isEmpty
 *   size
 *   clear
 *   
 */

//  这里使用数组来实现栈这种数据结构，数组实现起来是最简单的方式
/**
 *  栈这种数据结构，从api的设计是就看出来就是仅仅支持对栈顶元素的操作
 */
function Stack() {

    // 存数据的地方，这里是闭包变量
    let items = [];


    this.push = function (item) {
        items.push(item)
    }

    this.pop = function () {
        return items.pop()
    }

    this.top = function () {
        return items[items.length - 1]
    }

    this.isEmpty = function () {
        return items.length === 0
    }

    this.size = function () {
        return items.length
    }

    this.clear = function () {
        items = []
    }

}


exports.Stack = Stack


// 简单的应用题体会栈解决问题的思路

// 给定一段字符串包含括号，要求必须是要成对出现的，否则就是非法字符串
// sdf(ds(ew(we)rw)rwqq)qwewe

/**
 * 思路：
 * 根据栈的特点，去遍历字符串，遇到左括号压入栈，遇到右括号就判断栈顶内元素，如果为空那么就没有左括号对应非法，有左括号就弹出栈，
 * 这样等最后遍历结束后，判断栈内元素是否为空，为空则合法
 */

exports.isLegalString = function (str) {

    let stack = new Stack()

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char === "(") {
            stack.push(char)
        } else if (char === ")") {
            if (stack.isEmpty()) {
                return false
            } else {
                stack.pop()
            }
        }
    }

    // 字符串遍历完毕，检查栈内元素
    if (stack.isEmpty()) {
        return true
    } else {
        return false
    }
}



// 总结：一定要注意栈的数据结构特点，忽略掉底层的实现细节。这里是判断小括号，其实判断引号，单引号，双引号，所有的成对出现的字符判断都是可以的，只要是一一对应
// 可以并列可以嵌套都是可以的。

// 还有就是文档写作是，撤销操作的实现，其实通过栈也是可以实现的，具体就是每一步的文档操作压入栈中，撤销操作就是弹出栈顶的操作，每一个的操作其实就是给对文档的修改
// 弹出栈顶的操作，那么上一次的修改就没了，自然而然文档就恢复之前的状态



//  题目：逆波兰表达式-求解
/**
 *  逆波兰表达式也叫后缀表达式，正常的算数计算表达式都是两个远算数中间有一个运算符。
 *  例如： 3+5-7  这种表达式显然对计算机的运算时不友好的，计算机没法通过简单地重复性的操作来处理这种复杂的表达式
 * 
 *  那么这种中缀表达式是可以通过算法转化为后缀表达式的
 * 
 *  [ 3, 5, +, 7, - ] 这就是转化后的后缀表达式，
 *  
 *  思路：
 *  后缀表达式的计算 就可以通过栈来实现，通过遍历数组，遇到数字就压入栈，遇到计算符号就冲弹出栈两次(两个运算数)然后计算，将结果继续压入栈。
 *  重复上述的操作，直至遍历结束，弹出栈内的最后的计算结果
 */

// Reverse Polish notation，RPN，或逆波兰记法
exports.rpn = function (params) {

    let stack = new Stack()

    // 这里params是字符串的数组
    // [ '3', '5', '+', '7', '-' ]
    for (let i = 0; i < params.length; i++) {
        const item = params[i];

        if (['+', '-', '*', '/'].indexOf(item) > -1) {
            //是运算符
            let top = stack.pop()
            let second = stack.pop()
            let result = parseFloat(eval(second + item + top))
            stack.push(result.toString())

        } else {
            stack.push(item)
        }

    }

    return stack.pop()

}

/**
 *  实现mini stack的方法, 就是说在原有stack常规方法的基础上，加入一个mini方法，用来实现返回最小值的api。
 *      
 *  这里就是通过分而治之的思想，简单的来说就是对于特殊的mini方法，采用两个栈来分别处理，一个是普通的栈处理正常
 *  的栈的方法，另一个栈专门用来处理mini方法，这个方法用另外一个栈专门处理
 *  
 */

exports.miniStack = function () {

    const stack1 = new Stack()
    const stack2 = new Stack() // mini stack处理


    this.push = function (item) {
        stack1.push(item)

        // stack2 特殊处理
        if (stack2.isEmpty() || item < stack2.top()) {
            stack2.push(item)
        } else {
            stack2.push(stack2.top())
        }
    }

    this.pop = function () {
        stack2.pop() //这个mini栈也要弹出去，不然下去再取mini值得时候就不准确的
        return stack1.pop()
    }


    this.mini = function () {
        return stack2.top()
    }

}


/*
 中缀表达式转为后缀表达式

 中缀表达式就是普通的计算表达式，后缀表达式就是逆波兰表示方法

 1 + 2 * 3 - 2

思路：
    中缀表达式，后缀表达式都是用一个数组来存储起来，准备一个数组postfix
    遍历中缀表达式，遇到数组就是直接push到postfix数组
    
    1. 数字直接push
    2. 遇到运算符压栈，在压栈之前需要判断栈顶运算符的优先级，保证栈顶元素的优先级要不大于当前的运算符
    3. 遇到左括号，压栈，遇到右括号，将栈中左括号之前的运算符全部弹出栈，包括左括号；这一对括号内的运算当做是一个局部优先级高的表达式
    4. 遍历结束，最后栈内的元素依次全部弹出栈

*/

exports.post = function (array = []) {

    const result = []

    //运算符的优先级
    const priority = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    }

    // 运算符
    const operations = Object.keys(priority);

    const stack = new Stack()

    for (let i = 0; i < array.length; i++) {
        const ele = array[i];

        // 数字
        if (!isNaN(parseInt(ele))) {
            result.push(ele)
        }

        // 运算符
        if (operations.includes(ele)) {
            while (stack.top() && (priority[stack.top()] >= priority[ele])) {
                // 当前的栈顶的运算符优先级存在而且 当前的运算符优先级高，就弹出栈
                result.push(stack.pop())
            }

            // 当前的遍历的运算符要加入到栈中
            stack.push(ele)

        }

        if (ele === "(") {
            stack.push(ele)
        }

        //右括号
        if (ele === ")") {
            while (stack.top() && stack.top() !== "(") {
                result.push(stack.pop())
            }

            //弹出左括号
            stack.pop()
        }

    }

    // 遍历stack中剩下的元素，依次加入到result中

    while(stack.top()) {
        result.push(stack.pop())
    }

    return result
}






