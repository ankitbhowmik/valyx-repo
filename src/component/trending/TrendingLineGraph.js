import { useMemo } from 'react';
import TrendingChart from './TrendingChart';
import { useSelector } from 'react-redux';
import { getTrendingGraphData } from '../../utils/number';

const TrendingLineGraph = () => {
    const { statements, selectedTab } = useSelector(state => state.statement);
    const { incomeData, expenseData } = useMemo(() => getTrendingGraphData(statements), [statements]);

    return (
        <div className='expense-rechart'>
            <div className='some-chart'>
                <br />
                {statements.length === 0
                    ? <h1>No Statement found. Please upload one!!</h1>
                    : <TrendingChart
                        incomeData={incomeData}
                        expenseData={expenseData}
                        selectedTab={selectedTab}
                    />
                }

            </div>
        </div>
    )
}

export default TrendingLineGraph