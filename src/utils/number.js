import moment from 'moment';

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

export function getGraphData(statements, filter) {
  let copyStatement = statements //structuredClone(statements)  // just refernce copy :P
  // filter logic starts
  if (filter.enable) {
    copyStatement = copyStatement.filter(statement => filter.bankStatements.includes(statement.fileName))
    copyStatement = copyStatement.map(statement => ({
      fileName: statement.fileName,
      data: statement.data.filter(data => {
        let shouldReturn = true;
        if (filter?.description?.length) {
          if (!filter.description.includes(data.Description)) shouldReturn = false;
        }
        if (filter.date.dateType !== "all") {
          if (filter.date.from && filter.date.to && shouldReturn) {
            const from = moment(filter.date.from);
            const to = moment(filter.date.to);
            const dataDate = moment(data.Date)
            if (dataDate.isSameOrAfter(from) && dataDate.isSameOrBefore(to)) {
            } else {
              shouldReturn = false;
            }
          }
        }
        return shouldReturn;
      })
    }))
  }
  // filter logic ends

  const expenseGroup = {};
  const incomeGroup = {};
  const recentIncome = [];
  const recentExpense = []

  for (let statement of copyStatement) {
    for (let data of statement.data) {
      if (data.Debit) {
        if (!expenseGroup[data.Description]) expenseGroup[data.Description] = 0;
        expenseGroup[data.Description] += !isNaN(Number(data.Debit)) ? Number(data.Debit) : 0;
        recentExpense.push(data)
      }
      if (data.Credit) {
        if (!incomeGroup[data.Description]) incomeGroup[data.Description] = 0;
        incomeGroup[data.Description] += !isNaN(Number(data.Credit)) ? Number(data.Credit) : 0;
        recentIncome.push(data)
      }
    }
  }

  let expenseArr = [];
  let incomeArr = [];

  for (let expGrp in expenseGroup) {
    expenseArr.push({ label: expGrp, value: Number(expenseGroup[expGrp]) })
  }
  expenseArr.sort((a, b) => b.value - a.value);

  for (let incGrp in incomeGroup) {
    incomeArr.push({ label: incGrp, value: Number(incomeGroup[incGrp]) })
  }
  incomeArr.sort((a, b) => b.value - a.value);



  return { expenseData: expenseArr, incomeData: incomeArr, recentExpense, recentIncome }
}

export function getTrendingGraphData(statements) {
  let copyStatement = statements //structuredClone(statements)  
  
  const expenseGroup = {};
  const incomeGroup = {};

  for (let statement of copyStatement) {
    for (let data of statement.data) {
      if (data.Debit) {
        if (!expenseGroup[data.Description]) expenseGroup[data.Description] = [];
        expenseGroup[data.Description].push(data);
      }
      if (data.Credit) {
        if (!incomeGroup[data.Description]) incomeGroup[data.Description] = [];
        incomeGroup[data.Description].push(data);
      }
    }
  }
 
  return {incomeData: incomeGroup, expenseData: expenseGroup}
}