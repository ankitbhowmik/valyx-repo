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
    const { incomeData, expenseData, recentExpense, recentIncome } = useMemo(() => getGraphData(statements, filter), [statements, filter])

    return (
        <div className='expense-rechart'>
            <div className='flex justify-content-space-between mt-2'>
                <h3>
                    {
                        filter.date.dateType === "all"
                            ? "All time"
                            : filter.date.dateType === "this_month"
                                ? "This month"
                                : filter.date.dateType === "last_month"
                                    ? "Last month"
                                    : "Custom"
                    }
                </h3>
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
                {
                    statements.length === 0
                        ? <h1>No Statement found. Please upload one!!</h1>
                        : <IncomeExpensePie
                            selectedTab={selectedTab}
                            incomeData={incomeData}
                            expenseData={expenseData}
                        />
                }
                <RecentIncomeSpents
                    recentExpense={recentExpense}
                    recentIncome={recentIncome}
                    selectedTab={selectedTab}
                />
            </div>
        </div>
    )
}

export default ExpenseRechart