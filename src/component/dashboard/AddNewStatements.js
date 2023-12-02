import React, { useState } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, ButtonGroup, Grid, Modal } from '@mui/material';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { usePapaParse } from 'react-papaparse';
import { modalStyle } from '../../utils/modalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { statementAction } from '../../store/feature/statementSlice';
import { userAction } from '../../store/feature/userSlice';

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
    const dispatch = useDispatch();
    const { statements } = useSelector(state => state.statement);
    const uploadedStatements = statements.map(statement => statement.fileName);

    const onFileChange = (event) => {
        setIsUploadModalOpen(false);
        const file = event.target.files[0];
        const fileName = file.name;
        if (uploadedStatements.includes(fileName)) {
            Swal.fire({
                icon: "error",
                title: "Statement already exists",
                text: "same name statement is already exists. please try uploading new statement",
            });
            return
        }
        dispatch(userAction.setLoading({ loading: true }))
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
                    header: true,
                    worker: true,
                    error: () => {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong",
                            text: "Unable to parse the CSV",
                        });
                        dispatch(userAction.setLoading({ loading: false }))
                    },
                    complete: (results) => {
                        const mustNeedFields = ['Date', 'Description', 'Debit', 'Credit', 'Balance'];
                        const fields = Array.from((new Set(Object.keys(results.data?.[0]))));
                        let fieldsIncluded = 0
                        for (let mustField of mustNeedFields) {
                            const isExists = fields.includes(mustField);
                            if (isExists) fieldsIncluded++;
                        }

                        if (fieldsIncluded !== 5) {
                            Swal.fire({
                                icon: "error",
                                title: "Please include all required fields",
                                text: "'Date', 'Description', 'Debit', 'Credit', 'Balance'",
                            });
                            return
                        }

                        dispatch(statementAction.addNewStatement({
                            fileName,
                            data: results.data
                        }))
                        dispatch(userAction.setLoading({ loading: false }));
                    },
                });
            }
            reader.onerror = () => {
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: "Some reader error occured",
                });
                dispatch(userAction.setLoading({ loading: false }))
            }
        }
    }

    return (
        <div className='add-new-statements mt-5'>
            <div className='all-statement-card'>
                <h2 className='m-0'>All Statements</h2>
                <br/>
                <Grid container spacing={2}>
                    {
                        uploadedStatements?.length > 0 ? uploadedStatements.map(bank => (
                            <Grid item xs={3} key={bank}>
                                <div key={bank}>
                                    <InsertDriveFileIcon fontSize='large' />
                                    <p className='color-white text-extra-small mt-0'>{bank}</p>
                                </div>
                            </Grid>
                        ))
                            : <p className='ml-4'>Try uploading a statement</p>
                    }
                </Grid>

            </div>
            <br />
            <Button
                fullWidth
                component="label"
                variant="outlined"
                size="large"
                startIcon={<CloudUploadIcon />}
                onClick={() => setIsUploadModalOpen(true)}
            >
                Upload file
            </Button>
            <Modal
                open={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            >
                <Box sx={modalStyle}>
                    <h3 className='color-dark'>Rules For Statment Uploading</h3>
                    <p className='color-grayy text-small'>*Must upload a .csv file and that csv should contains all fields mentioned below</p>
                    <p className='color-grayy text-small'>'Date', 'Description', 'Debit', 'Credit', 'Balance'</p>
                    <p className='color-grayy text-small'>you can download some demo files to get started</p>
                    <div className='flex justify-content-space-between mb-3'>
                        <a href="/downloadable/axis.csv" download>axis.csv</a> 
                        <a href="/downloadable/hdfc.csv" download>hdfc.csv</a>
                        <a href="/downloadable/icici.csv" download>icici.csv</a>  
                    </div>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button
                            size="large"
                            component="label"
                            variant="outlined"
                            style={{color: "#0077b6", borderColor: "#0077b6"}}
                        >
                            upload
                            <VisuallyHiddenInput type="file" onChange={onFileChange} />
                        </Button>
                        <Button
                            size="large"
                            component="label"
                            // variant="contained"
                            onClick={() => setIsUploadModalOpen(false)}
                            style={{color: "#0077b6", borderColor: "#0077b6"}}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </div>
    )
}

export default AddNewStatements