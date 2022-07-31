

// 1
// 输入：nums = [1,5,0,3,5]
// 输出：3
// 解释：
// 第一步操作：选出 x = 1 ，之后 nums = [0,4,0,2,4] 。
// 第二步操作：选出 x = 2 ，之后 nums = [0,2,0,0,2] 。
// 第三步操作：选出 x = 2 ，之后 nums = [0,0,0,0,0] 。

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function(nums) {
    let resCount = 0;
    
    nums = [...new Set(nums.filter(v => v !== 0))];
    while (nums.length) {
        const first = nums.sort((a, b) => a - b)[0];
        nums =  [...new Set(nums.map(v => v - first).filter(v => v !== 0))];
        resCount++;
    }

    return resCount;
};
// const nums = [1,5,0,3,5],
const nums = [0],
    t_1 = minimumOperations(nums);
// debugger

// 2
// 输入：grades = [10,6,12,7,3,5]
// 输出：3
// 解释：下面是形成 3 个分组的一种可行方法：
// - 第 1 个分组的学生成绩为 grades = [12] ，总成绩：12 ，学生数：1
// - 第 2 个分组的学生成绩为 grades = [6,7] ，总成绩：6 + 7 = 13 ，学生数：2
// - 第 3 个分组的学生成绩为 grades = [10,3,5] ，总成绩：10 + 3 + 5 = 18 ，学生数：3 
// 可以证明无法形成超过 3 个分组。

/**
 * @param {number[]} grades
 * @return {number}
 */
var maximumGroups = function(grades) {
    const getSumByList = (list = []) => {
        const resSum = list.reduce((acc, cur) => acc += cur, 0);

        return resSum;
    };

    const l = grades.length;
    grades.sort((a, b) => a - b);
    let curLevel = 0,
        resList = [];
    
    for (let i = 0; i < l; i++) {
        const tempVal = grades[i];

        if (!resList[curLevel]) {
            resList[curLevel] = [];
        }

        if (resList[curLevel].length < curLevel) {
            resList[curLevel].push(tempVal);
        }
        else {
            curLevel++;
            resList[curLevel] = [tempVal];
        }
    }

    console.log(resList);
    // debugger

    const resListLength = resList.length;
    let resCount = 0;
    
    for (let i = 1; i < resListLength; i++) {
        const [pre, cur] = [resList[i - 1], resList[i]],
            preLength = pre.length,
            curLength = cur.length,
            preSum = getSumByList(pre),
            curSum = getSumByList(cur);
        if (preLength < curLength && preSum < curSum) {
            resCount++;
        }
    }

    return resCount;

    
    // grades.reduce((acc, cur) => {
    //     const l = acc.length,
    //         [pre = [], cur = []] = [acc[l - 2], acc[l - 1]],;
    //     if (pre.length)
    //     // if (!acc.length) {
    //     //     acc.push(cur);
    //     // }

    //     return acc;
    // }, []);
};
// [3]
// [5,6]
// [7, 10, 12]
const grades = [10,6,12,7,3,5],
// const grades = [8,8],
    t_2 = maximumGroups(grades);
// debugger

// [8]
// [8]


// 3
/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
// 输入：edges = [2,2,3,-1], node1 = 0, node2 = 1
// 输出：2
// 解释：从节点 0 到节点 2 的距离为 1 ，从节点 1 到节点 2 的距离为 1 。
// 两个距离的较大值为 1 。我们无法得到一个比 1 更小的较大值，所以我们返回节点 2 。
var closestMeetingNode = function(edges, node1, node2) {
    const l = edges.length;
    let resList = new Array(l).fill(-1).map(v => Array(l).fill(-1));

    for (let i = 0; i < l; i++) {
        const tempVal = edges[i];
        if (edges[i] !== -1) {
            resList[i][tempVal] = 1;
        }
    }

    // const getMap = (curNode) => {
    //     let resMap = new Map([
    //         curNode, 0
    //     ]);
        
    //     while (edges[])
    //     return resMap;
    // }
    // const l = edges.length;
    // let m_1 = getMap(node1);

    
    // const getMapByList = (list = []) => {
    //     const l = list.length;
        
    // };

    // const map = getMapByList(edges),

};
const edges = [2,2,3,-1], node1 = 0, node2 = 1,
    t_3 = closestMeetingNode(edges, node1, node2);
debugger



// 4



