import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox, FormGroup, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

export default function IncomeExpenseFilter({ toggleDrawer }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div style={{ width: 300 }} className='p-4'>
            <div onClick={toggleDrawer} className='flex justify-content-end mb-2 cursor-pointer'>
                <CloseIcon />
            </div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Views
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>What type of graph you want to view</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="pie"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="pie" control={<Radio />} label="Pie Chart" />
                            <FormControlLabel value="bar" control={<Radio />} label="Bar Chart" />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
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
                    <FormControl>
                        <TextField
                            hiddenLabel
                            required
                            id="outlined-required"
                            placeholder='will give multiple checkbox'
                        />
                    </FormControl>
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
                        <FormControlLabel control={<Checkbox defaultChecked />} label="IDFC" />
                        <FormControlLabel control={<Checkbox />} label="HDFC" />
                        <FormControlLabel control={<Checkbox />} label="ICICI" />
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
                            defaultValue="pie"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="this_month" control={<Radio />} label="This month" />
                            <FormControlLabel value="last_month" control={<Radio />} label="Last month" />
                            <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}