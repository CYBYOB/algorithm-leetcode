# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（19）删除链表的倒数第 N 个结点

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 作者简介
### 1 作者简历
![作者简历](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630133245439-image.png)
![2019年的微信小程序应用开发赛-全国三等奖](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630133461339-image.png)

### 2 作者标签
```
1）“伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，在校期间、个人公众号（IT三少。新自媒体（公众号）号：码农三少）在半年内实现了0到5.8K+的粉丝增长等。
```
![自媒体-粉丝数据（半年内实现了0到5.8K+的粉丝增长）](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630134068710-%E7%B2%89%E4%B8%9D-%E6%95%B0%E6%8D%AE.jpg)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-29/1630222879575-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-29/1630222978789-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-9-4/1630763367704-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8819%EF%BC%89%E5%88%A0%E9%99%A4%E9%93%BE%E8%A1%A8%E7%9A%84%E5%80%92%E6%95%B0%E7%AC%AC%20N%20%E4%B8%AA%E7%BB%93%E7%82%B9.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “化归思想” —— “不熟悉的 --> 熟悉的”。
// 技巧：若 我们并不知道从 A-->C 的最佳路线、但知道 B-->C 的路线，
// 则 原先的 A-->C 问题就变成了 A-->B 问题。
var removeNthFromEnd = function(head, n) {
    // 1）初始化存储链表的数组。
    let tempArr = [];

    // 2）遍历链表，将 节点的值val 不断存入 tempArr 。
    while (head) {
        tempArr.push(head.val);
        head = head.next;
    }

    const l = tempArr.length;
    // 3）删除数组 tempArr 倒数第N个值 。
    tempArr.splice(l - n, 1);

    // 4）遍历删除单个特定元素后的数组 tempArr ，并将相应的值不断 填充到新的链表 。
    let index = 0,
        tempHead = resHead = null;
    // 边界：因为 l 是删除前的长度，故此处遍历条件是 index < l - 1 。
    while (index < l - 1) {
        // 4.1）若 下标为0 ，
        // 则 需要同时初始化 resHead（头结点，程序的返回值） 和 tempHead（临时节点，用于遍历、往后拉） 。
        if (index === 0) {
            resHead = tempHead = new ListNode(tempArr[index]);
        }
        // 4.2）若 下标为0 ，
        // 则 仅需处理 tempHead 即可。
        else {
            tempHead.next = new ListNode(tempArr[index]);
            tempHead = tempHead.next;
        }
        index++;
    }

    // 5）返回结果 resHead 。
    return resHead;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “2次遍历”。
// 技巧：第一次遍历 —— 知道该链表的节点个数（即长度 l ）。
// 第二次遍历 —— 通过节点的“重新赋值操作”，达到 “删除链表的倒数第N个结点” 的目的。
var removeNthFromEnd = function(head, n) {
    // 1）第一次遍历 —— 知道该链表的节点个数（即长度 l ）。
    let l = 0,
        // 注：头结点在遍历前需做 “备份” ！
        tempHead = resHead = head;
    
    while (tempHead) {
        tempHead = tempHead.next;
        l++;
    }

    // 2）第二次遍历 —— 通过节点的“重新赋值操作”，达到 “删除链表的倒数第N个结点” 的目的。
    
    // 又重新遍历，故需重置 tempHead 为 resHead 。
    tempHead = resHead;
    // 注：count 别写成了 l - n ！
    let count = l - n - 1;

    // 边界：删除头结点，直接返回 resHead.next 即可 。
    // case：head = [1], n = 1 。
    if (count === -1) {
        return resHead.next;
    }

    // 2.1）通过 count 计数器不断将 tempHead 往后拉。
    for (let i = 0; i < count; i++) {
        tempHead = tempHead.next;
    }

    // 2.2）重新赋值，将 此时tempHead 的下一个节点 删除 。
    tempHead.next = tempHead.next.next;

    // 3）返回结果 resHead 。
    return resHead;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “1次遍历”。
// 技巧：数组存节点的引用、地址。
// 第一次遍历，依次将 节点 存入 数组tempArr & 同时得到链表的长度 l 。
// 核心：1）const count = l - n - 1;    2）tempArr[count].next = tempArr[count].next.next;
var removeNthFromEnd = function(head, n) {
    // 1）初始化状态
    let resHead = tempHead = head,
        tempArr = [],
        l = 0;

    // 2）第一次遍历，依次将 节点 存入 数组tempArr & 同时得到链表的长度 l 。
    while (tempHead) {
        tempArr.push(tempHead);
        tempHead = tempHead.next;
        l++;
    }

    // 3）确定要删除节点的位置 —— count 。
    const count = l - n - 1;

    // 3.1）边界：若 删除的 是头结点 ，
    // 则 直接返回 resHead.next 即可 。
    // case：head = [1], n = 1 。
    if (count === -1) {
        return resHead.next;
    }

    // 3.2）边界：若 删除的 不是头结点 ，
    // 则 将 tempArr[count].next 节点跳过，
    // 即 下面一行代码（核心！） 。
    tempArr[count].next = tempArr[count].next.next;

    // 4）返回结果 resHead 。
    return resHead;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “双指针，即 快慢指针”。
// 注：这里作者也有点看不懂程序了，参考：
// 1）https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/shan-chu-lian-biao-de-dao-shu-di-nge-jie-dian-b-61/
var removeNthFromEnd = function(head, n) {
    // 1）状态初始化
    let resHead = new ListNode(0, head),
        slow = fast = resHead;

    // 2）处理
    while (n) {
        fast = fast.next;
        n--;
    }

    if (!fast) {
        return fast.next;
    }

    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    // 3）删除相应的节点
    slow.next = slow.next.next;

    // 4）返回结果（因为一开始是 resHead = new ListNode(0, head) ）
    return resHead.next;
}
```

# 四 内推&更多
### 1 内推
本人是百度的1名工程师，欢迎校招、社招同学向本人投递简历。
本人可内推公司（也可帮忙内推 阿里、腾讯、字节、美团、滴滴、京东等）的所有岗位，欢迎私信。

### 2 更多
以下是个人整理的一些笔记和书籍（永久有效链接: **https://pan.baidu.com/s/1SPc3umO6cZlBtoPylSaHzw  密码: eqee** ，若失效的话可私信本人以进行最新资料的获取）：
![个人技术笔记(350+算法题解、前端重点面经汇总、图解HTTP等)](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-4-4/1617511535179-image.png)
![理财书籍pdf](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-4-4/1617511225028-image.png)
![技术书籍pdf](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-4-4/1617511414339-image.png)
![个人基金](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-9-5/1630837509076-image.png)
