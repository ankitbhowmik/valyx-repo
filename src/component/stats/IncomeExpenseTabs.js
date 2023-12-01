import React from 'react'

const IncomeExpenseTabs = () => {
    return (
        <div className='spent-expense-tab'>
            <div className="container">
                <div className="tabs">
                    <input type="radio" id="radio-1" name="tabs" checked onChange={()=>{}}/>
                    <label className="tab" htmlFor="radio-1">Income</label>
                    <input type="radio" id="radio-2" name="tabs" />
                    <label className="tab" htmlFor="radio-2">Expense</label>
                    <span className="glider"></span>
                </div>
            </div>
        </div>
    )
}

export default IncomeExpenseTabs