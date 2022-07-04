// 1
// 给你字符串 key 和 message ，分别表示一个加密密钥和一段加密消息。解密 message 的步骤如下：

// 使用 key 中 26 个英文小写字母第一次出现的顺序作为替换表中的字母 顺序 。
// 将替换表与普通英文字母表对齐，形成对照表。
// 按照对照表 替换 message 中的每个字母。
// 空格 ' ' 保持不变。
// 例如，key = "happy boy"（实际的加密密钥会包含字母表中每个字母 至少一次），据此，可以得到部分对照表（'h' -> 'a'、'a' -> 'b'、'p' -> 'c'、'y' -> 'd'、'b' -> 'e'、'o' -> 'f'）。
// 返回解密后的消息。
var decodeMessage = function(key = '', message = '') {
    const set = [...new Set(key.split('').filter(v => v !== ' '))],
        l = set.length;
    let map = new Map();
    for (let i = 0; i < l; i++) {
        map.set(set[i], String.fromCharCode(97 + i));
    }
    map.set(' ', ' ')

    const m_l = message.length;
    let resStr = '';

    for (let i = 0; i < m_l; i++) {
        const tempChar = message[i];
        resStr += map.get(tempChar);
    }

    return resStr;
};

// const key = "the quick brown fox jumps over the lazy dog", message = "vkbs bs t suepuv",
//     resStr = decodeMessage(key, message);
// debugger



// 2
// 输入：m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
// 输出：[[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
// 解释：上图展示了链表中的整数在矩阵中是如何排布的。
// 注意，矩阵中剩下的空格用 -1 填充。
var spiralMatrix = function(m = 0, n = 0, head = null) {
    let i_t = 0,
        i_b = m - 1,
        j_l = 0,
        j_r = n - 1;
        c = m * n,
        resList = new Array(m).fill(-1).map(v => new Array(n).fill(-1));
    
    
    while (c) {
        // 4个方向
        for (let j = j_l; j <= j_r && c; j++) {
            // if (!head) {
            //     break;
            // }
            resList[i_t][j] = head?.val ?? -1;
             head = head?.next || null;
            c--;
        }
        i_t++;

        for (let i = i_t; i <= i_b && c; i++) {
            resList[i][j_r] = head?.val ?? -1;
             head = head?.next || null;
            c--;
        }
        j_r--;

        for (let j = j_r; j >= j_l && c; j--) {
            resList[i_b][j] = head?.val ?? -1;
             head = head?.next || null;
            c--;
        }
        i_b--;

        for (let i = i_b; i >= i_t && c; i--) {
            resList[i][j_l] = head?.val ?? -1;
            head = head?.next || null;
            c--;
        }
        j_l++;
    }

    return resList;    
};

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

const getNodeByList = (list = []) => {
    const l = list.length;
    let resNode = node = new ListNode(list[0]);

    for (let i = 1; i < l; i++) {
        node.next = new ListNode(list[i]);
        node = node.next;
    }

    return resNode;
}

// const m = 3, n = 5, list = [3,0,2,6,8,1,7,9,4,2,5,5,0], head = getNodeByList(list),
//     r = spiralMatrix(m, n, head);
// debugger

// 3
// 输入：n = 6, delay = 2, forget = 4
// 输出：5
// 解释：
// 第 1 天：假设第一个人叫 A 。（一个人知道秘密）
// 第 2 天：A 是唯一一个知道秘密的人。（一个人知道秘密）
// 第 3 天：A 把秘密分享给 B 。（两个人知道秘密）
// 第 4 天：A 把秘密分享给一个新的人 C 。（三个人知道秘密）
// 第 5 天：A 忘记了秘密，B 把秘密分享给一个新的人 D 。（三个人知道秘密）
// 第 6 天：B 把秘密分享给 E，C 把秘密分享给 F 。（五个人知道秘密）
const MOD = 1e9 + 7;
var peopleAwareOfSecret = function(n = 0, delay = 0, forget = 0) {
    let c = 1,
        m = new Map([
            [1, 1],
        ]);

    for (let i = 2; i <= n; i++) {
        for (const [key, val] of m) {
            if ((key + delay) <= i && (key + forget) > i) {
                // const tempC = (m.get(key) || 0) + 1;
                const tempC = m.get(key);
                c += tempC;
                c %= MOD;
                m.set(i, tempC);
            }
            if ((key + forget) <= i) {
                const tempC = m.get(key);
                c -= tempC;
                m.delete(key);
            }
        }
        // 二分？
        
        console.log(i, c, m);
    }

    return c % MOD;
};

// 1 1 2 3 3 5
// const n = 6, delay = 2, forget = 4,
const n = 4, delay = 1, forget = 3,
// const n = 684, delay = 18, forget = 496,
    c = peopleAwareOfSecret(n, delay, forget);
debugger


// 4




