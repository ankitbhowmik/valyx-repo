import { Avatar, Badge, Button, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'

const RecentIncomeSpents = () => {
    return (
        <div className='mt-4'>
            <div className='flex justify-content-space-between'>
                <h3>Recent Spents</h3>
                <Button color="info" size="small">
                    View All
                </Button>
            </div>
            <div>
                {[1, 2, 3 ,4, 5, 6].map((item, index)=>(
                    <Card sx={{ color: "white", bgcolor: "transparent" }} key={index}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" sx={{ width: 50, height: 50 }}>A</Avatar>
                            }
                            action={<h3>- $15</h3>}
                            title="House Expense"
                            subheader={<p className='m-0 color-grayy'>Wed 17, Jan 2023</p>}
                        />
                    </Card>
                ))}
                <br/>
                <br/>
            </div>
        </div>
    )
}

export default RecentIncomeSpents