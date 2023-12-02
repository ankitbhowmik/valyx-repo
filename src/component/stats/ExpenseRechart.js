import React, { useMemo, useState } from 'react';
import { Button, Drawer } from '@mui/material';
import IncomeExpensePie from '../charts/IncomeExpensePie';
import RecentIncomeSpents from './RecentIncomeSpents';
import IncomeExpenseFilter from './IncomeExpenseFilter';
import { useSelector } from 'react-redux';
import { getGraphData } from '../../utils/number';

const ExpenseRechart = () => {
    const [isFilterOpen, setFilterOpen] = useState(false);

    const toggleDrawer = () => setFilterOpen(prev => !prev);
    const { statements, selectedTab, filter } = useSelector(state => state.statement);
    const {incomeData, expenseData} = useMemo(()=>getGraphData(statements, filter), [statements.length, filter])

    return (
        <div className='expense-rechart'>
            <div className='flex justify-content-space-between mt-2'>
                <h3>This month</h3>
                <Button color="info" onClick={toggleDrawer}>
                    filter
                </Button>

                <Drawer
                    anchor={"right"}
                    open={isFilterOpen}
                    onClose={toggleDrawer}
                    color="white"
                    PaperProps={{ style: { backgroundColor: "rgb(21,21,21)", color: "white" } }}
                >
                   <IncomeExpenseFilter 
                        toggleDrawer={toggleDrawer} 
                        statements={statements}
                        incomeData={incomeData} 
                        expenseData={expenseData} 
                        selectedTab={selectedTab} 
                    />
                </Drawer>
            </div>

            <div className='some-chart'>
                <IncomeExpensePie 
                    selectedTab={selectedTab} 
                    incomeData={incomeData} 
                    expenseData={expenseData}
                />
                <RecentIncomeSpents />
            </div>
        </div>
    )
}

export default ExpenseRechart