
const { isLegalString, rpn, miniStack, post } = require('../index')

test('字符串合法性校验', () => {
    const testStr = 'sdfds(ew(we)rw)rwqqqwewe'
    expect(isLegalString(testStr))
        .toBe(true)
})


test('逆波兰表示计算', () => {
    const test = ['3', '5', '+', '7', '-']
    expect(rpn(test))
        .toBe('1')
})


test('mini 栈', () => {
    const mini = new miniStack()

    mini.push(3)
    mini.push(1)
    mini.push(2)

    expect(mini.mini())
        .toBe(1)
})


test('后缀表达式测试', () => {

    const test = ['3', '+', '5', '-', '7']
    expect(post(test))
        .toStrictEqual(['3', '5', '+', '7', '-'])
})