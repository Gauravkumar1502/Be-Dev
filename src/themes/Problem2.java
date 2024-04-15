import java.util.Arrays;
import java.util.Scanner;
public class Problem2{
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummyHead = new ListNode(0);
        ListNode p = l1, q = l2, curr = dummyHead;
        int carry = 0;
        while (p != null || q != null) {
            int x = (p != null) ? p.val : 0;
            int y = (q != null) ? q.val : 0;
            int sum = carry + x + y;
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            if (p != null) p = p.next;
            if (q != null) q = q.next;
        }
        if (carry > 0) {
            curr.next = new ListNode(carry);
        }
        return dummyHead.next;
    }
    public static void main(String[] args) {
        try (Scanner reader = new Scanner(System.in)) {
        // read from console while there is input
            while (reader.hasNext()) {
                int[] list1 = Arrays.stream(reader.nextLine().replace("[", "").replace("]", "").split(",")).mapToInt(Integer::parseInt).toArray();
                int[] list2 = Arrays.stream(reader.nextLine().replace("[", "").replace("]", "").split(",")).mapToInt(Integer::parseInt).toArray();
                ListNode l1Root = new ListNode();
                ListNode l2Root = new ListNode();
                ListNode l1 = l1Root;
                ListNode l2 = l2Root;
                for (int ele : list1) {
                    l1Root.val = ele;
                    l1Root.next = new ListNode();
                    l1Root = l1Root.next;
                }
                for (int ele : list2) {
                    l2Root.val = ele;
                    l2Root.next = new ListNode();
                    l2Root = l2Root.next;
                }
                validateTestCase(l1, l2);
            }
        }
    }
    public static void validateTestCase(ListNode l1, ListNode l2) {
        ListNode expected = addTwoNumbers(l1, l2);
        ListNode userOutput = new Solution().addTwoNumbers(l1, l2);
        System.out.println("L1 = "+l1+"/nL2 = "+l2+"::"+expected+"::"+userOutput);
    }
}
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        ListNode temp = this;
        while (temp != null) {
            sb.append(temp.val).append(",");
            temp = temp.next;
        }
        sb.deleteCharAt(sb.length()-1);
        return sb.toString()+"]";
    }
}