import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button, Checkbox, FormGroup, Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ReactDatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { statementAction } from '../../store/feature/statementSlice';
import moment from 'moment';

const animatedComponents = makeAnimated();

export default function IncomeExpenseFilter({ toggleDrawer, incomeData, expenseData, selectedTab, statements }) {
    const [expanded, setExpanded] = useState(false);
    const [myfilter, setMyFilter] = useState({
        description: [],
        bankStatements: [],
        date: {
          from: "",
          to: "",
          dateType: "all"   // possible field are "all", "this_month", "last_month", "custom"
        },
        enable: false
    })

    const { filter } = useSelector(state => state.statement);
    const dispatch = useDispatch();

    useEffect(()=>{
        setMyFilter(filter)
    }, [filter])

    let searchOptions = selectedTab === "expense" ? expenseData : incomeData;
    searchOptions = searchOptions.map(op => ({ label: op.label, value: op.value }))

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const changeDateType = (event) => {
        const value = event.target.value

        let from = "";
        let to = "";

        if (value === "this_month") {
            from = moment().startOf('month').format('DD-MM-YYYY');
            to = moment().endOf('month').format('DD-MM-YYYY');
        } else if (value === "last_month") {
            from = moment().subtract(1, 'month').startOf('month').format('DD-MM-YYYY');
            to = moment().subtract(1, 'month').endOf('month').format('DD-MM-YYYY');
        } else if (value === "all") {
        } else if (value === "custom") {
        }
        // dispatch(statementAction.setDateFilter({ dateType: value, from, to}))
        setMyFilter(prev=> ({...prev, date: {dateType: value, from, to}}))
    }

    const setStartDate = (val) => {
        let from = moment(val).format('DD-MM-YYYY');
        // dispatch(statementAction.setDateFilter({ from}))
        setMyFilter(prev => ({...prev, date: {...prev.date, from}}))
    }
    
    const setEndDate = (val) => {
        let to = moment(val).format('DD-MM-YYYY')
        // dispatch(statementAction.setDateFilter({ to }))
        setMyFilter(prev => ({...prev, date: {...prev.date, to}}))
    }

    const setDescriptions = (value) => {
        // dispatch(statementAction.setFilter({ filterType: "description", value: value.map(val => val.label) }))
        setMyFilter(prev => ({...prev, description:value.map(val => val.label) }))
    }

    const onChangeBankStatementFilter = (fileName, isChecked) => {
        let newBankStatement = [];
        if (isChecked) {
            newBankStatement = [...myfilter.bankStatements, fileName]
        } else {
            newBankStatement = myfilter.bankStatements.myfilter(bnk => bnk !== fileName);
        }
        // dispatch(statementAction.setFilter({ filterType: "bankStatements", value: newBankStatement }))
        setMyFilter(prev => ({...prev, bankStatements: newBankStatement}) )
    }

    const applyFilter = () => {
        dispatch(statementAction.replaceFilter(myfilter));
        // dispatch(statementAction.applyFilter());
        toggleDrawer()
    }
    const clearAllFilter = () => {
        setMyFilter({
            description: [],
            bankStatements: [],
            date: {
              from: "",
              to: "",
              dateType: "all"   // possible field are "all", "this_month", "last_month", "custom"
            },
            enable: false
        })
        dispatch(statementAction.clearFilter())
    }

    return (
        <div style={{ width: 300 }} className='p-4'>
            <div onClick={toggleDrawer} className='flex justify-content-end mb-2 cursor-pointer'>
                <CloseIcon />
            </div>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Search</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        By Income/Expense type. e.g., Salary
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='color-dark'>
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            // defaultValue={[colourOptions[4], colourOptions[5]]}
                            isMulti
                            value={myfilter.description.map(op => ({ label: op, value: op }))}
                            onChange={setDescriptions}
                            options={searchOptions}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Select Statements
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Select/Unselect which Bank statment to monitor
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {
                            statements.map(statement => (
                                <FormControlLabel
                                    key={statement.fileName}
                                    control={<Checkbox
                                        checked={myfilter.bankStatements.includes(statement.fileName)}
                                        onClick={(e) => onChangeBankStatementFilter(statement.fileName, e.target.checked)}
                                    />}
                                    label={statement.fileName}
                                />
                            ))
                        }
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Date</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="this_month"
                            name="radio-buttons-group"
                            value={myfilter.date.dateType}
                            onChange={changeDateType}
                        >
                            <FormControlLabel value="this_month" control={<Radio />} label="This month" />
                            <FormControlLabel value="last_month" control={<Radio />} label="Last month" />
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                        </RadioGroup>
                        {
                            myfilter.date.dateType === "custom" && <>
                                <p>From {myfilter.date?.from}</p>
                                <ReactDatePicker
                                    showIcon
                                    // selected={moment(myfilter.date?.from ?? "")}
                                    onChange={(date) => setStartDate(date)}
                                // selectsStart
                                // startDate={startDate}
                                // endDate={endDate}
                                />
                                <p>To {myfilter.date?.to}</p>
                                <ReactDatePicker
                                    showIcon
                                    // selected={moment(myfilter.date?.to ?? "") }
                                    onChange={(date) => setEndDate(date)}
                                // selectsEnd
                                // startDate={startDate}
                                // endDate={endDate}
                                // minDate={startDate}
                                />
                            </>
                        }
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <br />
            <Stack direction="row" spacing={2}>
                <Button variant="contained" className='bg-secondary color-white' onClick={applyFilter}>
                    Apply
                </Button>
                <Button variant="outlined" color="error" onClick={clearAllFilter}>
                    Clear
                </Button>
            </Stack>
        </div>
    );
}