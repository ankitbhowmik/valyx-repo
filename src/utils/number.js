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

export function calculateSpents(statements) {
  let income = 0;
  let expense = 0;
  for (let statement of statements) {
    for (let data of statement.data) {
      if (data.Debit) {
        expense += !isNaN(Number(data.Debit)) ? Number(data.Debit) : 0;
      }
      if (data.Credit) {
        income += !isNaN(Number(data.Credit)) ? Number(data.Credit) : 0;
      }
    }
  }

  return { income, expense }
}

export function getGraphData(statements){
  const expenseGroup = {};
  const incomeGroup = {};

  for (let statement of statements) {
    for (let data of statement.data) {
      if (data.Debit) {
        if(!expenseGroup[data.Description]) expenseGroup[data.Description] = 0;
        expenseGroup[data.Description] += !isNaN(Number(data.Debit)) ? Number(data.Debit) : 0;
      }
      if (data.Credit) {
        if(!incomeGroup[data.Description]) incomeGroup[data.Description] = 0;
        incomeGroup[data.Description] += !isNaN(Number(data.Credit)) ? Number(data.Credit) : 0;
      }
    }
  }

  let expenseArr = [];
  let incomeArr = [];

  for(let expGrp in expenseGroup){
    expenseArr.push({label: expGrp, value: Number(expenseGroup[expGrp])})
  }
  expenseArr.sort((a,b)=>b.value - a.value );

  for(let incGrp in incomeGroup) {
    incomeArr.push({label: incGrp, value: Number(incomeGroup[incGrp])})
  }
  incomeArr.sort((a,b)=>b.value - a.value );
  return {expenseData: expenseArr, incomeData: incomeArr}
}
