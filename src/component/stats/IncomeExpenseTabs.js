import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { statementAction } from '../../store/feature/statementSlice';

const IncomeExpenseTabs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        return ()=>{
            dispatch(statementAction.showIncomeTab());
        }
    }, [])

    return (
        <div className='spent-expense-tab'>
            <div className="container">
                <div className="tabs">
                    <input type="radio" id="radio-1" name="tabs" onClick={()=>dispatch(statementAction.showIncomeTab())}/>
                    <label className="tab" htmlFor="radio-1">Income</label>
                    <input type="radio" id="radio-2" name="tabs" onClick={()=>dispatch(statementAction.showExpenseTab())}/>
                    <label className="tab" htmlFor="radio-2">Expense</label>
                    <span className="glider"></span>
                </div>
            </div>
        </div>
    )
}

export default IncomeExpenseTabs