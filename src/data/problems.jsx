const problems = [
  {
    id: 1,
    title: "Two Sum",
    description: `
        Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        
        You may assume that each input would have exactly one solution, and you may not use the same element twice.
        
        You can return the answer in any order.
      `,
    example: `
        Example:
        Input: nums = [2,7,11,15], target = 9
        Output: [0,1]
        Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
      `,
    leetCodeLink: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: 2,
    title: "Reverse Integer",
    description: `
        Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
      `,
    example: `
        Example:
        Input: x = 123
        Output: 321
      `,
    leetCodeLink: "https://leetcode.com/problems/reverse-integer/",
  },
  {
    id: 3,
    title: "Palindrome Number",
    description: `
          Given an integer x, return true if x is a palindrome, and false otherwise.
        `,
    example: `
          Example:
          Input: x = 121
          Output: true
        `,
    leetCodeLink: "https://leetcode.com/problems/palindrome-number/",
  },
  {
    id: 4,
    title: "Valid Parentheses",
    description: `
          Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
        `,
    example: `
          Example:
          Input: s = "()"
          Output: true
        `,
    leetCodeLink: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    id: 5,
    title: "Merge Two Sorted Lists",
    description: `
          You are given the heads of two sorted linked lists. Merge the two lists in a one sorted list.
        `,
    example: `
          Example:
          Input: list1 = [1,2,4], list2 = [1,3,4]
          Output: [1,1,2,3,4,4]
        `,
    leetCodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
  },
  {
    id: 6,
    title: "Remove Duplicates from Sorted Array",
    description: `
          Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.
        `,
    example: `
          Example:
          Input: nums = [1,1,2]
          Output: [1,2]
        `,
    leetCodeLink:
      "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
  },
  {
    id: 7,
    title: "Maximum Subarray",
    description: `
          Given an integer array nums, find the subarray with the largest sum, and return its sum.
        `,
    example: `
          Example:
          Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
          Output: 6
        `,
    leetCodeLink: "https://leetcode.com/problems/maximum-subarray/",
  },
  {
    id: 8,
    title: "Climbing Stairs",
    description: `
          You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
        `,
    example: `
          Example:
          Input: n = 2
          Output: 2
        `,
    leetCodeLink: "https://leetcode.com/problems/climbing-stairs/",
  },
  {
    id: 9,
    title: "Best Time to Buy and Sell Stock",
    description: `
          You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve.
        `,
    example: `
          Example:
          Input: prices = [7,1,5,3,6,4]
          Output: 5
        `,
    leetCodeLink:
      "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  },
  {
    id: 10,
    title: "Binary Search",
    description: `
          Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.
        `,
    example: `
          Example:
          Input: nums = [-1,0,3,5,9,12], target = 9
          Output: 4
        `,
    leetCodeLink: "https://leetcode.com/problems/binary-search/",
  },
  {
    id: 11,
    title: "Longest Substring Without Repeating Characters",
    description: `
          Given a string s, find the length of the longest substring without repeating characters.
        `,
    example: `
          Example:
          Input: s = "abcabcbb"
          Output: 3
          Explanation: The answer is "abc", with the length of 3.
        `,
    leetCodeLink:
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  {
    id: 12,
    title: "Container With Most Water",
    description: `
          Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). 
          n vertical lines are drawn such that the two endpoints of the line i are at (i, ai) and (i, 0). 
          Find two lines, which, together with the x-axis, forms a container that holds the most water.
        `,
    example: `
          Example:
          Input: height = [1,8,6,2,5,4,8,3,7]
          Output: 49
        `,
    leetCodeLink: "https://leetcode.com/problems/container-with-most-water/",
  },
  {
    id: 13,
    title: "3Sum",
    description: `
          Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, 
          and nums[i] + nums[j] + nums[k] == 0.
        `,
    example: `
          Example:
          Input: nums = [-1,0,1,2,-1,-4]
          Output: [[-1,-1,2],[-1,0,1]]
        `,
    leetCodeLink: "https://leetcode.com/problems/3sum/",
  },
  {
    id: 14,
    title: "Search in Rotated Sorted Array",
    description: `
          There is an integer array nums sorted in ascending order (with distinct values). 
          Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. 
          Given the array nums after the rotation and an integer target, return the index of target.
        `,
    example: `
          Example:
          Input: nums = [4,5,6,7,0,1,2], target = 0
          Output: 4
        `,
    leetCodeLink:
      "https://leetcode.com/problems/search-in-rotated-sorted-array/",
  },
  {
    id: 15,
    title: "Combination Sum",
    description: `
          Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.
        `,
    example: `
          Example:
          Input: candidates = [2,3,6,7], target = 7
          Output: [[2,2,3],[7]]
        `,
    leetCodeLink: "https://leetcode.com/problems/combination-sum/",
  },
  {
    id: 16,
    title: "Permutations",
    description: `
          Given an array nums of distinct integers, return all the possible permutations.
        `,
    example: `
          Example:
          Input: nums = [1,2,3]
          Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
        `,
    leetCodeLink: "https://leetcode.com/problems/permutations/",
  },
  {
    id: 17,
    title: "Rotate Image",
    description: `
          You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
        `,
    example: `
          Example:
          Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
          Output: [[7,4,1],[8,5,2],[9,6,3]]
        `,
    leetCodeLink: "https://leetcode.com/problems/rotate-image/",
  },
  {
    id: 18,
    title: "Group Anagrams",
    description: `
          Given an array of strings strs, group the anagrams together. You can return the answer in any order.
        `,
    example: `
          Example:
          Input: strs = ["eat","tea","tan","ate","nat","bat"]
          Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
        `,
    leetCodeLink: "https://leetcode.com/problems/group-anagrams/",
  },
  {
    id: 19,
    title: "Maximum Product Subarray",
    description: `
          Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.
        `,
    example: `
          Example:
          Input: nums = [2,3,-2,4]
          Output: 6
        `,
    leetCodeLink: "https://leetcode.com/problems/maximum-product-subarray/",
  },
  {
    id: 20,
    title: "Word Search",
    description: `
          Given an m x n grid of characters board and a string word, return true if word exists in the grid.
        `,
    example: `
          Example:
          Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
          Output: true
        `,
    leetCodeLink: "https://leetcode.com/problems/word-search/",
  },
  {
    id: 21,
    title: "Find Minimum in Rotated Sorted Array",
    description: `
      Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element in the array.
    `,
    example: `
      Example:
      Input: nums = [3,4,5,1,2]
      Output: 1
    `,
    leetCodeLink: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
  },
  {
    id: 22,
    title: "Unique Paths",
    description: `
      A robot is located at the top-left corner of a m x n grid. The robot can only move either down or right at any point in time. Find the number of unique paths to reach the bottom-right corner.
    `,
    example: `
      Example:
      Input: m = 3, n = 7
      Output: 28
    `,
    leetCodeLink: "https://leetcode.com/problems/unique-paths/",
  },
  {
    id: 23,
    title: "Jump Game",
    description: `
      You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Determine if you can reach the last index.
    `,
    example: `
      Example:
      Input: nums = [2,3,1,1,4]
      Output: true
    `,
    leetCodeLink: "https://leetcode.com/problems/jump-game/",
  },
  {
    id: 24,
    title: "Merge Intervals",
    description: `
      Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals.
    `,
    example: `
      Example:
      Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
      Output: [[1,6],[8,10],[15,18]]
    `,
    leetCodeLink: "https://leetcode.com/problems/merge-intervals/",
  },
  {
    id: 25,
    title: "Insert Interval",
    description: `
      You are given an array of non-overlapping intervals and a new interval. Insert the new interval into the intervals (merge if necessary).
    `,
    example: `
      Example:
      Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
      Output: [[1,5],[6,9]]
    `,
    leetCodeLink: "https://leetcode.com/problems/insert-interval/",
  },
  {
    id: 26,
    title: "Spiral Matrix",
    description: `
      Given an m x n matrix, return all elements of the matrix in spiral order.
    `,
    example: `
      Example:
      Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
      Output: [1,2,3,6,9,8,7,4,5]
    `,
    leetCodeLink: "https://leetcode.com/problems/spiral-matrix/",
  },
  {
    id: 27,
    title: "Set Matrix Zeroes",
    description: `
      Given an m x n integer matrix, if an element is 0, set its entire row and column to 0.
    `,
    example: `
      Example:
      Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
      Output: [[1,0,1],[0,0,0],[1,0,1]]
    `,
    leetCodeLink: "https://leetcode.com/problems/set-matrix-zeroes/",
  },
  {
    id: 28,
    title: "Rotate List",
    description: `
      Given the head of a linked list, rotate the list to the right by k places.
    `,
    example: `
      Example:
      Input: head = [1,2,3,4,5], k = 2
      Output: [4,5,1,2,3]
    `,
    leetCodeLink: "https://leetcode.com/problems/rotate-list/",
  },
  {
    id: 29,
    title: "Word Break",
    description: `
      Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
    `,
    example: `
      Example:
      Input: s = "leetcode", wordDict = ["leet","code"]
      Output: true
    `,
    leetCodeLink: "https://leetcode.com/problems/word-break/",
  },
  {
    id: 30,
    title: "Binary Tree Inorder Traversal",
    description: `
      Given the root of a binary tree, return the inorder traversal of its nodes' values.
    `,
    example: `
      Example:
      Input: root = [1,null,2,3]
      Output: [1,3,2]
    `,
    leetCodeLink: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
  }
];
export default problems;
