// 1
var checkXMatrix = function(grid = []) {
    const l =grid.length;
    let resFlag = true;

    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l; j++) {
            // 3-0 2-1
            if ((i === j) || (i + j === l - 1)) {
                if (grid[i][j] === 0) {
                    // console.log(i, j, grid[i][j]);
                    return false;
                }
            }
            else {
                if (grid[i][j] !== 0) {
                    // console.log(i, j, grid[i][j]);
                    return false;
                }
            }
        }
    }

    return resFlag;
};

// const grid = [[2,0,0,1],[0,3,1,0],[0,5,2,0],[4,0,0,2]],
//     resFlag = checkXMatrix(grid);
// console.log(resFlag);


// 2
// 输入：n = 2
// 输出：9
// 解释：如上图所示，共有 9 种可能的放置方式。

//1 1*2 + 1*2
//2 1*3 + 1*3 + 1*3
//3 
// dp[i][0]、dp[i][1]
var countHousePlacements = function(n = 1) {
    let dp = new Array(n).fill(0).map(v => new Array(2).fill(0));
    dp[0][0] = 1;
    dp[0][1] = 1;

    for (let i = 1; i < n; i++) {
        dp[i][0] = (dp[i - 1][0] + dp[i - 1][1]);
        dp[i][1] = (dp[i - 1][0]);
    }

    const count = (dp[n - 1][0] + dp[n - 1][1]),
        // resVal = Math.pow(count, 2) % (1e9 + 7);
        resVal = ((count % (1e9 + 7))^2) % (1e9 + 7)
    debugger
    return resVal;
};
// 2 3 5 8 13 21
const n = 1000,
    resVal = countHousePlacements(n);



// 3



// 4




