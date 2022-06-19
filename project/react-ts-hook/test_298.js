// 1
var greatestLetter = function(s = '') {
    const l = s.length;
    let resMap = s.split('').reduce((acc, cur) => {
        acc.set(cur, 1);
        return acc;
    }, new Map());
console.log(resMap);
    for (let i = (65 + 26); i >= 65; i--) {
        if (resMap.has(String.fromCodePoint(i)) && resMap.has(String.fromCodePoint(i + 32))) {
            return String.fromCodePoint(i);
        }
    }

    return '';
};


// 2
// 输入：num = 58, k = 9
// 输出：2
// 解释：
// 多重集 [9, 49] 满足题目条件，和为 58 且每个整数的个位数字是 9 。
// 另一个满足条件的多重集是 [19, 39] 。
// 可以证明 2 是满足题目条件的多重集的最小长度。

// num = 318, k = 9
// num = 10, k = 8

// 模拟法
var minimumNumbers = function(sum = 0, k = 0) {
    const mod = sum % 10;
    // 边界
    if (sum === 0) {
        return 0;
    }
    if (sum !== 0 && k === 0) {
        return -1;
    }

    for (let i = 1; (i * k) <= sum ; i++) {
        const tempMod = (i * k) % 10;
        if (tempMod === mod) {
            // sum -= (i * k);
            return i;
        }
    }

    return -1;
}



// 3
// 输入：s = "1001010", k = 5
// 输出：5
// 解释：s 中小于等于 5 的最长子序列是 "00010" ，对应的十进制数字是 2 。
// 注意 "00100" 和 "00101" 也是可行的最长子序列，十进制分别对应 4 和 5 。
// 最长子序列的长度为 5 ，所以返回 5 。

// 0000  2
// 4 - 2
// 00010

// 11111 1
var longestSubsequence = function(s = '', k = 0) {
    const l = s.length;
    // 边界
    if (parseInt(s, 2) <= k) {
        return l;
    }

    let zeroCharList = s.split('').filter(v => v === '0'),
        tempList = [];

    for (let i = l - 1; i >=0 ; i--) {
        tempList[i] = (l - 1 - i);
    }

    let i = l - 1;
    while ((zeroCharList.length === 0 || parseInt(zeroCharList.join(''), 2) <= k)
        && i >= 0
    ) {
        const l = zeroCharList.length;
        
        if (s[i] === '1') {
            zeroCharList.splice(l - tempList[i], 0, '1');
        }
        i--;
    }

    if (parseInt(zeroCharList.join(''), 2) <= k) {
        return zeroCharList.length;
    }

    return zeroCharList.length - 1;
};



// 4
// 输入：m = 3, n = 5, prices = [[1,4,2],[2,2,7],[2,1,3]]
// 输出：19
// 解释：上图展示了一个可行的方案。包括：
// - 2 块 2 x 2 的小木块，售出 2 * 7 = 14 元。
// - 1 块 2 x 1 的小木块，售出 1 * 3 = 3 元。
// - 1 块 1 x 4 的小木块，售出 1 * 2 = 2 元。
// 总共售出 14 + 3 + 2 = 19 元。
// 19 元是最多能得到的钱数。

// 贪心
var sellingWood = function(m = 0, n = 0, prices = []) {
    prices.sort((a, b) => {
        const [a_h, a_w, a_p] = a,
            [b_h, b_w, b_p] = b;
        
        return (b_p / (b_h * b_w)) - (a_p / (a_h * a_w));
    });

    // {x1, y1, x2, y2}
    let resList = [];

    // console.log(prices);
    // debugger

    for (let i = 0; i < l; i++) {
        const [h, w, p] = prices[i];
        
    }
    
};

const m = 4, n = 6, prices = [[3,2,10],[1,4,2],[4,1,3]];
sellingWood(m, n, prices);