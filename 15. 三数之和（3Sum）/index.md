# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（15）三数之和

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 作者简介
### 1 作者简历
![作者简历](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630133245439-image.png)
![2019年的微信小程序应用开发赛-全国三等奖](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630133461339-image.png)

### 2 作者标签
```
1）“伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛-全国三等奖；
2019CODA比赛- 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，在校期间、个人公众号（IT三少。新自媒体（公众号）号：码农三少）在半年内实现了0到5.8K+的粉丝增长等。
```
![自媒体-粉丝数据（半年内实现了0到5.8K+的粉丝增长）](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630134068710-%E7%B2%89%E4%B8%9D-%E6%95%B0%E6%8D%AE.jpg)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-25/1629903229878-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-25/1629904086072-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-27/1630078927303-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8815%EF%BC%89%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “暴力”。3层for循环，超时、通过 315 / 318 。
// 技巧：涉及“数量、重复、唯一性”可优先考虑 hash （JS里的 map数据结构 ）
var threeSum = function(nums) {
    const l = nums.length;
    // map：判断是否重复 —— 即之前是否存过该答案
    // 1）初始化 map 和 resArr
    let map = new Map(),
        resArr = [];

    // 2）3层for循环。i范围[0, l - 3]，j范围[i + 1, l - 2]，k范围[j + 1, l - 3]。
    for (let i = 0; i < l - 2; i++) {
        for (let j = i + 1; j < l - 1; j++) {
            for (let k = j + 1; k < l; k++) {
                // 3）核心处理
                const tempSum = nums[i] + nums[j] + nums[k];
                if (tempSum === 0) {
                    // 3.1）当 nums[i] + nums[j] + nums[k] === 0 时，
                    // 判断此时3个数所组成的答案之前有没有存过，没有就保存到 resArr 里
                    const tempStr = [nums[i], nums[j], nums[k]].sort().join('#');
                    if (!map.has(tempStr)) {
                        // 注：此处的 1 无意义，仅表示 tempStr 的答案存储过了
                        map.set(tempStr, 1);
                        resArr.push([nums[i], nums[j], nums[k]]);
                    }
                }
            }
        }
    }

    return resArr;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “排序 + 双指针”。
// 技巧：佛说：“有序胜过无序”。
// 通过sort方法（时间复杂度仅为 O(nlogn)）将无序的数组变有序是一件很划算的事情。
var threeSum = function(nums) {
    // 1）排序（升序）
    nums = nums.sort((a, b) => a-b);

    const l = nums.length;
    let resArr = [];

    for(let i = 0; i< l-2; i++) {
        // 边界：因为升序排的，若 nums[i] > 0，
        // 则必有 nums[i] + nums[left] + nums[right] > 0，需终止循环遍历
        if (nums[i] > 0) {
            break;
        }
        // 边界：[0, 0, 0, 0]等。本质："去第1个数的重"。此时需直接进入下一个循环
        if (nums[i - 1] === nums[i]) {
            continue;
        }

        let left = i + 1;
        let right = l - 1;

        // 2）核心：固定1个数之后，
        // 就变成了“双指针”（本质就是twoSum，2个数之和为 (-1) * nums[i]）问题。
        while (left < right) {
            // 边界：[-1, 0, 0, 1, 1]。本质："去第2个数的重"。
            if (left - 1 !== i && nums[left] === nums[left - 1]) {
                left++;
                continue;
            }
            const tempSum = nums[i] + nums[left] + nums[right];
            if (tempSum === 0) {
                // 3）找到之后，肯定不会重、直接放入 resArr。
                // 处理：left、right同时往中间靠。
                resArr.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
            } else if (tempSum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    // 4）返回结果 resArr 。
    return resArr;
}
```

### 3 方案3
1)代码：
```js
// 方案3 回溯（说白了、说穿了，就是递归。因为一般用递归实现回溯）。
// 本质：其实跟3层for循环差不多，超时。通过 315 / 318。
var threeSum = function(nums) {
    // 深度优先遍历。
    // 技巧：递归 = 递归出口 + 递归主体。
    const dfs = (index, l, curArr, resArr) => {
        const curLength = curArr.length;

        // 1）递归出口。index过大 || “当前记录数组”长度 > 3
        if (index > l ||  curLength> 3) {
            return;
        }

        // 2）递归主体。
        // 2.1）当 “当前记录数组”长度 === 3，需要判断是否为3个数之和为0且未重复存储过。
        if (curLength === 3) {
            const tempSum = curArr.reduce((acc, cur) => {
                return acc += cur;
            }, 0);
            const tempStr = curArr.join('#');

            if (tempSum === 0 && !map.has(tempStr)) {
                // 边界：必须是 curArr.slice() 、存其副本！
                // 若直接写的 curArr 就是存的引用，会因引用引起问题
                resArr.push(curArr.slice());
                map.set(tempStr, 1);
            }
        }
        // 2.2）当 “当前记录数组”长度 < 3，需要进行回溯遍历（即 选 与 不选 ）。
        else if (curLength < 3) {
            const newIndex = index + 1;
            // 核心：所谓的“回溯”本质 —— 选 与 不选。
            // 2.2.1）选
            curArr.push(nums[index]);
            dfs(newIndex, l, curArr, resArr);
            // 2.2.2）不选
            curArr.pop();
            dfs(newIndex, l, curArr, resArr);
        }
    };


    const l = nums.length;
    // 1）排序。去重有用， const tempStr = curArr.join('#'); 。
    nums = nums.sort((a, b) => a - b);
    
    // 2）“状态”初始化
    let index = 0,
        // 作用：记录是否重复
        map = new Map(),
        curArr = [],
        resArr = [];

    // 3）调用回溯函数 —— dfs
    dfs(index, l, curArr, resArr);

    // 4）返回结果 resArr 。
    return resArr;
}
```

# 四 内推&更多
### 1 内推
本人是百度的1名工程师，欢迎校招、社招同学向本人投递简历。
本人可内推公司（也可帮忙内推 阿里、腾讯、字节、美团、滴滴、京东等~）的所有岗位，欢迎私信~

### 2 更多
以下是个人整理的一些笔记和书籍（永久有效链接: **https://pan.baidu.com/s/1SPc3umO6cZlBtoPylSaHzw  密码: eqee** ，若失效的话可私信本人以进行最新资料的获取）：
![个人技术笔记(350+算法题解、前端重点面经汇总、图解HTTP等)](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-4-4/1617511535179-image.png)
![理财书籍pdf](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-4-4/1617511225028-image.png)
![技术书籍pdf](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-4-4/1617511414339-image.png)