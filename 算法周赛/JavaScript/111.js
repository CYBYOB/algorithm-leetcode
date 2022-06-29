// 1

const list = [
    [0, 0],
    [1, 2],
    [3, 1],
    [2, -1],
],
l = list.length;
let curIndex = 0,
    curList = [],
    resCount = 0;

const isValid = (curList = []) => {
    const list = [
        [0, 1, 2, 3],
        [0, 1, 3, 2],
        [0, 2, 1, 3],
        [0, 2, 3, 1],
        // ...
    ]
    
    for (let i = 0; i < list.length; i++) {
        
    }
};

const dfs = (curIndex = 0, curList = []) => {
    if (curIndex >= l) {
        return;
    }

    if (curList.length === 4) {
        if (isValid(curList)) {
            resCount++;
        }
        return;
    }

    for (let i = curIndex; i < l; i++) {
        curList.push(list[i]);
        dfs(i + 1, curList);
        
        curList.pop();
        dfs(i + 1, curList);
    }
};

dfs(curIndex, curList);

console.log(resCount);