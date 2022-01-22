# 标题：算法（leetode，附思维导图 + 全部解法）300题之（4）寻找两个正序数组的中位数

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-25/1627202999506-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-25/1627202974813-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-31/1627723652734-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%884%EF%BC%89%E5%AF%BB%E6%89%BE%E4%B8%A4%E4%B8%AA%E6%AD%A3%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E4%B8%AD%E4%BD%8D%E6%95%B0.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
var findMedianSortedArrays = function(nums1, nums2) {
    // 注意: push() 返回的是该数组的最新长度，
    // 所以不可以 nums1.push(...nums2).sort((a, b) => a - b);
    nums1.push(...nums2);
    nums1.sort((a, b) => a - b);
    let l = nums1.length;
    // 判断奇偶性，返回对应的中位数
    return l % 2 ? nums1[parseInt(l / 2)] : (nums1[l / 2 - 1] + nums1[l / 2]) / 2;
};
```

### 2 方案2
1)代码：
```js
var findMedianSortedArrays = function(nums1, nums2) {
    let n1 = nums1.length;
    let n2 = nums2.length;

    // 两个数组总长度
    let len = n1 + n2;

    // 保存当前移动的指针的值(在nums1或nums2移动)，和上一个值
    let preValue = -1;
    let curValue = -1;

    //  两个指针分别在nums1和nums2上移动
    let point1 = 0;
    let point2 = 0;

    // 需要遍历len/2次，当len是奇数时，最后取curValue的值，是偶数时，最后取(preValue + curValue)/2的值
    for (let i = 0; i <= Math.floor(len/2); i++) {
        preValue = curValue;
        // 需要在nums1上移动point1指针
        if (point1 < n1 && (point2 >= n2 || nums1[point1] < nums2[point2])) {
            curValue = nums1[point1];
            point1++;
        } else {
            curValue = nums2[point2];
            point2++;
        }
    }
    
    return len % 2 === 0 
        ? (preValue + curValue) / 2
        : curValue
};
```

### 3 方案3
1)代码：
```js
var findMedianSortedArrays = function(nums1, nums2) {
    // nums1长度比nums2小
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    let m = nums1.length;
    let n = nums2.length;
    // 在0～m中查找
    let left = 0;
    let right = m;

    // median1：前一部分的最大值
    // median2：后一部分的最小值
    let median1 = 0;
    let median2 = 0;

    while(left <= right) {
        // 前一部分包含 nums1[0 .. i-1] 和 nums2[0 .. j-1]
        // 后一部分包含 nums1[i .. m-1] 和 nums2[j .. n-1]
        const i = left + Math.floor((right - left) / 2);
        const j = Math.floor((m + n + 1) / 2) - i;
        
        const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];
        const minRight1 = i === m ? Infinity : nums1[i];

        const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];
        const minRight2 = j === n ? Infinity : nums2[j];

        if (maxLeft1 <= minRight2) {
            median1 = Math.max(maxLeft1, maxLeft2);
            median2 = Math.min(minRight1, minRight2);
            left = i + 1;
        } else{
            right = i - 1;
        }
    }
    return (m + n) % 2 == 0 ? (median1 + median2) / 2 : median1;
};
```

# 四 资源分享 & 更多
### 1 历史文章 - 总览
![历史文章 - 总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

![刷题进度 - LeetCode：381 / 2498 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/aa583ce2-ca99-44eb-ab95-81c1d3a37eed.png)

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
**码农三少** ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~

![博主简介](https://files.mdnice.com/user/6999/0b3d3906-d883-43be-b243-5e08ea066aac.png)