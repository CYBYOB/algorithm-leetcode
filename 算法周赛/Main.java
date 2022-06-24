package 算法周赛;

import java.util.*;
import java.util.stream.Collectors;
import java.util.HashMap;
// 题2
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = Integer.parseInt(sc.nextLine());
        HashMap<String, String> mapA = new HashMap<String, String>();
        HashMap<String, String> mapB = new HashMap<String, String>();
        
        while (N > 0) {
            String[] str = sc.nextLine().split(" ");
            String a = str[0],
                b = str[1];
            
            // 注：别抄错了（特别是 A、B、a、b 字符）~
            mapA.put(a, b);
            mapB.put(b, a);

            N--;
        }

        // 注：别抄错了（特别是 A、B、a、b 字符）~
        for(String key : mapB.keySet()) {
            if (mapA.get(key) == null) {
                System.out.println(Integer.parseInt(key));
                break;
            }
        }
    }
}



// public class Main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         String[] strList = sc.nextLine().split(" ");
//         List<List<Integer>> hList = new ArrayList<List<Integer>>();
//         // HashMap<String, String> map = new HashMap<String, String>();
//         int W = Integer.parseInt(strList[0]),
//             L = Integer.parseInt(strList[1]);
//         int resCount = 0,
//             tempCount = 0;
        
//         int i = 0,
//             j = 0;
//         while (i < L) {
//             String[] tempList = sc.nextLine().split(" ");

//             for (j = 0; j < tempList.length; j++) {
//                 hList.get(i).set(j, Integer.parseInt(tempList[j]));
//             }

//             i++;
//         }

//         System.out.println(hList);

//         for (i = 0; i < L; i++) {
//             for (j = 0; j < W; j++) {
//                 int tempVal = hList.get(i).get(j);
//                 if (tempVal > 0) {
//                     tempCount = tempVal;
//                     tempCount = dfs(i, j, L, W, tempCount);
//                 }
//                 // if (hList)
//             }
//         }
//     }
//     private static int dfs(int i, int j, int L, int W, int tempCount) {
//         if (i < 0 || i >= L) {
//             return tempCount;
//         }
//         if (j < 0 || j >= W) {
//             return tempCount;
//         }

//         dfs(i - 1, j, L, W, tempCount);
//         return tempCount;
//     }
// }





// 题1
// public class Main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         String str = sc.nextLine();
//         int l = str.length();
//         List<Character> dList = new ArrayList<Character>();
//         List<Character> cList = new ArrayList<Character>();

//         for (int i = 0; i < l; i++) {
//             char c = str.charAt(i);
//             if (('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z')) {
//                 cList.add(c);
//             }
//             else if (('0' <= c && c <= '9')) {
//                 dList.add(c);
//             }
//         }

//         // 升序
//         Collections.reverse(dList);

//         cList.sort(new Comparator<Character>() {
//             public int compare(Character a, Character b) {
//                 return a - b;
//             }
//         });

        // // 输出
        // int dIndex = 0,
        //     cIndex = 0;
//         String resStr = "";
//         for (int i = 0; i < l; i++) {
//             char c = str.charAt(i);
//             if (('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z')) {
//                 resStr += cList.get(cIndex);
//                 cIndex++;
//             }
//             else if (('0' <= c && c <= '9')) {
//                 resStr += dList.get(dIndex);
//                 dIndex++;
//             }
//             else {
//                 resStr += c;
//             }
//         }

//         System.out.println(resStr);
//         // for (Integer v : resList) {
//         //     System.out.println(v);
//         // }
//     }
// }


// 数组技巧
// List<Integer> resList = new ArrayList<Integer>();
// resList.add(xx);
// 排序：
// resList.sort(new Comparator<Integer>() {
//     public int compare(Integer a, Integer b) {
//         return a - b;
//     }
// });



// import java.util.*;
// import java.util.stream.Collectors;

// public class Main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         Integer count = Integer.parseInt(sc.nextLine()),
//             i = 0;
//         List<Integer> resList = new ArrayList<Integer>();

//         while (i < count) {
//             Integer tempVal = Integer.parseInt(sc.nextLine());
//             resList.add(tempVal);
//             i++;
//         }

//         // 去重
//         resList = resList.stream().distinct().collect(Collectors.toList());
//         // 排序
//         resList.sort(new Comparator<Integer>() {
//             public int compare(Integer a, Integer b) {
//                 return a - b;
//             }
//         });
//         // 输出
//         for (Integer v : resList) {
//             System.out.println(v);
//         }
//     }
// }


// package 算法周赛;

// import java.util.Scanner;
 
// public class Main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         String str = sc.nextLine();
//         String[] s = str.split(" "); //正则表达式实用性更强( str.split("\\s+"))
//         int length = s[s.length - 1].length();
//         System.out.println(length);
//     }
// }