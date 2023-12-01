import React, { useState } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Modal, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { usePapaParse } from 'react-papaparse';
import { modalStyle } from '../../utils/modalStyle';

const banks = ["HDFC", "IDFC", "ICICI"]

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

const AddNewStatements = () => {
    const { readString } = usePapaParse();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file.type !== "text/csv") {
            Swal.fire({
                icon: "error",
                title: "File type not supported :(",
                text: "Please insert a csv file only..",
            });
            return
        } else {
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = () => {
                const csvString = reader.result;

                readString(csvString, {
                    worker: true,
                    complete: (results) => {
                        const mustNeedFields = ['Date', 'Description', 'Debit', 'Credit', 'Balance'];
                        const fields = results[0];

                        //check if all required field exists.
                        let fieldsIncluded = 0
                        for(let mustField of mustNeedFields){
                            const isExists = fields.includes(mustField);
                            if(isExists) fieldsIncluded++;
                        }
                        if(fieldsIncluded !== 6) {
                            Swal.fire({
                                icon: "error",
                                title: "Please include all required fields",
                                text: "'Date', 'Description', 'Debit', 'Credit', 'Balance'",
                            });
                            return
                        }

                        console.log(results);
                    },
                });
            }

            const fileName = file.name;
        }
    }

    return (
        <div className='add-new-statements mt-5'>
            <div className='all-statement-card'>
                <h2 className='m-0'>All Statements</h2>
                <div className='flex flex-wrap gap-4 mt-5 justify-content-space-between'>
                    {
                        banks.map(bank => (
                            <div key={bank}>
                                <InsertDriveFileIcon fontSize='large' />
                                <p className='color-white text-extra-small mt-0'>{bank}</p>
                            </div>
                        ))}
                </div>
            </div>
            <br />
            <Button
                fullWidth
                component="label"
                variant="outlined"
                size="large"
                startIcon={<CloudUploadIcon />}
                onClick={()=>setIsUploadModalOpen(true)}
            >
                Upload file
            </Button>
            <Modal
                open={isUploadModalOpen}
                onClose={()=> setIsUploadModalOpen(false)}
            >
                <Box sx={modalStyle}>
                    <h3 className='color-dark'>Rules For File Uploading</h3>
                    <p className='color-warning text-small'>*Must upload a .csv file and that should contains all fields mentioned below</p>
                    <p className='color-warning text-small'>'Date', 'Description', 'Debit', 'Credit', 'Balance'</p>
                    <Button
                        size="large"
                        component="label"
                        variant="contained"
                    >
                        Okay
                        <VisuallyHiddenInput type="file" onChange={onFileChange} />
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default AddNewStatements