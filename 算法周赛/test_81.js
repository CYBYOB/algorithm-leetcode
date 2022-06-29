// 1
// 输入：s = "yo|uar|e**|b|e***au|tifu|l"
// 输出：5
// 解释：需要考虑的字符加粗加斜体后："yo|uar|e**|b|e***au|tifu|l" 。不在竖线对之间总共有 5 个星号。所以我们返回 5 。

var countAsterisks = function(s = '') {
    const l = s.length;
    let shuCount = 0,
        resCount = 0;

    for (let i = 0; i < l; i++) {
        if (s[i] === '*') {
            if (shuCount === 0) {
                console.log(i)
                resCount++;
            }
            // else if (shuCount === 1) {
            //     shuCount = 0;
            // }
        }
        else if (s[i] === '|') {
            if (shuCount === 0) {
                shuCount = 1;
            }
            else if (shuCount === 1) {
                shuCount = 0;
            }
        }
    }

    return resCount;
};

// const s = "yo|uar|e**|b|e***au|tifu|l",
// s = "|**|*|*|**||***||",
//     a = countAsterisks(s);
// debugger


// 2
var countPairs = function(n = 0, edges = []) {
    // 
    const dfs = (toVal = 0, tempMap = new Map()) => {
        for (let i = 0; i < edges.length; i++) {
            const [from, to] = edges[i];
            // tempMap.set(from, 1);
            // tempMap.set(to, 1);

            if (!totalMap.has(to) && toVal === from) {
                totalMap.set(from, 1);
                edges.splice(i, 1);
                i--;

                tempMap.set(from, 1);
                tempMap.set(to, 1);

                dfs(to, tempMap);
            }
        }

        return tempMap;
    };

    const l = edges.length;
    let totalMap = new Map(),
        resList = [];

    for (let i = 0; i < edges.length; i++) {
        let tempMap = new Map();
        const [from, to] = edges[i];
        totalMap.set(from, 1);

        tempMap.set(from, 1);
        tempMap.set(to, 1);

        // 
        edges.splice(i, 1);
        i--;

        // if (tempMap.has(from)) {
            // tempMap.set(from, 1);
            // tempMap.set(to, 1);
        // if (!totalMap.has(from)) {
            const dfsMap = dfs(to, tempMap);
            resList.push(dfsMap.size);
        // }
            // dfs(toVal, );
        // }
    }

    console.log(resList);
    return 0;
};

const n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]];
// const n = 3, edges = [[0,1],[0,2],[1,2]];
countPairs(n, edges);

// 3
var maximumXOR = function(nums) {

};


// 4


