import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { statementAction } from '../../store/feature/statementSlice';

const IncomeExpenseTabs = ({onChange=()=>{}}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        return ()=>{
            dispatch(statementAction.showIncomeTab());
        }
    }, [dispatch])

    const showIncome = () => {
        dispatch(statementAction.showIncomeTab());
        onChange()
    }

    const showExpenseTab = ()=>{
        dispatch(statementAction.showExpenseTab())
        onChange()
    }

    return (
        <div className='spent-expense-tab'>
            <div className="container">
                <div className="tabs">
                    <input type="radio" id="radio-1" name="tabs" onClick={showIncome}/>
                    <label className="tab" htmlFor="radio-1">Income</label>
                    <input type="radio" id="radio-2" name="tabs" onClick={showExpenseTab}/>
                    <label className="tab" htmlFor="radio-2">Expense</label>
                    <span className="glider"></span>
                </div>
            </div>
        </div>
    )
}

export default IncomeExpenseTabs