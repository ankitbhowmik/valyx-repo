import React from 'react';

const cards = [
    {title: "Total Spent", value: "₹ 11800"},
    {title: "Total Expense", value: "₹ 23453"},
]

const SpendingExpenseCards = () => {
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