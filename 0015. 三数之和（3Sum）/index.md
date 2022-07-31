# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（15）三数之和

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

# 四 资源分享 & 更多
### 1 历史文章 - 总览
|  文章名称  |  解法  |  阅读量  |
|  ----  |  ----  |  ----  |
| [1. 两数之和（Two Sum）](https://www.nowcoder.com/discuss/694669)  |  共 3 种  |  2.7 k+  |
| [2. 两数相加 （Add Two Numbers）](https://www.nowcoder.com/discuss/694670)  |  共 4 种  |  2.7 k+  |
| [3. 无重复字符的最长子串（Longest Substring Without Repeating Characters）](https://www.nowcoder.com/discuss/694672)  |  共 3 种  |  2.6 k+  |
| [4. 寻找两个正序数组的中位数（Median of Two Sorted Arrays）](https://www.nowcoder.com/discuss/694678)  |  共 3 种  |  2.8 k+  |
| [5. 最长回文子串（Longest Palindromic Substring）](https://www.nowcoder.com/discuss/698291)  |  共 4 种  |  2.8 k+  |
| [6. Z 字形变换（ZigZag Conversion）](https://www.nowcoder.com/discuss/700500)  |  共 2 种  |  1.9 k+  |
| [7. 整数反转（Reverse Integer）](https://www.nowcoder.com/discuss/700970)  |  共 2 种  |  2.4 k+  |
| [8. 字符串转换整数 (atoi)（String to Integer (atoi)）](https://www.nowcoder.com/discuss/703073)  |  共 3 种  |  4.2 k+  |
| [9. 回文数（Palindrome Number）](https://www.nowcoder.com/discuss/707310)  |  共 3 种  |  4.3 k+  |
|    |    |    |
| [11. 盛最多水的容器（Container With Most Water）](https://www.nowcoder.com/discuss/707799)  |  共 5 种  |  4.0 k+  |
| [12. 整数转罗马数字（Integer to Roman）](https://www.nowcoder.com/discuss/714981)  |  共 3 种  |  3.2 k+  |
| [13. 罗马数字转整数（Roman to Integer）](https://www.nowcoder.com/discuss/715379)  |  共 3 种  |  3.8 k+  |
| [14. 最长公共前缀（Longest Common Prefix）](https://www.nowcoder.com/discuss/717512)  |  共 4 种  |  3.0 k+  |
| [15. 三数之和（3Sum）](https://www.nowcoder.com/discuss/723145)  |  共 3 种  |  60.7 k+  |
| [16. 最接近的三数之和（3Sum Closest）](https://www.nowcoder.com/discuss/724097)  |  共 3 种  |  4.7 k+  |
| [17. 电话号码的字母组合（Letter Combinations of a Phone Number）](https://www.nowcoder.com/discuss/724373)  |  共 3 种  |  3.1 k+  |
| [18. 四数之和（4Sum）](https://www.nowcoder.com/discuss/729584)  |  共 4 种  |  11.5 k+  |
| [19. 删除链表的倒数第 N 个结点（Remove Nth Node From End of List）](https://www.nowcoder.com/discuss/732151)  |  共 4 种  |  1.2 k+  |
| [20. 有效的括号（Valid Parentheses）](https://www.nowcoder.com/discuss/743116)  |  共 2 种  |  1.8 k+  |
|    |    |    |
| [21. 合并两个有序链表（Merge Two Sorted Lists）](https://www.nowcoder.com/discuss/756174)  |  共 3 种  |  1.2 k+  |
| [22. 括号生成（Generate Parentheses）](https://www.nowcoder.com/discuss/763914)  |  共 4 种  |  1.1 k+  |
| [23. 合并K个升序链表（Merge k Sorted Lists）](https://www.nowcoder.com/discuss/765397)  |  共 4 种  |  0.9 k+  |
| [24. 两两交换链表中的节点（Swap Nodes in Pairs）](https://www.nowcoder.com/discuss/772985)  |  共 3 种  |  0.5 k+  |
| [25. K 个一组翻转链表（Reverse Nodes in k-Group）](https://www.nowcoder.com/discuss/772990)  |  共 5 种  |  1.3 k+  |
| [26. 删除有序数组中的重复项（Remove Duplicates from Sorted Array）](https://www.nowcoder.com/discuss/776495)  |  共 4 种  |  1.3 k+  |
| [27. 移除元素（Remove Element）](https://www.nowcoder.com/discuss/777291)  |  共 4 种  |  0.4 k+  |
| [28. 实现 strStr()（Implement strStr()）](https://www.nowcoder.com/discuss/782696)  |  共 5 种  |  0.8 k+  |
| [29. 两数相除（Divide Two Integers）](https://www.nowcoder.com/discuss/792278)  |  共 4 种  |  0.6 k+  |
| [30. 串联所有单词的子串（Substring with Concatenation of All Words）](https://www.nowcoder.com/discuss/799063)  |  共 3 种  |  0.6 k+  |
|    |    |    |
| [31. 下一个排列（Next Permutation）](https://www.nowcoder.com/discuss/809149)  |  共 2 种  |  0.8 k+  |
| [32. 最长有效括号（Longest Valid Parentheses）](https://www.nowcoder.com/discuss/813508)  |  共 2 种  |  1.4 k+  |
| [33. 搜索旋转排序数组（Search in Rotated Sorted Array）](https://www.nowcoder.com/discuss/816990)  |  共 3 种  |  1.0k+  |
| [34. 在排序数组中查找元素的第一个和最后一个位置（Find First and Last Position of Element in Sorted Array）](https://www.nowcoder.com/discuss/817432)  |  共 3 种  |  0.5 k+  |
| [35. 搜索插入位置（Search Insert Position）](https://www.nowcoder.com/discuss/820192)  |  共 3 种  |  0.3 k+  |
| [36. 有效的数独（Valid Sudoku）](https://www.nowcoder.com/discuss/823293)  |  共 1 种  |  0.6 k+  |
| [38. 外观数列（Count and Say）](https://www.nowcoder.com/discuss/829005)  |  共 5 种  |  1.1 k+  |
| [39. 组合总和（Combination Sum）](https://www.nowcoder.com/discuss/829181)  |  共 3 种  |  1.4 k+  |
| [40. 组合总和 II（Combination Sum II）](https://www.nowcoder.com/discuss/829482)  |  共 2 种  |  1.6 k+  |
|    |    |    |
| [41. 缺失的第一个正数（First Missing Positive）](https://www.nowcoder.com/discuss/830694)  |  共 3 种  |  1.2 k+  |
| [53. 最大子数组和（Maximum Subarray）](https://www.nowcoder.com/discuss/960689)  |  共 3 种  |  0.3k+  |
| [88. 合并两个有序数组（Merge Sorted Array）](https://www.nowcoder.com/discuss/964446)  |  共 3 种  |  0.4 k+  |
| [102. 二叉树的层序遍历（Binary Tree Level Order Traversal）](https://www.nowcoder.com/discuss/963081)  |  共 3 种  |  0.4 k+  |
| [146. LRU 缓存（LRU Cache）](https://www.nowcoder.com/discuss/953216)  |  共 2 种  |  0.5 k+  |
| [160. 相交链表（Intersection of Two Linked Lists）](https://www.nowcoder.com/discuss/967316)  |  共 2 种  |  0.1 k+  |
| [200. 岛屿数量（Number of Islands）](https://www.nowcoder.com/discuss/967192)  |  共 4 种  |  0.1 k+  |
| [206. 反转链表（Reverse Linked List）](https://www.nowcoder.com/discuss/952847)  |  共 3 种  |  1.0 k+  |
| [215. 数组中的第K个最大元素（Kth Largest Element in an Array）](https://www.nowcoder.com/discuss/956928)  |  共 3 种  |  0.5 k+  |
| [236. 二叉树的最近公共祖先（Lowest Common Ancestor of a Binary Tree）](https://www.nowcoder.com/discuss/964696)  |  共 3 种  |  0.1 k+  |
| [2119. 反转两次的数字（A Number After a Double Reversal）](https://www.nowcoder.com/discuss/867972)  |  共 2 种  |  0.3 k+  |
| [2120. 执行所有后缀指令（Execution of All Suffix Instructions Staying in a Grid）](https://www.nowcoder.com/discuss/846814)  |  共 1 种  |  0.4 k+  |
| [2124. 检查是否所有 A 都在 B 之前（Check if All A's Appears Before All B's）](https://www.nowcoder.com/discuss/841288)  |  共 4 种  |  0.4 k+  |
| [2125. 银行中的激光束数量（Number of Laser Beams in a Bank）](https://www.nowcoder.com/discuss/840968)  |  共 3 种  |  0.3 k+  |
| [2126. 摧毁小行星（Destroying Asteroids）](https://www.nowcoder.com/discuss/834640)  |  共 2 种  |  1.6 k+  |
| [2129. 将标题首字母大写（Capitalize the Title）](https://www.nowcoder.com/discuss/832690)  |  共 2 种  |  0.6 k+  |
| [2130. 链表最大孪生和（Maximum Twin Sum of a Linked List）](https://www.nowcoder.com/discuss/832131)  |  共 2 种  |  0.6 k+  |
| [2133. 检查是否每一行每一列都包含全部整数（Check if Every Row and Column Contains All Numbers）](https://www.nowcoder.com/discuss/830828)  |  共 1 种  |  0.6 k+  |

![刷题进度 - LeetCode：535 / 2672 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/de513ce9-a168-4c0a-8940-81779d59e83b.png)

### 2 博主简介
码农三少 ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~