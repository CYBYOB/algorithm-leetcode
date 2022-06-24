// 牛客的输入、输出处理模板

console.log(1111)

console.log(1)

// const readline = () => 'A Famous Saying: Much Ado About Nothing (2012/8).';
// let str = readline(),
//     strList = str.split(''),
//     l = strList.length,
//     resList = [];

// for (let i = 0; i < l; i++) {
//     const tempChar = str[i],
//         tempCharLow = tempChar.toLowerCase();
//     if ('a'<= tempCharLow && tempCharLow <= 'z') {
//         resList.push(tempChar);
//     }
// }

// print(resList)
// // 冒泡 或 其他稳定的排序
// for (let i = 0; i < resList.length - 1; i++) {
//     for (let j = i + 1; j < resList.length; j++) {
//         const a = resList[i],
//             b = resList[j];
//         // const [a, b] = [resList[i], resList[j]];
//         // 
//         if (a.toLowerCase()  > b.toLowerCase()) {
//             const t = a;
//             resList[i] = b;
//             resList[j] = t;
//         }
//     }
// }
// print(resList)

// // resList.sort((a, b) => a.toLowerCase() === b.toLowerCase() ? 1 : a.toLowerCase() - b.toLowerCase());

// let index = 0,
//     resStr = '';
// for (let i = 0; i < l; i++) {
//     const tempChar = str[i],
//         tempCharLow = tempChar.toLowerCase();
//     if ('a'<= tempCharLow && tempCharLow <= 'z') {
//         resStr += resList[index];
//         index++;
//     }
//     else {
//         resStr += tempChar;
//     }
// }

// print(resStr);



// // 牛客的输入、输出处理模板
// // 09：44 - 09：55

// // const readline = () => "A10;S20;W10;D30;X;A1A;B10A11;;A10;";
// // const strList = readline().split(';');

// const getIsNotDuplicate = (str = '') => {
//     const l = str.length;
//     let resFlag = true;

//     for (let i = 0; i < l - 2; i++) {
//         const tempStr = str.slice(i, i + 3);
//         if (str.slice(i + 3).indexOf(tempStr) !== -1) {
//             resFlag = false;
//             break;
//         }
//     }

//     return resFlag;
// };

// while (str = readline()) {
// // while (true) {
// //     str = "398h$720CD0h&7f9~A403mex~lu#$*0+0CD0";
//     const l = str.length;
//     let lChar = false,
//         uChar = false,
//         dChar = false,
//         oChar = false
//         isNotDuplicate = false;
    
//     for (let i = 0; i < l; i++) {
//         const tempChar = str[i];
//         if ('a' <= tempChar && tempChar <= 'z') {
//             lChar = true;
//         }
//         else if ('A' <= tempChar && tempChar <= 'Z') {
//             uChar = true;
//         }
//         else if ('0' <= tempChar && tempChar <= '9') {
//             dChar = true;
//         }
//         else {
//             oChar = true;
//         }
//     }

//     isNotDuplicate = getIsNotDuplicate(str);

//     const tempList = [lChar, uChar, dChar, oChar].filter(v => v);
//     const resFalg = (str.length > 8) && (tempList.length >= 3) && (isNotDuplicate);
//     print(resFalg ? 'OK' : 'NG');
// }












// // 牛客的输入、输出处理模板
// // 09：44 - 09：55

// // const readline = () => "A10;S20;W10;D30;X;A1A;B10A11;;A10;";
// const strList = readline().split(';');

// // return 
// print()



// // 牛客的输入、输出处理模板
// // 09：44 - 09：55
// const resMap = new Map([
//     ['W', 1],
//     ['S', 1],
//     ['A', 1],
//     ['D', 1],
// ]);
// const isValid = (str = '') => {
//     const [firstChar, restStr] = [str[0], str.slice(1)];
//     let resFlag = true;

//     if (!resMap.has(firstChar) || !(parseInt(restStr) + '' === restStr)) {
//         resFlag = false;
//     }

//     return resFlag;
// };

// // const readline = () => "A10;S20;W10;D30;X;A1A;B10A11;;A10;";
// const strList = readline().split(';');
// const resStr = strList.reduce((acc, cur) => {
//     if (isValid(cur)) {
//         const [firstChar, restStr] = [cur[0], cur.slice(1)],
//             tempVal = parseInt(restStr);
//         console.log(cur);
        
//         if (firstChar === 'W') {
//             acc[1] += tempVal;
//         }
//         else if (firstChar === 'S') {
//             acc[1] -= tempVal;
//         }
//         else if (firstChar === 'A') {
//             acc[0] -= tempVal;
//         }
//         else if (firstChar === 'D') {
//             acc[0] += tempVal;
//         }
//     }
//     return acc;
// }, [0, 0]).join(',');

// // return resStr
// print(resStr)





// while (str = readline()) {
//     str = str.split(' ');

//     var a = parseInt(lines[0]);
//     var b = parseInt(lines[1]);

//     print(a + b);
// }