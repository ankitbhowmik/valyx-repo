import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statements: [],  // [ {fileName: "", data: [{'Date': "", 'Description':"", 'Debit':"", 'Credit':"", 'Balance':""}, {}] } ],
  selectedTab: "income",  // can be "income" or "expense"
}

export const statementSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addNewStatement: (state, action) => {
      state.statements.push({
        fileName: action.payload.fileName,
        data: action.payload.data
      })
    },

    removeStatement: (state, action) => {
      state.statements = state.statements.filter(statement => statement.fileName !== action.fileName);
    },
    showIncomeTab: (state) => {
      state.selectedTab = "income";
    },
    showExpenseTab: (state) => {
      state.selectedTab = "expense";
    }
  },
})

// Action creators are generated for each case reducer function
export const statementAction = statementSlice.actions

const statementReducer = statementSlice.reducer

export default statementReducer