

// 输入：brackets = [[3,50],[7,10],[12,25]], income = 10
// 输出：2.65000
// 解释：
// 前 $3 的税率为 50% 。需要支付税款 $3 * 50% = $1.50 。
// 接下来 $7 - $3 = $4 的税率为 10% 。需要支付税款 $4 * 10% = $0.40 。
// 最后 $10 - $7 = $3 的税率为 25% 。需要支付税款 $3 * 25% = $0.75 。
// 需要支付的税款总计 $1.50 + $0.40 + $0.75 = $2.65 。
// 1
var calculateTax = function(brackets = [], income = 0) {
    brackets.unshift([0, 0]);
    const l = brackets.length;
    let resVal = 0;

    for (let i = 0; i < l - 1; i++) {
        const [val_l, percent_l] = brackets[i],
            [val_r, percent_r] = brackets[i + 1];;
        if (val_r <= income) {
            resVal += ((val_r - val_l) * percent_r);
        }
        else {
            resVal += ((income - val_l) * percent_r);
            break;
        }
    }
console.log(resVal / 100);
    return resVal / 100;
};


// 2 “暴力 - 枚举法”。dp？
// 状态定义：dp[row][col] = val
// 状态转移：dp[i][j] = Math.min() for
var minPathCost = function(grid = [], moveCost = []) {
    const m = grid.length,
        n = grid[0].length,
        moveCostLength = moveCost.length;
    let dp = new Array(m).fill([]).map(v => new Array(n).fill(0));
    // 初始化
    for (let i = 0; i < n; i++) {
        dp[0][i] = grid[0][i];
    }

    for (let i = 1; i < m; i++) {
        const gridList = grid[i - 1];
            // gridListLength = gridList.length;

        for (let k = 0; k < n; k++) {
            let tempSum = Number.POSITIVE_INFINITY;
            for (let j = 0; j < n; j++) {
                const curSum = dp[i - 1][j] + ((moveCost[grid[i - 1][j]] && moveCost[grid[i - 1][j]][k]) || Number.POSITIVE_INFINITY);
                tempSum = Math.min(tempSum, curSum);
            }
            dp[i][k] = (tempSum + grid[i][k]);
        }
    }

    return Math.min(...dp[m - 1]);
};

const grid = [[28,35,29,5,13,17,18,23,14],[30,15,12,27,2,26,25,19,7],[1,16,34,21,9,3,20,24,8],[4,33,22,11,31,0,6,10,32]],
    moveCost = [[87,46,11,33,55,26,26,56,23],[77,56,72,49,35,18,37,66,37],[54,40,62,1,64,49,95,81,77],[80,7,76,71,91,67,75,84,52],[65,11,13,15,9,34,10,98,20],[1,95,100,61,33,47,28,100,44],[39,56,94,7,64,91,66,34,70],[37,99,62,7,23,78,74,89,97],[84,41,63,42,84,15,46,31,11],[60,36,27,25,37,18,4,90,43],[35,83,90,37,91,27,61,99,53],[85,2,98,99,67,70,38,91,68],[66,46,7,99,26,81,95,51,51],[41,96,66,84,61,73,78,28,63],[38,34,49,55,35,29,93,5,28],[3,30,80,20,23,10,93,40,33],[8,86,47,15,45,84,47,19,58],[72,5,76,82,60,50,13,74,38],[4,8,25,38,29,4,60,81,21],[65,50,74,32,9,47,71,55,14],[90,30,92,51,45,51,4,85,22],[30,56,1,45,63,72,91,73,60],[51,61,53,49,44,99,11,5,3],[24,54,91,11,5,30,50,89,44],[87,97,46,92,93,41,64,73,15],[94,76,90,80,30,9,88,8,33],[50,34,4,63,49,90,46,55,16],[10,46,80,21,97,69,70,85,31],[10,66,74,43,65,45,85,34,91],[82,26,77,10,2,5,89,39,4],[80,70,89,73,54,61,100,89,23],[30,66,80,51,3,34,92,100,63],[74,15,4,33,37,3,87,76,92],[44,43,77,99,27,1,23,10,8],[8,74,17,35,31,84,97,98,34],[99,9,28,43,55,39,93,64,93]]

// const grid = [[5,3],[4,0],[2,1]],
//     moveCost = [[9,8],[1,5],[10,12],[18,6],[2,4],[14,3]]
minPathCost(grid, moveCost)


// 3
var distributeCookies = function(cookies = [], k = 0) {
    const l = cookies.length;
    // 排序
    cookies.sort((a, b) => a - b);


};

const cookies = [8,15,10,20,8],
    k = 2;
distributeCookies(cookies, k)


// 4
// 输入：ideas = ["coffee","donuts","time","toffee"]
// 输出：6
// 解释：下面列出一些有效的选择方案：
// - ("coffee", "donuts")：对应的公司名字是 "doffee conuts" 。
// - ("donuts", "coffee")：对应的公司名字是 "conuts doffee" 。
// - ("donuts", "time")：对应的公司名字是 "tonuts dime" 。
// - ("donuts", "toffee")：对应的公司名字是 "tonuts doffee" 。
// - ("time", "donuts")：对应的公司名字是 "dime tonuts" 。
// - ("toffee", "donuts")：对应的公司名字是 "doffee tonuts" 。
// 因此，总共有 6 个不同的公司名字。

// 下面列出一些无效的选择方案：
// - ("coffee", "time")：在原数组中存在交换后形成的名字 "toffee" 。
// - ("time", "toffee")：在原数组中存在交换后形成的两个名字。
// - ("coffee", "toffee")：在原数组中存在交换后形成的两个名字。

var distinctNames = function(ideas = []) {
    const getMapByList = (list = []) => {
        const l = list.length;
        let resMap = new Map();

        for (let i = 0; i < l; i++) {
            resMap.set(list[i], 1);
        }

        return resMap;
    };

    const l = ideas.length;
    let tempMap = getMapByList(ideas),
        resMap = new Map();

    ideas.sort((a, b) => a - b);

    for (let i = 0; i < l; i++) {
        const tempChar = ideas[i][0];

        // 二分
        let left = i,
            right = l - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2),
                midChar = ideas[mid][0];
            
            if (midChar > tempChar) {
                right = mid - 1;
            }
            else {
                while (left + 1 < l && ideas[left + 1][0] === tempChar) {
                    left++;
                }
                break;
            }
        }

        for (let j = left; j < l; j++) {
            const ideaA = ideas[j][0] + ideas[i].slice(1),
                ideaB = ideas[i][0] + ideas[j].slice(1),
                mergedStrA = [ideaA, ideaB].join(' '),
                mergedStrB = [ideaB, ideaA].join(' ');
            
            if (!tempMap.has(ideaA) && !tempMap.has(ideaB)) {
                if (!resMap.has(mergedStrA)) {
                    resMap.set(mergedStrA, 1);
                }
                if (!resMap.has(mergedStrB)) {
                    resMap.set(mergedStrB, 1);
                }
            }
        }
    }

    return resMap.size;
};

const ideas = ["coffee","donuts","time","toffee"]

distinctNames(ideas);
