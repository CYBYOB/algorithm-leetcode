# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（6）Z字形变换

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-1/1627807715665-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-1/1627807743493-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628322362575-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%886%EF%BC%89Z%E5%AD%97%E5%BD%A2%E5%8F%98%E6%8D%A2.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1：1）初始化 tempArr 等。 2）后续的下标值都由 tempArr最开始存放的几个值进行生成的
var convert = function(s, numRows) {
    let l = s.length,
        // 最顶上的几个数所组成的数组
        tempArr = [],
        // 记录已经存到 resStr 里的字符对应下标
        tempMap = new Map(),
        // 需要返回的字符串
        resStr = '';
    
    // 边界1："A" 1（核心：当 numRows = 1 时）
    if (numRows === 1) {
        return s;
    }

    // 初始化 tempArr、tempMap、resStr
    for (let i = 0; true; i += 2) {
        const index = i * (numRows - 1);
        if (index < l) {
            tempArr.push(index);
            tempMap.set(index, 1);
            resStr += s[index];
        } else {
            // 边界2："ABCD" 3（tempArr里的顶部下标多存1个，就不会漏生成一些下标了）
            tempArr.push(index);
            break;
        }
    }

    for (let bias = 1; bias < numRows; bias++) {
        for (let i = 0; i < tempArr.length; i++) {
            // 核心：根据 当前顶部的数值（tempArr[i]） 进行 +、- bias（ 取值范围：[1, numRows - 1] ）
            // 去分别生成新的下标 indexLeft、indexRight
            // 接着根据下标 indexLeft、indexRight 的有效情况，去进行不同的处理。
            const indexLeft = tempArr[i] - bias,
                indexRight = tempArr[i] + bias;

            // 边界3：别忘了 && indexLeft > 0 条件！！
            if (indexLeft < l && !tempMap.has(indexLeft) && indexLeft > 0) {
                tempMap.set(indexLeft, 1);
                resStr += s[indexLeft];
            }
            if (indexRight < l && !tempMap.has(indexRight)) {
                tempMap.set(indexRight, 1);
                resStr += s[indexRight];
            }
        }
    }

    return resStr;
};
```

### 2 方案2
1)代码：
```js
var convert = function(s, numRows) {
    if(numRows == 1)
        return s;

    const len = Math.min(s.length, numRows);
    const rows = [];
    for(let i = 0; i< len; i++) rows[i] = "";
    let loc = 0;
    let down = false;

    for(const c of s) {
        rows[loc] += c;
        if(loc == 0 || loc == numRows - 1)
            down = !down;
        loc += down ? 1 : -1;
    }

    let ans = "";
    for(const row of rows) {
        ans += row;
    }
    return ans;
};
```

# 四 内推&更多
### 1 内推
本人是百度的1名工程师，欢迎校招、社招同学向本人投递简历。
本人可内推公司（也可帮忙内推 阿里、腾讯、字节、美团、滴滴、京东等~）的所有岗位，本人邮箱如下：

1）chenyuanbao@baidu.com

2）yuanbao.chen@qq.com


部分的JD如下：

1）![内推-百度-基础架构部-前端](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628324503124-image.png)

2）![内推-百度-基础架构部-后端](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628325243459-%E5%9F%BA%E7%A1%80%E6%9E%B6%E6%9E%84%E9%83%A8.jpg)


### 2 更多
以下是个人整理的一些笔记和书籍（永久有效链接: **https://pan.baidu.com/s/1SPc3umO6cZlBtoPylSaHzw  密码: eqee** ，若失效的话可私信本人以进行最新资料的获取）：
![个人技术笔记(350+算法题解、前端重点面经汇总、图解HTTP等).png](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-4-4/1617511535179-image.png)
![理财书籍pdf.png](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-4-4/1617511225028-image.png)
![技术书籍pdf.png](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-4-4/1617511414339-image.png)