

const { BitMap } = require('../index')


const bitmap = new BitMap(4)

test('测试bitmap的添加数字功能', () => {
   bitmap.addMember(32);
   expect(bitmap.isExist(32))
      .toBe(true)
})