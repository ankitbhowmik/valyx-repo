import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const TopBar = ({title}) => {
  const navigate = useNavigate();
  return (
    <div className='top-bar flex justify-content-space-between align-items-center pt-4 pb-4'>
        <div className='back-button flex-center cursor-pointer' onClick={()=>navigate(-1)}>
            <ArrowBackIosIcon style={{"transform": "translateX(5px)"}} fontSize='small'/>
        </div>
        <div>
            <h3 className='m-0'>{title}</h3>
        </div>
        <div style={{width: 40}}>
          
        </div>
    </div>
  )
}

export default TopBar