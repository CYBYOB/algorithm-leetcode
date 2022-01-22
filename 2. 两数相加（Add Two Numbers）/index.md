# 标题：算法（leetode，附思维导图 + 全部解法）300题之（2）两数相加

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-24/1627097791820-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-24/1627097827561-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-24/1627097848398-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-24/1627117766083-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%92%8C%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%882%EF%BC%89%E4%B8%A4%E6%95%B0%E7%9B%B8%E5%8A%A0.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
var addTwoNumbers = function(l1, l2) {
    // 获取链表所代表的值
    const getValueByLink = (link) => {
        let resVal = 0
            // weight表示当前位置的权重，10的“整幂倍”
            weight = 1;
        while (link) {
            resVal += (link.val * weight);
            // 权重乘10，链表位置往后走
            weight *= 10;
            link = link.next;
        }
        return resVal;
    }

    const val_1 = getValueByLink(l1),
        val_2 = getValueByLink(l2);
    let sum = val_1 + val_2;

    // 根据sum值不断遍历、将相应的位置值放入 curLink 里
    // 若 sum = 807 ，则 resLink = [7, 0, 8]
    const resLink = curLink = new ListNode(sum % 10);
    sum = parseInt(sum/10);
    while (sum) {
        // curLink不断放当前sum值的“个位数值”。sum不断赋成parseInt(sum/10)
        curLink.next = new ListNode(sum % 10);
        curLink = curLink.next;
        // 别错写成 sum /= 10，漏了 parseInt ！！
        sum = parseInt(sum/10);
    }

    return resLink;
}
```

### 2 方案2
1)代码：
```js
var addTwoNumbers = function(l1, l2) {
    let resArr = [],
        // carry 是否有进位（其值范围一定是 [0, 1]）
        carry = 0;

    // 1）不断往后拉2个链表
    while (l1 && l2) {
        resArr.push((l1.val + l2.val + carry) % 10);
        carry = parseInt((l1.val + l2.val + carry) / 10);
        
        l1 = l1.next;
        l2 = l2.next;
    }
    // 2）判断l1、l2 长度情况。谁长就继续“往后拉”谁
    let tmpLink = l1 ? l1 : l2;
    while (tmpLink) {
        resArr.push((tmpLink.val + carry) % 10);
        carry = parseInt((tmpLink.val + carry) / 10);
        tmpLink = tmpLink.next;
    }
    // 3）最后1位可能有进位 —— 需要继续放
    if (carry) {
        resArr.push(carry);
    }
    // 因为 两个非空 的链表，遍历 resArr 将相应位置上的值放到 resLink 即可
    // resLink 是返回的“链表头”，curLink 用于存放“遍历所取到的值”
    let resLink = curLink = new ListNode(resArr[0]),
        i = 1,
        l = resArr.length;
    while (i < l) {
        curLink.next = new ListNode(resArr[i]);
        curLink = curLink.next;
        i++;
    }

    return resLink;
};
```

### 3 方案3（方案2的优化版：不用 resArr 中间变量，直接存链表里、节约内存开销）
1)代码：
```js
var addTwoNumbers = function(l1, l2) {
    let resLink = curLink = null,
        // carry 是否有进位（其值范围一定是 [0, 1]）
        carry = 0;

    // 1）不断往后拉2个链表
    while (l1 && l2) {
        const tmpVal = (l1.val + l2.val + carry) % 10;
        carry = parseInt((l1.val + l2.val + carry) / 10);
        // resLink 为 null，需初始化！
        if (!resLink) {
            resLink = curLink = new ListNode(tmpVal);
        } else {
            curLink.next = new ListNode(tmpVal);
            curLink = curLink.next;
        }
        
        l1 = l1.next;
        l2 = l2.next;
    }
    // 2）判断l1、l2 长度情况。谁长就继续“往后拉”谁
    let tmpLink = l1 ? l1 : l2;
    while (tmpLink) {
        curLink.next = new ListNode((tmpLink.val + carry) % 10);
        curLink = curLink.next;
        carry = parseInt((tmpLink.val + carry) / 10);
        tmpLink = tmpLink.next;
    }
    // 3）最后1位可能有进位 —— 需要继续放
    if (carry) {
        curLink.next = new ListNode(carry);
        curLink = curLink.next;
    }
    
    return resLink;
};
```

### 4 方案4（递归）
1)代码：
```js
var addTwoNumbers = function(l1, l2) {
    // “一般递归的特点”：
    // 1 2种实现 —— dfs（深度优先搜索） 和 bfs（广度优先搜索）
    // 2 3个核心
    // 1）确定返回值得类型及其含义
    // 2）确定递归的出口条件及对应的值
    // 3）递归处理的函数体
    const dfs = (l1, l2, carry) => {
        // 其实可以简写成 if (!l1 && !l2 && !carry)。
        // 1）下面3行是递归出口
        if (l1 === null && l2 === null && carry === 0) {
            return null;
        }

        // 2）下面7-8行是递归处理的函数体
        // 此时必定是 l1、l2或carry中存在“真值”（即有 非null 或 非0 值）
        const val_1 = l1 ? l1.val : 0,
            val_2 = l2 ? l2.val : 0,
            next_1 = l1 ? l1.next : null,
            next_2 = l2 ? l2.next : null,
            sum = (val_1 + val_2 + carry);

        let resLink = new ListNode(sum % 10);
        // 边界：别漏了 parseInt ，别的语言也需可直接 sum/10 ！
        resLink.next = dfs(next_1, next_2, parseInt(sum/10));

        // “本次递归”的返回值
        return resLink;
    }

    return dfs(l1, l2, 0);
}
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