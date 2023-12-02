import React from 'react'
import TopBar from '../component/common/TopBar'
import IncomeExpenseTabs from '../component/stats/IncomeExpenseTabs'
import ExpenseRechart from '../component/stats/ExpenseRechart'
import { useDispatch } from 'react-redux'
import { statementAction } from '../store/feature/statementSlice'

const Stats = () => {
  const dispatch = useDispatch();

  return (
    <div className="p-4 stats">
      <TopBar title="Statistics" />
      <IncomeExpenseTabs onChange={()=> dispatch(statementAction.clearFilter()) }/>
      <ExpenseRechart />
    </div>
  )
}

export default Stats