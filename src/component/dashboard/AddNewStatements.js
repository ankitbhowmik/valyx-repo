import React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const banks = ["HDFC", "IDFC", "ICICI"]

const AddNewStatements = () => {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div className='add-new-statements mt-5'>
            <div className='all-statement-card'>
                <h2 className='m-0'>All Statements</h2>
                <div className='flex flex-wrap gap-4 mt-5 justify-content-space-between'>
                    {
                        banks.map(bank => (
                            <div >
                                <InsertDriveFileIcon fontSize='large' />
                                <p className='color-white text-extra-small mt-0'>{bank}</p>
                            </div>
                        ))}
                </div>
            </div>
            <br/>
            <Button 
                fullWidth 
                component="label" 
                variant="outlined" 
                size="large"
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput type="file" />
            </Button>
        </div>
    )
}

export default AddNewStatements