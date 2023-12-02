import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statements: [],  // [ {fileName: "", data: [{'Date': "", 'Description':"", 'Debit':"", 'Credit':"", 'Balance':""}, {}] } ],
  selectedTab: "income",  // can be "income" or "expense",
  filter: {
    description: [],
    bankStatements: [],
    date: {
      from: "",
      to: "",
      dateType: "all"   // possible field are "all", "this_month", "last_month", "custom"
    },
    enable: false
  }
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
      state.filter.bankStatements = [...state.filter.bankStatements, action.payload.fileName]
    },
    removeStatement: (state, action) => {
      state.statements = state.statements.filter(statement => statement.fileName !== action.fileName);
    },
    showIncomeTab: (state) => {
      state.selectedTab = "income";
    },
    showExpenseTab: (state) => {
      state.selectedTab = "expense";
    },
    setFilter: (state, action) => {
      state.filter[action.payload.filterType] = action.payload.value; 
      state.filter.enable = false;
    },
    replaceFilter: (state, action) => {
      state.filter = action.payload
    },
    setDateFilter: (state, action) => {
      if(action.payload.from) state.filter.date.from = action.payload.from;
      if(action.payload.to) state.filter.date.to = action.payload.to;
      if(action.payload.dateType) state.filter.date.dateType = action.payload.dateType;
      state.filter.enable = false
    },
    applyFilter: (state) => {
      state.filter.enable = true
    },
    cancelFilter: (state) => {
      state.filter.enable = false
    },
    clearFilter: (state) => {
      state.filter = {
        ...state.filter,
        description: [],
        date: {
          from: "",
          to: "",
          dateType: "all"   // possible field are "all", "this_month", "last_month", "custom"
        }
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const statementAction = statementSlice.actions

const statementReducer = statementSlice.reducer

export default statementReducer