import React, {memo, useCallback, useMemo} from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { humanizeNumber } from '../../utils/number';

const StyledText = styled('text')(({ theme }) => ({
  fill: "white",
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const IncomeExpensePie = ({incomeData, expenseData, selectedTab}) => {
  let data = selectedTab === "expense" ? expenseData : incomeData;
  const modifyData = useCallback((data)=>{
    let othersExpense = 0;
    let newData = data
    if(data.length > 5) {
      for(let i=5; i<data.length; i++){
        othersExpense += data[i].value
      }
      newData = newData.slice(0, 5);
      newData.push({label: "Others", value: othersExpense})
    }
    return newData;
  }, [])
  
  data = modifyData(data);
  let centerValue = data.reduce((acc, item) => acc + item.value, 0)


  return (
    <PieChart
      width={400}
      height={300}
      margin={{ top: 10, bottom: 100, left: 50, right:50 }}
      series={[{ data, innerRadius: 80, cornerRadius: 5, paddingAngle: 3 }]}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: 0,
        },
      }}
    >
      <PieCenterLabel>₹ {centerValue ? humanizeNumber(centerValue) : 0}</PieCenterLabel>
    </PieChart>
  );
}

export default memo(IncomeExpensePie)