import React from 'react'
import TopBar from '../component/common/TopBar'
import IncomeExpenseTabs from '../component/stats/IncomeExpenseTabs'
import TrendingLineGraph from '../component/trending/TrendingLineGraph'

const Trending = () => {
  return (
    <div className="p-4 stats">
      <TopBar title="Trending"/>
      <IncomeExpenseTabs />
      <TrendingLineGraph />
    </div>
  )
}

export default Trending

