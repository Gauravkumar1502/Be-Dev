import java.util.*;
public class Problem1{
                public static int[] twoSum(int[] nums, int target) {
                    Map<Integer, Integer> map = new HashMap<>();
                    for (int i = 0; i < nums.length; i++) {
                        int complement = target - nums[i];
                        if (map.containsKey(complement)) {
                            return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException(\"No two sum solution\");
    }
    public static void main(String[] args) {
                    try (Scanner reader = new Scanner(System.in)) {
                        // read from console while there is input
                        while (reader.hasNext()) {
                            int[] nums = Arrays.stream(reader.nextLine().replace(\"[\", \"\").replace(\"]\", \"\").split(\",\")).mapToInt(Integer::parseInt).toArray();
                int target = Integer.parseInt(reader.nextLine());
                validateTestCase(nums, target);
            }
        }
    }
    public static void validateTestCase(int[] nums, int target) {
                    int[] expected = twoSum(nums, target);
                    int[] userOutput = new Solution().twoSum(nums, target);
                    System.out.println((\"Nums= \"+Arrays.toString(nums)+\"/nTarget= \"+target) + \"::\" + Arrays.toString(userOutput) + \"::\" + Arrays.toString(expected));
    }
}