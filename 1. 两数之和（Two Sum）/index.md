# 标题：算法（leetode，附思维导图 + 全部解法）300题之（1）两数之和

# 一 题目描述
![两数之和的题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-5-9/1620527340333-image.png)

# 二 解法总览（思维导图）

![算法（leetode）300题之（1）两数之和【解法思维导图】](https://files.mdnice.com/user/6999/33b3825c-b514-4752-acde-ec4891305ce5.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 不考虑任何复杂度的限制，2层for循环即可
var twoSum = function(nums, target) {
    let l = nums.length;

    // 因为要找2个数，所以 i值最多为 l-2
    for(let i=0; i<l-1; i++) {
        // 因为要找2个数，所以 j值最多为 l-1
        for(let j=i+1; j<l; j++) {
            // 若 当前2个i、j下标 对应的数值相加 正好等于 target，
            // 直接返回当前的 i、j 所组成的数组（因为题目限定必存在唯一答案）
            let sumTmp = nums[i] + nums[j];
            if(sumTmp === target) {
                return [i, j]
            }
        }
    }
};
```

### 2 方案2
1）代码：
```js
// hash法（JS使用 Map数据结构）。“记住，程序 = 数据结构 + 算法”
// 此时，Map是我们的数据结构，具体遍历、判断值等逻辑是我们的算法。
var twoSum = function(nums, target) {
    // 虽然选定了Map结构，但Map是有“key、value”组成
    // 此时我们还需考虑“key、value”的结构（类型值）。
    // 这里 key、value 分别为数组某个具体元素的值、下标
    let l = nums.length,
        m = new Map();

    for(let i=0; i<l; i++) {
        m.set(nums[i], i);
    }

    for(let i=0; i<l-1; i++) {
        let valTmp = target - nums[i],
            idxTmp = m.get(valTmp);
        // 边界：别忘了 2个index 不能相同！（具体为啥大家可以评论区讨论~）
        if(idxTmp !== undefined && i !== idxTmp) {
            return [i, idxTmp];
        }
    }
};
```

### 3 方案3（方案2的优化版）
1）代码：
```js
// 优化的核心：遍历次数从2降到1。

// hash法（JS使用 Map数据结构）。“记住，程序 = 数据结构 + 算法”
// 此时，Map是我们的数据结构，具体遍历、判断值等逻辑是我们的算法。
var twoSum = function(nums, target) {
    // 虽然选定了Map结构，但Map是有“key、value”组成
    // 此时我们还需考虑“key、value”的结构（类型值）。
    // 这里 key、value 分别为数组某个具体元素的值、下标
    let l = nums.length,
        m = new Map();

    for(let i=0; i<l; i++) {
        let valTmp = target - nums[i],
            idxTmp = m.get(valTmp);
        // 边界：别忘了 2个index 不能相同！（具体为啥大家可以评论区讨论~）
        if(idxTmp !== undefined && i !== idxTmp) {
            // 不同：因为1遍遍历，所以下标可能需要调整（因为可能i > idxTmp）
            // 但实际上，其实 [1, 2] 和 [2, 1] 都能通过
            return [i, idxTmp];
        }
        // 优化：下面一行代码不放最前面，因为若当前找到了，就不用再 m.set 了
        m.set(nums[i], i);
    }
};
```

# 四 更多
### 1 刷题进度
```
1）LeetCode：307 / 2390 。

2）《剑指offer》：66 / 66 。

3）相关学习资料与笔记汇总： 
https://github.com/CYBYOB/algorithm-leetcode/tree/master/资料%26笔记 。

4）注：所有题目均有 2-5种 左右的解法，后续还将不断更新题目 & 题解。
敬请期待~
也欢迎大家进群一起 学习、交流、刷题&拿高薪~
```

![刷题进度 - LeetCode：307 / 2390 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/09201cae-28f0-4062-8a07-03d027f4fc0c.png)

### 2 GitHub - LeetCode项目仓库
```
0）本项目地址： 
https://github.com/CYBYOB/algorithm-leetcode 。
目标、愿景：
让每个人都能拥有一定的算法能力、以应对面试中（会举一反三的同学还可以将其融入自己的肌肉和血液，甚至能够赋能于公司的业务和技术）的算法。

本人每周仍在不断的更新 —— 保证每周都有新的题目、题解方案刺激着您的神经 和 刷题欲望。
欢迎对算法感兴趣的同学加入我们的社群。
QQ群： 933919972 ；
作者QQ： 1520112971 ；
作者VX： c13227839870（可拉您进群、一起学习与交流~） 。
```

![GitHub：algorithm-leetcode - 项目亮点](https://files.mdnice.com/user/6999/772fafdd-76ab-4e0c-a1f9-34e65ac63fad.png)

![GitHub：algorithm-leetcode - 题目总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

### 3 作者标签
```
1）“BAT里1名小小的伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，
在校期间、个人公众号（IT三少。新自媒体（公众号）号： 码农三少 ）
在半年内实现了0到5.8K+的粉丝增长等。
```