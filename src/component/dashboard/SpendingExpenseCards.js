import React from 'react';
import { useSelector } from 'react-redux';
import { calculateSpents, humanizeNumber } from '../../utils/number';

const SpendingExpenseCards = () => {
    const { statements } = useSelector(state => state.statement);
    const {income, expense} = calculateSpents(statements)

    const cards = [
        {title: "Total Income", value: `₹ ${income ? humanizeNumber(income) : 0}`},
        {title: "Total Expense", value: `₹ ${expense ? humanizeNumber(expense) : 0}`},
    ]

  return (
    <div className='spending-expense-card flex justify-content-space-between gap-5'>
        {
            cards.map(({title, value})=> (
                <div className='card' key={title}>
                    <p className='text-extra-small color-grayy'>{title}</p>
                    <p className='text-medium color-white'>{value}</p>
                </div>
            ))
        }
    </div>
  )
}

export default SpendingExpenseCards