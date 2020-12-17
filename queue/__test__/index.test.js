

const { delRing, fibonacci, simulateStack } = require('../index')


test('测试约瑟夫环', () => {
    //提供一个数组0-9
    const testArray = [0, 1, 2, 3]

    expect(delRing(testArray))
        .toBe(0)
})


test('测试斐波那契', () => {

    const n = 5

    expect(fibonacci(n))
        .toBe(5)
})


test('队列来模拟栈', () => {

    const stack = new simulateStack()

    stack.push(1)
    stack.push(2)
    stack.push(3)

    expect(stack.top())
        .toBe(3)

    expect(stack.pop())
        .toBe(3)

    expect(stack.pop())
        .toBe(2)
})