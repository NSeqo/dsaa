/*

 bitmap 数据结构

 内存中最小的存储单位是bit, 位运算就是对二进制位进行运算操作

 按位与 &   都为1则为1，其它为0
 按位或 |   有一个为1则为1

 左移 <<
 左移动是二进制位向左移动n位，相当于右侧添加n个0,

 右移 >>
 刚好和左移相反

 */


/**
 *  一个很简单的问题，一直n个整数，范围在0~99之间，设计一种数据结构，使用数组存储这些数据，并对外提供两个方法add, isExist
 *  add 就是添加， isExit就是判断某个数字是否已经存在
 * 
 *  bitmap这种数据结构就是利用bit位来进行存储数据的状态值，回到最初的二进制运算来处理逻辑，
 * 
 *  二进制的位运算 包括 
 * 
 *  按位与 &， 对应bit位都是1则结果为1，否则为0
 *  按位或 |， 对应bit位都是0才是0，其它结果为1
 * 
 * 二进制    整数

    0 1 1     3
    1 1 1     7

    0 1 1     3

    

    这种使用bit位来映射的做法，可以最大限度的减少内存的开销，对于大数据的处理是非常有优势的，应用的场景：大数据的排序操作

 */

function BitMap(size) {

    // 实例化要一个数组，长度为size，每个值初始化为0
 
    let bitArray = new Array(size);
    bitArray.fill(0)
 
 
    // 数组中添加一个数字num, 根据num来确定它所在的bit位
    this.addMember = function (num) {
 
       //数组中存放的是整数，每个整数使用4个字节,就是32个bit位，需要根据num的大小来确定它在数组中的第几个索引位置
       //实际上使用每个bit位来存储数据的状态
       let arrayIndex = Math.floor(num / 32)
 
       // 确定在哪个bit位
       let bitIndex = num % 32
 
       // 按位或 ， 1<< bitIndex保证了这个位置是num的位置的bit位值位1，或运算结果也一定为1，这样保证了结果就是num位置的bit位结果为1，表明该数字存到到数组中
 
       bitArray[arrayIndex] = bitArray[arrayIndex] | 1 << bitIndex
 
    }
 
 
    // 判断某个数字是否存在
    this.isExist = function (num) {
       let arrayIndex = Math.floor(num / 32)
       let bitIndex = num % 32
 
        // 1 << n 位 与一个 
       let value = bitArray[arrayIndex] & 1 << bitIndex
 
       if(value === 1 << bitIndex ) {
          return true
       }else {
          return false
       }
    }
 }
 
 
 exports.BitMap = BitMap
 

//  bitmap 局限性 就是只能处理整数类型的数据，不能处理字符串类型的数据


