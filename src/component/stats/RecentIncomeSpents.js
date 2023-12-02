import { Avatar, Button, Card, CardHeader } from '@mui/material'
import React from 'react'
import moment from 'moment';

const RecentIncomeSpents = ({ recentExpense, recentIncome, selectedTab }) => {
    const data = selectedTab === "income" ? recentIncome : recentExpense;

    return (
        <div className='mt-4'>
            <div className='flex justify-content-space-between'>
                <h3>Recent {selectedTab === "income" ? "Income" : "Spent"}</h3>
                <Button color="info" size="small">
                    View All
                </Button>
            </div>
            <div>
                {data.slice(0, 5).map((item, index) => (
                    <Card sx={{ color: "white", bgcolor: "transparent" }} key={item.Date + item.Description}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" sx={{ width: 50, height: 50 }}>{item.Description?.charAt(0)?.toUpperCase()}</Avatar>
                            }
                            action={<h3>{selectedTab === "income" ? `-₹${item.Credit}` : `₹${item.Debit}`}</h3>}
                            title={item.Description}
                            subheader={<p className='m-0 color-grayy'> {moment(item.Date, "MM-DD-YYYY").format('ddd DD, MMM YYYY')}</p>}
                        />
                    </Card>
                ))}
                <br />
                <br />
            </div>
        </div>
    )
}

export default RecentIncomeSpents