package 算法周赛;

// java 
// 0）导包：
// import java.util.*;
// import java.util.stream.Collectors;
// import java.util.HashMap;

// 1）读取：
// Scanner sc = new Scanner(System.in);
//     while(sc.hasNextLine()){
//         String str = sc.nextLine();
//     }
// }

// 2）输出：
// System.out.println(count + "");


// 题1
import java.io.IOException;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int t = Integer.parseInt(sc.nextLine());
        while (t > 0) {
            String str= sc.nextLine();
            int l = str.length();
            boolean isPrint = false;
            
            for (int i = 0; i < l; i++) {
                int valI = Integer.parseInt(str.charAt(i) + "");
                if (0 <= valI && valI <= 9) {
                    String s = str.charAt(i) + "";
                    int j = i + 1;
                    while (Character.isDigit(str.charAt(j))) {
                        s += str.charAt(j);
                        j++;
                    }
                    i = j;

                    
                    
                    if (s.length() >= 3) {
                        int start = Integer.parseInt(s.charAt(0) + "");
                        boolean flag = true;
                        for (int ii = 1; ii < s.length(); ii++) {
                            if (start + 1 == Integer.parseInt(s.charAt(ii) + "")) {
                                start++;
                            }
                            else {
                                flag = false;
                                break;
                            }
                        }

                        if (flag) {
                            System.out.println("yes");
                            isPrint = true;
                            continue;
                        }

                        flag = true;
                        start = Integer.parseInt(s.charAt(0) + "");
                        for (int ii = 1; ii < s.length(); ii++) {
                            if (start - 1 == Integer.parseInt(s.charAt(ii) + "")) {
                                start--;
                            }
                            else {
                                flag = false;
                                break;
                            }
                        }

                        if (flag) {
                            System.out.println("yes");
                            isPrint = true;
                            continue;
                        }
                    }
                }
            }
            if (!isPrint) {
                System.out.println("no");
            }
            t--;
        }
    }
}
 

// import java.io.IOException;
// import java.util.*;

// public class Main {
//     public static void main(String[] args) throws IOException {
//         Scanner sc = new Scanner(System.in);

//     }
// }



// public class Main {
//     public static void main(String[] args) throws IOException {
//         Scanner sc = new Scanner(System.in);
//         String[] arr = {"", ""};
//         arr[0].sub
//         while(sc.hasNextLine()){
//             String str = sc.nextLine();
//             int count = 0;
//             for(int i = str.length() - 1; i >= 2 ; i-- ){
//                 char ch = str.charAt(i);
//                 int num = ch >= '0' && ch <='9' ?  ch - '0' : (ch - 'A' + 10);
//                 count += num * Math.pow(16, str.length() - i - 1) ;  
//             }
//             System.out.println(count);
//         }
//     }
// }


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