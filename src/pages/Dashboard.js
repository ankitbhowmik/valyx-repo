import React from 'react'
import UserInfo from '../component/dashboard/UserInfo'
import SpendingExpenseCards from '../component/dashboard/SpendingExpenseCards'
import AddNewStatements from '../component/dashboard/AddNewStatements'

const Dashboard = () => {
  return (
    <div className='p-4 dashboard'>
      <UserInfo />
      <SpendingExpenseCards />
      <AddNewStatements />

    
    </div>
  )
}

export default Dashboard