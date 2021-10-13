# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（21）合并两个有序链表

# 一 题目描述
![题目描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/558e8f967f764f5095bd1e6752f4d0ee~tplv-k3u1fbpfcp-zoom-1.image)
![题目描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22f6362f716340aeb6e5eeb06cfb44b8~tplv-k3u1fbpfcp-zoom-1.image)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/24a64bb3-8266-4e58-9e72-d0fd9ec7383a.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “简单、直观法”。
// 思路：
// 1）遍历 2个链表 ，将节点值存入 tempArr 。
// 2）将 tempArr 升序排序 。
// 3）遍历 tempArr ，构造合并后的有序链表 。
// 4）返回 有序链表的头结点 。

// “化归思想” —— “不熟悉的 --> 熟悉的”。
// 技巧：若 我们并不知道从 A-->C 的最佳路线、但知道 B-->C 的路线，
// 则 原先的 A-->C 问题就变成了 A-->B 问题。
var mergeTwoLists = function(l1, l2) {
    // 1）初始化状态。
    let tempArr = [];

    // 2）遍历 2个链表 ，将节点值存入 tempArr 。
    while (l1) {
        tempArr.push(l1.val);
        l1 = l1.next;
    }
    while (l2) {
        tempArr.push(l2.val);
        l2 = l2.next;
    }

    // 3）将 tempArr 升序排序 。
    tempArr.sort((a, b) => a - b);

    // 4）遍历 tempArr ，构造合并后的有序链表 。
    const l = tempArr.length;
    // 边界：tempArr为空数组（即 l1、l2 均为空链表时），直接 return null 。
    if (l === 0) {
        return null;
    }

    let index = 1,
        resHead = head = new ListNode(tempArr[0]);
    
    while (index < l) {
        head.next = new ListNode(tempArr[index]);
        head = head.next;
        index++;
    }

    // 5）返回 有序链表的头结点 resHead 。
    return resHead;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “双指针（分别挂在 l1、l2 上） - 迭代法”。
var mergeTwoLists = function(l1, l2) {
    // 1）边界处理。
    if (l1 === null && l2 === null) {
        return null;
    } else if (l1 === null && l2 !== null) {
        return l2;
    } else if (l1 !== null && l2 === null) {
        return l1;
    }
    
    // 2）此时的 l1、l2 肯定均不为null。
    let resHead = head = null;
    while (l1 && l2) {
        console.log(l1, l2, resHead)

        const val_1 = l1.val,
            val_2 = l2.val;

        if (resHead === null) {
            // 2.1）初始化 resHead、head。
            // 核心：从当前 l1、l2 的val中选最小值，串到结果链表 resHead 里
            if (val_1 <= val_2) {
                resHead = head = new ListNode(val_1);
                l1 = l1.next;
            } else {
                resHead = head = new ListNode(val_2);
                l2 = l2.next;
            }
        } else {
            // 2.2）不断根据 val_1 和 val_2 的大小情况，处理 head、head.next 。
            // 核心：从当前 l1、l2 的val中选最小值，串到结果链表 resHead 里
            if (val_1 <= val_2) {
                head.next = new ListNode(val_1);
                l1 = l1.next;
            } else {
                head.next = new ListNode(val_2);
                l2 = l2.next;
            }
            head = head.next;
        }
    }
    
    // 3）边界：l1 或 l2 可能还有剩余。
    // 核心：需要将剩余的部分串到 head的下一个节点（next值）里。
    if (l1) {
        head.next = l1;
    } else {
        head.next = l2;
    }

    // 4）返回结果 resHead 。
    return resHead;
}
```

### 3 方案3
1)代码：
```js
// 方案3 递归。
// 技巧：永远记住，递归 = 递归出口（为了不陷入无线递归的死循环） + 递归主体（一般会变更一些参数后，在调用函数本身）。
// 一般 递归出口 放前面， 递归主体 放后面。
var mergeTwoLists = function(l1, l2) {
    // 1）递归出口。
    if (l1 === null) {
        return l2;
    }
    if (l2 === null) {
        return l1;
    }

    // 2）递归主体。
    // 核心：此时 l1、l2 均不为null。
    const val_1 = l1.val,
        val_2 = l2.val;

    if (val_1 <= val_2) {
        // 2.1）核心：“谁小就需要自己去主动找到自己的下家（即下一个节点 next 值）”。
        l1.next = mergeTwoLists(l1.next, l2);
        // 并将当前小的的节点返回出去 —— 供上层调用 mergeTwoLists 的调用者使用。
        return l1;
    } else {
        // 2.2）核心：“谁小就需要自己去主动找到自己的下家（即下一个节点 next 值）”。
        l2.next = mergeTwoLists(l2.next, l1);
        // 并将当前小的的节点返回出去 —— 供上层调用 mergeTwoLists 的调用者使用。
        return l2;
    }
}
```

# 四 更多
### 1 GitHub - LeetCode项目仓库
```
0）本项目地址： https://github.com/CYBYOB/algorithm-leetcode 。
目标、愿景：
让每个人都能拥有一定的算法能力、以应对面试中（会举一反三的同学还可以将其融入自己的肌肉和血液，甚至能够赋能于公司的业务和技术）的算法。

1）项目的根目录下的 README.md 文件，
可以帮您快速查阅每1道题的来源、难度、所有的题解方案等。

2）而每个题解（即 index.md 文件）中，
还将附带题目描述、所有的题解方案的思维导图（ .xmind 文件）、思路和技巧等。

3）每种题解方案都有详细的注释，
通过“数字步骤”将抽象的算法逻辑、
清晰和有层次的展示于您的面前。
可以说是，
开箱即用~

4）所有的题解方案都是经过作者1人之手，
故代码风格及其统一。
一旦阅读达到一定量后，
后续将大大提升您的阅读速度 —— “正所谓、量变引起质变”。

5）本人每周仍在不断的更新 —— 保证每周都有新的题目、题解方案刺激着您的神经 和 刷题欲望。
欢迎对算法感兴趣的同学加入我们的社群。
QQ群： 933919972 ；
作者QQ： 1520112971 ；
作者VX： c13227839870（可拉您进群、一起学习与交流~） 。
```

![GitHub：algorithm-leetcode - 项目亮点](https://files.mdnice.com/user/6999/772fafdd-76ab-4e0c-a1f9-34e65ac63fad.png)

![GitHub：algorithm-leetcode - 题目总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

### 2 作者标签
```
1）“伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，
在校期间、个人公众号（IT三少。新自媒体（公众号）号： 码农三少 ）
在半年内实现了0到5.8K+的粉丝增长等。
```