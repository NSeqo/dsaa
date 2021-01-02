

const { MinHeap } = require('../index')
const miniHeap = new MinHeap(100)

test('测试最小堆', () => {
    const params = [53, 17, 78, 9, 45, 65, 87, 23]
    miniHeap.init(params)
    expect(miniHeap.print())
        .toStrictEqual([9, 17, 65, 23, 45, 78, 87, 53])

})

test('测试插入方法', () => {
    miniHeap.insert(11)
    expect(miniHeap.print())
        .toStrictEqual([9, 11, 65, 17, 45, 78, 87, 53, 23])

})