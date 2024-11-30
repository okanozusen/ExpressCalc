function calculateMean(nums) {
    if (nums.length === 0) return 0;
    return nums.reduce((sum, num) => sum + num, 0) / nums.length;
  }
  
  function calculateMedian(nums) {
    if (nums.length === 0) return 0;
    nums.sort((a, b) => a - b);
    const mid = Math.floor(nums.length / 2);
    return nums.length % 2 === 0 ? (nums[mid - 1] + nums[mid]) / 2 : nums[mid];
  }
  
  function calculateMode(nums) {
    const frequency = {};
    let maxFreq = 0;
    let mode = [];
  
    nums.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) {
        maxFreq = frequency[num];
      }
    });
  
    for (let num in frequency) {
      if (frequency[num] === maxFreq) {
        mode.push(Number(num));
      }
    }
  
    return mode.length === 1 ? mode[0] : mode;
  }
  
  module.exports = { calculateMean, calculateMedian, calculateMode };
  