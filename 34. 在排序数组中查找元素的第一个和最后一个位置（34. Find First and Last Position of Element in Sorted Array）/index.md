# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（34）在排序数组中查找元素的第一个和最后一个位置

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/a687ee2a-5a1f-4497-9001-ae6b721ed1d7.png)
![题目描述](https://files.mdnice.com/user/6999/0f115a37-b49e-4d70-ac83-cd123dc66dde.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/96a25bf8-4ce6-4dd3-9ec3-41bb5424726b.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “无视要求，直接调用 indexOf、 lastIndexOf”
var searchRange = function(nums, target) {
    return [nums.indexOf(target), nums.lastIndexOf(target)];
};
```

### 2 方案2
1)代码：
```js
// 方案2 “普通版的双指针”。

// 思路：
// 1）状态初始化
// 2.1）通过移动left，找到 left 的值
// 2.2）通过移动right，找到 right 的值
// 3）根据目前的 left、right 值返回不同的结果
var searchRange = function(nums, target) {
    // 1）状态初始化
    const l = nums.length;
    let left = 0,
        right = l - 1;
    
    // 2.1）通过移动left，找到 left 的值
    while (left < l) {
        if (nums[left] === target) {
            break;
        }
        else if (nums[left] > target) {
            left = -1;
            break;
        }
        else {
            left++;
        }
    }

    // 2.2）通过移动right，找到 right 的值
    while (right >= 0) {
        if (nums[right] === target) {
            break;
        }
        else if (nums[right] < target) {
            right = -1;
            break;
        }
        else {
            right--;
        }
    }

    // 3）根据目前的 left、right 值返回不同的结果。
    // 其实下面 4行 等同于
    // return left === l ? [-1, -1] : [left, right];
    if ([-1, l].includes(left) || [-1, -1].includes(left)) {
        return [-1, -1];
    }
    return [left, right];
}
```

### 3 方案3
1)代码：
```js
// 方案3 “二分查找”

// 参考：
// 1）https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/zai-pai-xu-shu-zu-zhong-cha-zhao-yuan-su-de-di-3-4/
const binarySearch = (nums, target, lower) => {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

var searchRange = function(nums, target) {
    const leftIdx = binarySearch(nums, target, true);
    const rightIdx = binarySearch(nums, target, false) - 1;
    let ans = [-1, -1];

    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        ans = [leftIdx, rightIdx];
    }
    
    return ans;
};
```

# 四 资源分享 & 更多
### 1 历史文章 - 总览
![历史文章 - 总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

![刷题进度 - LeetCode：355 / 2492 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/0fb20e8c-ac87-4f48-954a-69dbadf0e8bf.png)

### 2 【资源分享】算法通关 + 面试宝典算法通关 + 面试宝典
```
1）算法通关40讲（极客 - 外企大佬讲的）：
链接: https://pan.baidu.com/s/1C175QEmcAunjnCzYzoLBz 提取码: hjna

2）动态规划专题（价值几百美刀~）：https://www.bilibili.com/video/BV1nt4y1Y7nz

3）前端面经：
3.1）https://www.nowcoder.com/tutorial/96
3.2）https://muyiy.cn/question
3.3）https://hub.fastgit.org/haizlin/fe-interview/blob/master/category/history.md

注：若失效请前往VX公众号： 码农三少 ，发送关键字： LeetCode 或 算法 ，即可获取最新的链接~
```

![算法通关 + 面试宝典](https://files.mdnice.com/user/6999/624dbb9c-9ead-4e64-a840-0c52c40c1856.jpg)

### 3 博主简介
码农三少 ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~

![博主简介](https://files.mdnice.com/user/6999/0b3d3906-d883-43be-b243-5e08ea066aac.png)