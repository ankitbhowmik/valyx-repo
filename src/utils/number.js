export const humanizeNumber = (num) => {
    if (!isNaN(num)) {
      let absNum = Math.abs(num);
      let magnitudes = [
        { name: "crore", value: 1e8 },
        { name: "lakh", value: 1e5 },
        { name: "thousand", value: 1e3 },
        { name: "", value: 1 },
      ];
  
      for (let magnitude of magnitudes) {
        if (absNum >= magnitude.value) {
          let factor = absNum / magnitude.value;
          let formattedNum = factor.toFixed(2);
          let suffix = magnitude.name;
  
          if (factor > 1000) {
            formattedNum = (factor / 1000).toFixed(2) + " K";
          }
  
          return `${formattedNum} ${suffix}`;
        }
      }
    } else {
      return "Invalid number";
    }
  }