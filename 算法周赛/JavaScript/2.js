
// 1

const solve_1 = (M = 1) => {
    if (M === 1 || M === 2) {
        return 1;
    }

    // return solve(M - 1) + solve(M - 2);
    let pre = 1,
        cur = 1,
        i = 0;

    while (i < M) {
        
        i++;
    }
    
    
    // for (let i = 2; i < M; i++) {
    //     [next, cur, pre] = [pre + cur, cur];
    // }

    // return cur;
};

// const t_2 = solve_1(4);
// debugger


const solve_2 = (M = 1) => {
    const dfs = (x = 1) => {
        
    };

    if (M === 1 || M === 2) {
        return 1;
    }

    return solve_2(M - 1) + solve_2(M - 2);
};
const t_2 = solve_1(4);
debugger



// 2



// 3


