import React, { useState } from 'react';
import { Button, Drawer } from '@mui/material';
import IncomeExpensePie from '../charts/IncomeExpensePie';
import RecentIncomeSpents from './RecentIncomeSpents';
import IncomeExpenseFilter from './IncomeExpenseFilter';

const ExpenseRechart = () => {
    const [isFilterOpen, setFilterOpen] = useState(false);

    const toggleDrawer = () => setFilterOpen(prev => !prev);

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
                   <IncomeExpenseFilter toggleDrawer={toggleDrawer}/>
                </Drawer>
            </div>

            <div className='some-chart'>
                <IncomeExpensePie />
                <RecentIncomeSpents />
            </div>
        </div>
    )
}

export default ExpenseRechart