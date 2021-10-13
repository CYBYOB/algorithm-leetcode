# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（24）两两交换链表中的节点

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/68a6f46a-85e3-4b2a-b5b4-99f879c80352.png)
![题目描述](https://files.mdnice.com/user/6999/45562263-6648-44e7-a27c-1fab96c14709.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/120b3385-de6d-4d18-8724-5770eb8af12b.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “简单、直观法”（本质就是“化归” —— 把不熟悉的变成熟悉的）。
// 1）遍历链表，依次将所有节点的值存入 数组 resArr 里。
// 2）遍历 resArr ，间隔（step、步骤）为2、相邻的奇偶位置值互换。
// 3）再次遍历 resArr ，依次将所有元素存入新链表中。
// 4）返回结果 resHead 。
var swapPairs = function(head) {
    let resArr = [];
    // 1）遍历链表，依次将所有节点的值存入 数组 resArr 里。
    while (head) {
        resArr.push(head.val);
        head = head.next;
    }

    const l = resArr.length;
    // 2）遍历 resArr ，间隔（step、步骤）为2、相邻的奇偶位置值互换。
    for (let i = 0; i <= l - 2; i += 2) {
        const j = i + 1;
        if (resArr[j] !== undefined) {
            [resArr[i], resArr[j]] = [resArr[j], resArr[i]];
        }
    }

    let resHead = null,
        resHead = null;
    // 3）再次遍历 resArr ，依次将所有元素存入新链表中。
    for (let i = 0; i < l; i++) {
        if (i === 0) {
            resHead = resHead = new ListNode(resArr[i]);
        } else {
            resHead.next = new ListNode(resArr[i]);
            resHead = resHead.next;
        }
    }

    // 4）返回结果 resHead 。
    return resHead;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “递归”。
// 核心代码（即递归主体）：
// let one = head,
//     two = one.next,
//     three = two.next;

// two.next = one;
// one.next = swapPairs(three);

// return two;
var swapPairs = function(head) {
    // 1）递归出口。
    // 若 节点数小于2（即 此时 head.next.next 肯定不存在）时，
    // 则 返回当前传入的头结点 —— head 即可。
    if (head === null || head.next === null) {
        return head;
    }

    // 2）递归主体
    // 2.1）声明 one（head）、two（one.next）、three（two.next） 3个节点
    let one = head,
        two = one.next,
        three = two.next;
        
    // 2.1）核心处理：
    // two.next = one;  one.next = swapPairs(three);
    two.next = one;
    one.next = swapPairs(three);

    // 2.3）返回此时的 two 节点 —— 共上一层调用时的 one.next 赋值用。
    return two;

    // 参考：
    // 1）https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/liang-liang-jiao-huan-lian-biao-zhong-de-jie-di-91/
}
```

### 3 方案3
1)代码：
```js
// 方案3 “迭代法”。TODO：较复杂，后续需加上详细的思路（含图文等）与注释。
// 注意：“其实就是方案2的迭代实现”。

// 思路：
// 1）创建哑结点 dummyHead，令 dummyHead.next = head。令 temp 表示当前到达的节点，初始时 temp = dummyHead。每次需要交换 temp 后面的两个节点。
// 如果 temp 的后面没有节点或者只有一个节点，则没有更多的节点需要交换，因此结束交换。否则，获得 temp 后面的两个节点 node1 和 node2，通过更新节点的指针关系实现两两交换节点。

// 2）具体而言，交换之前的节点关系是 temp -> node1 -> node2，交换之后的节点关系要变成 temp -> node2 -> node1，因此需要进行如下操作：
// temp.next = node2
// node1.next = node2.next
// node2.next = node1

// 3）完成上述操作之后，节点关系即变成 temp -> node2 -> node1。再令 temp = node1，对链表中的其余节点进行两两交换，直到全部节点都被两两交换。

// 4）两两交换链表中的节点之后，新的链表的头节点是 dummyHead.next，返回新的链表的头节点即可。
var swapPairs = function(head) {
    // 1）dummyHead 为哑结点（辅助节点）。
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let temp = dummyHead;

    // 2）核心处理。
    while (temp.next !== null && temp.next.next !== null) {
        const node1 = temp.next;
        const node2 = temp.next.next;
        temp.next = node2;
        node1.next = node2.next;
        node2.next = node1;
        temp = node1;
    }

    // 3）返回结果 dummyHead.next 。
    return dummyHead.next;

    // 参考：
    // 1）https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/liang-liang-jiao-huan-lian-biao-zhong-de-jie-di-91/
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