

// 输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
// 输出：false
// 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。

// 方案1 “自己。”。
// 用时：18：13 - 
var canFinish = function(numCourses, prerequisites) {
    const getMapByList = (list = []) => {
        const l = list.length;
        let resMap = new Map();
        
        for (let i = 0; i < l; i++) {
            if (!resMap.has(list[i][0])) {
                resMap.set(list[i][0], [list[i][1]]);
            }
            else {
                resMap.get(list[i][0]).push(list[i][1]);
            }
        }

        return resMap;
    };

    // 预处理：
    const resMap = getMapByList(prerequisites);
    const l = prerequisites.length;
    
    // 边界：
    if (l === 0) {
        return true;
    }

    let map_1 = new Map(),
        list = [prerequisites[0][1]],
        resFlag = true;
        
    map_1.set(prerequisites[0][0], 1);
    // map_2.set(prerequisites[0][1], 1);

    while (list.length !== 0) {
        const tempVal = list.shift();
        if (map_1.has(tempVal)) {
            resFlag = false;
            break;
        }
        else {
            map_1.set(tempVal, 1);
            // 注：resMap.get(tempVal) 可能为 undefined ！
            list.push(...(resMap.get(tempVal) || []));
        }
    }

    return resFlag;
};