import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const TopBar = () => {
  return (
    <div className='top-bar flex justify-content-space-between align-items-center pt-4 pb-4'>
        <div className='back-button flex-center cursor-pointer'>
            <ArrowBackIosIcon style={{"transform": "translateX(5px)"}} fontSize='small'/>
        </div>
        <div>
            <h3 className='m-0'>Statistics</h3>
        </div>
        <div style={{width: 40}}>
          
        </div>
    </div>
  )
}

export default TopBar