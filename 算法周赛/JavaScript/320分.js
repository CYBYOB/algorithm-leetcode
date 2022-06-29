


// 2
// const num = parseInt(readline());
const num = 2147483647;
let resList = [-1, -1];

const isPrime = (num = 2) => {
    //取平方根
   let temp = parseInt(Math.sqrt(num))
   //循环判断
   for (let i = 2; i <= temp; i++) {
       if (num % i === 0) {
           return false;
       }
   }
   return true;
};

for (let i = 2; i <= Math.sqrt(num); i++) {
// for (let i = num - 1; i >= Math.sqrt(num); i--) {
    if (num % i === 0 && isPrime(i) & isPrime(num / i)) {
        resList = [i, num / i];
        break;
    }
}

console.log(resList.join(' '));



// 3
// 输入
// CBEFDA CBAEDF
// 输出
// ABDCEF


// // const [lastList, midList] = readline().split(' ');
// const lastList = 'CBEFAD',
//     midList = 'CBAEFD';

// const dfs = (curLevel = 0, lastList = [], midList = []) => {
//     console.log(curLevel, lastList, midList)
//     const lastListLength = lastList.length,
//         midListLength = midList.length;
    
//     // && ？
//     if (!lastListLength || !midListLength) {
        
//         return;
//     }

//     const curRootVal = lastList[lastListLength - 1],
//         rootIndexMid = midList.indexOf(curRootVal),
//         rootIndexLast = lastList.indexOf(midList[rootIndexMid - 1]);
    
//     if (!resList[curLevel]) {
//         resList[curLevel] = [];
//     }
//     resList[curLevel].push(curRootVal);
//     // 左、右
//     dfs(curLevel + 1, lastList.slice(0, rootIndexLast + 1), midList.slice(0, rootIndexMid));
//     dfs(curLevel + 1, lastList.slice(rootIndexLast + 1, lastListLength - 1), midList.slice(rootIndexMid + 1));
// }

// let curLevel = 0,
//     resList = [];
// dfs(curLevel, lastList, midList);

// let list = [];
// for (let i = 0; i < resList.length; i++) {
//     list.push(...resList[i]);
// }
// console.log(list);


// // CBEFDA CBAEDF
// // A    CBEFD   CB EDF
// // AB   C EFD   C  EDF