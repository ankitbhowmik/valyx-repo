import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data = [
  { value: 5, label: 'Salary' },
  { value: 10, label: 'Electronics' },
  { value: 15, label: 'Party' },
  { value: 20, label: 'Drinking' },
];

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

export default function IncomeExpensePie() {
  return (
    <PieChart
      width={400}
      height={200}
      series={[{ data, innerRadius: 80, cornerRadius: 5, paddingAngle: 3 }]}
    >
      <PieCenterLabel>₹ 293400</PieCenterLabel>
    </PieChart>
  );
}