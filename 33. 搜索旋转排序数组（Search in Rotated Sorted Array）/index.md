# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（33）搜索旋转排序数组

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/46f4447b-c5b4-485b-b3cc-cf91f0b99a0e.png)
![题目描述](https://files.mdnice.com/user/6999/b4b5bf60-56fe-4619-b428-8d51df14aab8.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/0bbdd6c6-87b7-4981-a114-8c7d5a3f2706.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “无视要求，直接调用 indexOf 等函数”
var search = function(nums, target) {
    return nums.indexOf(target);
};
```

### 2 方案2
1)代码：
```js
// 方案2 “无视要求，单指针”

// 技巧：
// 1）nums是有序的，然后以某个下标进行翻转。
// 2）通过观察，可以得知 新的nums 走势基本就是 “升序-降序-升序”。

// 思路（整体分2种情况）：
// 1）状态初始化
// 2）分 2种 情况 。
// 2.1）若 nums[left] <= target ，则 不断判断 nums[left] === target 。
// 若 相等，则 直接返回 left，否则 left++ 。
// 2.2）若 nums[right] >= target ，则 不断判断 nums[right] === target 。
// 若 相等，则 直接返回 right，否则 right-- 。
var search = function(nums, target) {
    // 1）状态初始化
    const l = nums.length;
    let left = 0,
        right = l - 1;
    
    // 2）分 2种 情况 。
    // 2.1）若 nums[left] <= target ，则 不断判断 nums[left] === target 。
    // 若 相等，则 直接返回 left，否则 left++ 。
    if (nums[left] <= target) {
        while(left < l) {
            if (nums[left] === target) {
                return left;
            }
            left++;
        }
        return -1;
    }
    // 2.2）若 nums[right] >= target ，则 不断判断 nums[right] === target 。
    // 若 相等，则 直接返回 right，否则 right-- 。
    else if(nums[right] >= target){
        while(right >= 0) {
            if (nums[right] === target) {
                return right;
            }
            right--;
        }
        return -1;
    }

    // 边界case： [4,5,6,7,0,1,2] 3
    return -1;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “二分查找”。
// 技巧：O(log n)的时间复杂度 --> “二分查找” 。

// 参考：
// 1）https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/ji-jian-solution-by-lukelee/
var search = function(nums, target) {
    const l = nums.length;
    let left = 0,
        right = l - 1;
    
    while (left < right) {
        let mid = parseInt((left + right) / 2);
        if ((nums[0] > target) ^ (nums[0] > nums[mid]) ^ (target > nums[mid])) {
            left = mid + 1;
        }
        else {
            right = mid;
        }
    }

    return left === right && nums[left] === target ? left : -1;
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