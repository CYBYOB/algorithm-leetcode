# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（23）合并K个升序链表

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/8cced089-9ea9-4c33-9e43-e38d5889ac5e.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/2774d5a1-40d8-4508-8a04-daf2b4f15f10.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “化归思想” —— “不熟悉的 --> 熟悉的”。
// 技巧：若 我们并不知道从 A-->C 的最佳路线、但知道 B-->C 的路线，
// 则 原先的 A-->C 问题就变成了 A-->B 问题。
// 步骤：
// 1）初始化变量。
// 2）遍历所有链表，并将每个节点上的值 存入 数组 resArr 里。
// 3）重排 resArr ，使其变得有序。
// 4）遍历 resArr ，将每个元素存在新链表里。
// 5）返回新链表的头结点。
var mergeKLists = function(lists) {
    // 1）初始化变量。
    const l = lists.length;
    let resArr = [];
    
    // 2）遍历所有链表，并将每个节点上的值 存入 数组 resArr 里。
    for (let i = 0; i < l; i++) {
        let tempHead = lists[i];
        // 2.1）取得每一个链表，不断将它们往后拉 并 存节点值 至 resArr 。
        while (tempHead) {
            resArr.push(tempHead.val);
            tempHead = tempHead.next;
        }
    }

    // 3）重排 resArr ，使其变得有序。
    resArr = resArr.sort((a, b) => a - b);
    
    // 4）遍历 resArr ，将每个元素存在新链表里。
    const resArrLength = resArr.length;
    let index = 1,
        resHead = tempHead = new ListNode(resArr[0]);

    // 边界：若 lists 为[]、[[]] 时，则直接 return null 即可。
    if (resArrLength === 0) {
        return null;
    }
    // 4.1）遍历 resArr ，将当前元素放入 节点 并 往后拉链表。
    while (index < resArrLength) {
        tempHead.next = new ListNode(resArr[index]);
        tempHead = tempHead.next;
        index++;
    }
    
    // 5）返回新链表的头结点。
    return resHead;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “升级版的化归法”。
// 我们之前写过合并2个有序链表。
// 步骤：
// 1）处理边界（其实可以省略，因为核心处理能覆盖）。如 [] 、 [[]] 或 [[1,4,5]] 等。
// 2）核心处理：不断遍历 lists ，每次取其中的2项（l1、l2）、调用 mergeTwoLists 不断将 l1、l2 合并。
// 3）返回结果 resHead（头结点） 。
var mergeKLists = function(lists) {
    // 合并2个有序链表（使用递归）。
    const mergeTwoLists = (l1, l2) => {
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

    const l = lists.length;

    // 1）边界。
    if (l === 0) {
        return null;
    }
    if (l === 1) {
        return lists[0];
    }

    // 2）核心处理：不断遍历 lists ，每次取其中的2项（l1、l2）、调用 mergeTwoLists 不断将 l1、l2 合并。
    // 技巧：数组的“多 变 一” —— 优先考虑 reduce（或 reduceRight） 函数。
    const resHead = lists.reduce((acc, cur) => {
        acc = mergeTwoLists(acc, cur);
        return acc;
    }, null);

    // 3）返回结果 resHead（头结点） 。
    return resHead;
}
```

### 3 方案3
1)代码：
```js
// 方案3 ”N指针法“。通过 24 / 133 ，TODO：写法有问题，待完善~
// 注：此时， N = K 。 
var mergeKLists = function(lists) {
    // 获取下一个节点（即 tempHeadList 里最小值对应的节点）。
    const getNextNodeByTempHeadList = (tempHeadList) => {
        // 边界：当前位于“头结点”为null时，不参与“比较”过程。
        tempHeadList = tempHeadList.filter(item => item !== null);

        // 1）找出目前最小值对应的下标
        const l = tempHeadList.length;
        let index = 0,
            resMinIndex = -1,
            resMinVal = Number.POSITIVE_INFINITY;
        
        while (index < l) {
            const tempVal = tempHeadList[index].val;
            if (tempVal <= resMinVal) {
                resMinVal = tempVal;
                resMinIndex = index;
            }
            index++;
        }

        // 边界：目前最小值对应的下标 为 -1时。
        if (resMinIndex === -1) {
            return [null, []];
        }
        const tempHeadNew = tempHeadList[resMinIndex];
        tempHeadList[resMinIndex] = tempHeadList[resMinIndex].next;

        // 2）返回下一个节点（tempHeadNew） 和 新的tempHeadList。
        return [tempHeadNew, tempHeadList];
    }


    const l = lists.length;
    let tempHeadList = [];

    // 1）遍历 lists ，将每一组的“头结点（非 null 时）”放入 tempHeadList 中，
    // tempHeadList 作为 获取下一个节点（即 tempHeadList 里最小值对应的节点）
    // —— getNextNodeByTempHeadList的输入参数。
    for (let i = 0; i < l; i++) {
        if (lists[i] !== null) {
            tempHeadList.push(lists[i]);
        }   
    }

    let resHead = null,
        tempHead = null;
    while (tempHeadList.length !== 0) {
        const [tempHeadNew, tempHeadListNew] = getNextNodeByTempHeadList(tempHeadList);
        // 边界
        if (tempHeadNew === null) {
            break;
        }
        
        if (resHead === null) {
            resHead = tempHead = tempHeadNew;
        } else {
            tempHead = tempHeadNew;
        }

        tempHead = tempHead.next;
        tempHeadList = tempHeadListNew;
    }

    // 2）返回结果
    return resHead;
}
```

### 4 方案4
1)代码：
```Java
class Solution {
    public ListNode mergeKLists(ListNode[] lists) { 
        int k = lists.length;
        ListNode dummyHead = new ListNode(0);
        ListNode tail = dummyHead;
        while (true) {
            ListNode minNode = null;
            int minPointer = -1;
            for (int i = 0; i < k; i++) {
                if (lists[i] == null) {
                    continue;
                }
                if (minNode == null || lists[i].val < minNode.val) {
                    minNode = lists[i];
                    minPointer = i;
                }
            }
            if (minPointer == -1) {
                break;
            }
            tail.next = minNode;
            tail = tail.next;
            lists[minPointer] = lists[minPointer].next;
        }
        return dummyHead.next;
    }
}

参考：
1）https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/4-chong-fang-fa-xiang-jie-bi-xu-miao-dong-by-sweet/
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