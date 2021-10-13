# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（25）K 个一组翻转链表

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/6e471147-894d-4f60-8de6-321f67dd215f.png)
![题目描述](https://files.mdnice.com/user/6999/ab9878f1-e9c1-49c7-9cc0-caca7968b40f.png)
![题目描述](https://files.mdnice.com/user/6999/b304de74-6b98-47f1-b329-619402d6ecac.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/1a464f85-eaa5-407d-9194-b10a082e2a11.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “化归思想” —— “不熟悉的 --> 熟悉的”。
// 技巧：若 我们并不知道从 A-->C 的最佳路线、但知道 B-->C 的路线，
// 则 原先的 A-->C 问题就变成了 A-->B 问题。

// 思路：
// 1）遍历链表，将节点值放入 tempList 。
// 2）遍历 tempList ，K个一组进行翻转、得到 kList，不断将 kList 放入 resList 。
// 3）遍历 resList ，依次将节点值取出并构造出相关的新链表 —— 返回其头结点 resHead 即可。
// 4）返回新链表的头结点 resHead 。
var reverseKGroup = function(head, k) {
    // 1）遍历链表，将节点值放入 tempList 。
    let tempList = [];
    while (head) {
        tempList.push(head.val);
        head = head.next;
    }

    // 2）遍历 tempList ，K个一组进行翻转、得到 kList，不断将 kList 放入 resList 。
    const l = tempList.length;
    let resList = [];
    // 2.1）注意：这里用的是 var ，而不是 let && 循环条件是 i <= i- k 。
    for (var i = 0; i <= l - k; i += k) {
        resList.push(...tempList.slice(i, i + k).reverse());
    }
    // 2.2）边界：可能有剩余，需要继续放入 resList 。
    resList.push(...tempList.slice(i));

    // 3）遍历 resList ，依次将节点值取出并构造出相关的链表 —— 返回其头结点 resHead 即可。
    // 3.1）边界：若 链表长度 小于0 ，则 直接返回 null 。
    if (l < 0) {
        return null;
    }

    // 3.2）普通情况：遍历 resList ，构造出相应的新链表。
    let resHead = tempHead = new ListNode(resList[0]);
    for (let i = 1; i < l; i++) {
        tempHead.next = new ListNode(resList[i]);
        tempHead = tempHead.next;
    }

    // 4）返回新链表的头结点 resHead 。
    return resHead;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “长度为 K 的栈” —— 其实可以算是 方案1的 优化版。
// 技巧：翻转的话，我们可以想到栈 —— 遍历存入栈、然后弹栈，后面就出来 “翻转”效果了。
// 思路：
// 1）resHead = temHead = head; 
// resHead：要返回的。 temHead不断往后拉并将节点值放入 栈stack 。 head：记录本次翻转的开始节点位置。
// 2）不断往后拉动 tempHead （进行核心逻辑的处理，特别是 “边界（不足k个）、翻转（够k个）”的处理）。
// 3）返回结果 resHead 。
var reverseKGroup = function(head, k) {
    // 1）resHead = temHead = head; 
    // resHead：要返回的。 temHead不断往后拉并将节点值放入 栈stack 。 head：记录本次翻转的开始节点位置。
    let resHead = temHead = head,
        tempK = k,
        stack = [];

    // 2）不断往后拉动 tempHead （进行核心逻辑的处理，特别是 “边界（不足k个）、翻转（够k个）”的处理）。
    while (temHead) {
        // 注意：别漏了 && temHead 。
        while (tempK > 0 && temHead) {
            stack.push(temHead.val);
            temHead = temHead.next;
            tempK--;
        }

        // 2.1）边界：说明不需要翻转了，结束所有的流程。
        if (tempK > 0) {
            break;
        }
        // 2.2）此时说明，需要对 k个节点进行翻转，从 head 节点开始。
        if (tempK === 0) {
            while (stack.length > 0) {
                head.val = stack.pop();
                head = head.next;
            }
        }

        // 2.3）下一轮开始之前恢复 tempK 值成 k 。
        tempK = k;
    }

    // 3）返回结果 resHead 。
    return resHead;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “递归”。
// 技巧：“对于 树、链表 这种数据结构的题目，我们基本都可以使用递归处理”。
// 原理：“结构 与 与 算法 相适应，因为递归的本质就是 栈 ，栈的本质是函数。
// 一般来说，处理每一节点都需要调用我们定义好的函数 —— 形如 dfs(某个节点, 其他各种参数)”。
// 思路：
// 1）状态初始化。
// 2）以 k个链表节点(需要保障当前 head 存在) 一组不断遍历，将当前节点存入 栈stack 中。
// 3）判断 栈stack 里面的节点是否需要翻转，并分别进行 不同的处理 。
var reverseKGroup = function(head, k) {
    // 1）状态初始化。
    let resHead = head,
        tempK = k,
        stack = [];

    // 2）以 k个链表节点(需要保障当前 head 存在) 一组不断遍历，将当前节点存入 栈stack 中。
    while (head && tempK > 0) {
        stack.push(head);
        head = head.next;
        tempK--;
    }

    // 3）判断 栈stack 里面的节点是否需要翻转，并分别进行 不同的处理 。
    // 3.1）若 tempK > 0，则 说明个数不够、无序翻转，直接返回 传入的头结点 即可。
    // 注意：这里不能返回 head ，因为 遍历时拉动了 head 。而 resHead = head 后，没有动 resHead 。
    if (tempK > 0) {
        return resHead;
    }

    // 3.2）若 tempK === 0，则 进行翻转。
    else {
        let tempHead = null;
        resHead = tempHead = stack.pop();

        // 3.2.1）翻转里面的 链表 节点。
        while (stack.length > 0) {
            const nextNode =  stack.pop();
            tempHead.next = nextNode;
            tempHead = tempHead.next;
        }
        
        // 3.2.2）此时最开始的头结点需指向 reverseKGroup(head, k) 。
        tempHead.next = reverseKGroup(head, k);

        // 3.2.3）返回结果节点 resHead 。
        return resHead;
    }
}
```

### 4 方案4
1)代码：
```js
方案4 “迭代”。
// TODO：比较难，待实现。到时统一更新至：
// 1）VX公众号 “码农三少” 。
// 2）GitHub：https://github.com/CYBYOB/algorithm-leetcode 。
const myReverse = (head, tail) => {

}
```

### 5 方案5
1)代码：
```js
// 方案5 LeetCode官方。
// 参考：
// 1）https://leetcode-cn.com/problems/reverse-nodes-in-k-group/solution/k-ge-yi-zu-fan-zhuan-lian-biao-by-leetcode-solutio/
const myReverse = (head, tail) => {
    let prev = tail.next;
    let p = head;
    while (prev !== tail) {
        const nex = p.next;
        p.next = prev;
        prev = p;
        p = nex;
    }
    return [tail, head];
}
var reverseKGroup = function(head, k) {
    const hair = new ListNode(0);
    hair.next = head;
    let pre = hair;

    while (head) {
        let tail = pre;
        // 查看剩余部分长度是否大于等于 k
        for (let i = 0; i < k; ++i) {
            tail = tail.next;
            if (!tail) {
                return hair.next;
            }
        }
        const nex = tail.next;
        [head, tail] = myReverse(head, tail);
        // 把子链表重新接回原链表
        pre.next = head;
        tail.next = nex;
        pre = tail;
        head = tail.next;
    }
    return hair.next;
};
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