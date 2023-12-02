import React, {useMemo, useState} from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Select from 'react-select';
import moment from "moment";

const defaultDate = [new Date(2023, 1, 1), new Date(2023, 2, 1), new Date(2023, 3, 1), new Date(2023, 4, 1), new Date(2023, 5, 1), new Date(2023, 6, 1)]
export default function BasicLineChart({incomeData, expenseData, selectedTab}) {
    const [selectedOption, setSelectedOption] = useState("");
    
    const data = selectedTab === "income" ? incomeData : expenseData;
    const categoryOptions = useMemo(()=> Object.keys(data).map(d=> ({value: d, label: d})), [data]);

    useState(()=>{
        setSelectedOption(categoryOptions[0]?.value ?? "")
    }, [categoryOptions])

    const changeCategory = (val)=> setSelectedOption(val.value)

    const xAxisData = data?.[selectedOption]?.map(item=> {
        const dat = moment(item.Date, "DD/MM/YYYY")
        return new Date(dat.year(), dat.month(), dat.date())
    }) ?? defaultDate;

    const seriesData = data?.[selectedOption]?.map(item=> selectedTab==="income" ? item.Credit : item.Debit ) ?? [1, 2 ,7,3,7,8];

    console.log("*** 1", data)
    console.log("*** 2", xAxisData)
    console.log("*** 3", seriesData)
    
    return (
        <>
            <div className='color-dark'>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    value={{label: selectedOption, value: selectedOption}}
                    onChange={changeCategory}
                    // isClearable={true}
                    isSearchable={true}
                    name="Search By category"
                    options={categoryOptions}
                />
            </div>

            <LineChart
                xAxis={[{ data: xAxisData, scaleType: 'time', label: "Date"}]}
                series={[
                    {
                        data: seriesData,
                        label: "Income ₹"
                    },
                ]}
                width={400}
                height={300}
            />
        </>
    );
}