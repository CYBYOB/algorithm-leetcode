# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（12）整数转罗马数字

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-14/1628935478083-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-14/1628935514122-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-15/1629011274672-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8812%EF%BC%89%E6%95%B4%E6%95%B0%E8%BD%AC%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
var intToRoman = function(num) {
    // 1）定义普通数值（非4、9前缀的值）的转换函数
    const getNotFourNineTranStr = (tempVal) => {
        // 1.1）定义相应的数据映射
        const map = new Map([
            [1, 'I'],
            [5, 'V'],
            [10, 'X'],
            [50, 'L'],
            [100, 'C'],
            [500, 'D'],
            [1000, 'M']
        ]);
        let str = '';

        const tempArr = [1000, 500, 100, 50, 10, 5, 1],
            l = tempArr.length;
        let index = 0;

        // 1.2）从1000开始，
        // 若 tempVal>= 1000，则 str就填入 'M' && tempVal -= 1000
        // 否则若 tempVal < 1000，则 str不用动 && index++
        // 循环边界：tempVal不为0
        while (tempVal) {
            if (tempVal >= tempArr[index]) {
                str += map.get(tempArr[index]);
                tempVal -= tempArr[index];
            } else {
                index++;
            }
        }
        
        // 1.3）返回对应的转换后字符串
        return str;
    };

    // 2）定义 4、9前缀的值 的转换Map数据
    const map = new Map([
        [4, 'IV'],
        [40, 'XL'],
        [400, 'CD'],
        [9, 'IX'],
        [90, 'XC'],
        [900, 'CM']
    ]);

    let weight = 1,
        resStr = '';

    // 3）对此时 num 取模得到 modVal ，
    // 若 modVal 为 4、9 则直接从上面定义好的map取字符串、拼接 —— resStr = map.get(tempVal) + resStr;
    // 否则 resStr = getNotFourNineTranStr(tempVal) + resStr; 
    // 处理：weight *= 10; num = parseInt(num / 10);
    // 循环边界：num 不为 0
    while (num) {
        const modVal = num % 10;
        const tempVal = modVal * weight;
        
        if (modVal === 4 || modVal === 9) {
            resStr = map.get(tempVal) + resStr;
        } else {
            resStr = getNotFourNineTranStr(tempVal) + resStr;
        }

        weight *= 10;
        // 边界：别漏了 parseInt ，不能写成 num /= 10、会带上小数点！
        num = parseInt(num / 10);
    }

    // 4）返回结果字符串 resStr
    return resStr;
};
```

### 2 方案2
1)代码：
```js
var intToRoman = function(num) {
    const l = num.length,
    // 1）定义新的“映射数据”
        tempArr = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I']
    ];

    let index = 0,
        resStr = '';

    // 2）循环处理
    // 从 tempArr[0] 开始取值，const [val, valStr] = tempArr[index];
    // 若 num >= val，则 resStr 拼接valStr && num 减去 val值
    // 否则若 num < val，则说明当前 tempArr[index][0] 过大，我们 下标index 需往后走，即 index++; 
    // 循环边界：num 不为 0
    while (num) {
        const [val, valStr] = tempArr[index];
        if (num >= val) {
            resStr += valStr;
            num -= val;
        } else {
            index++;
        }
    }

    // 3）返回拼接好的 resStr 
    return resStr;
}
```

### 3 方案3
1)代码：
```js
var intToRoman = function(num) {
    // 1）建立“所有可能的数据映射集”
    const mArr = ["", "M", "MM", "MMM"], // 1000, 2000, 3000
        cArr = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"], // 100~900
        xArr = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], // 10~90
        iArr = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]; // 1~9

    // 下面的 第1、4行可以精简，这里为了格式统一、所以加上一些不必要的处理。
    // 2）根据“运算结果”，从“上面的映射集”中取得我们的映射字符串、拼接在 resStr 中。
    const resStr = mArr[parseInt((num % 10000) / 1000)]
        + cArr[parseInt((num % 1000) / 100)]
        + xArr[parseInt((num % 100) / 10)]
        + iArr[parseInt((num % 10) / 1)];

    // 3）返回结果字符串 resStr 。
    return resStr;
}
```