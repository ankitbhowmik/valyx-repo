import React from 'react'
import TopBar from '../component/common/TopBar'
import IncomeExpenseTabs from '../component/stats/IncomeExpenseTabs'
import ExpenseRechart from '../component/stats/ExpenseRechart'

const Stats = () => {
  return (
    <div className="p-4 stats">
      <TopBar title="Statistics" />
      <IncomeExpenseTabs />
      <ExpenseRechart />
    </div>
  )
}

export default Stats