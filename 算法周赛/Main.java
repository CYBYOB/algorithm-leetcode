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
        int n = Integer.parseInt(sc.nextLine());
        while (n > 0) {
            String[] strList = sc.nextLine().split(" ");
            int[] intList = new int[strList.length];
            for (int i = 0; i < strList.length; i++) {
                intList[i] = Integer.parseInt(strList[i]);
            }

            int a = intList[0],
                b = intList[1],
                c = intList[2],
                d = intList[3];
            int resC = d;
            // temp_c_3：3和1组队
            int temp_c_3 = Math.min(a, c);
            resC += temp_c_3;
            a -= temp_c_3;

            // temp_c_2：2和2组队
            int temp_c_2 = b / 2;
            resC += temp_c_2;
            b -= temp_c_2 * 2;

            // temp_c_2_1 ：2和1组队
            int temp_c_2_1 = Math.min(a / 2, b);
            resC += temp_c_2_1;

            System.out.println(resC);

            n--;
        }
    }
}
