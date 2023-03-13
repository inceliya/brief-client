import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
} from '@mui/material';
import { addToFavourite, deleteAnswer, results } from '../../api';
import { useNavigate } from 'react-router-dom';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';


function Results() {
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswers] = useState(null);

  const apiRef = useGridApiRef();

  const columns = useRef([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFavouriteClick = (row) => {
    return async () => {
      apiRef.current.updateRows([{ _id: row._id, isFavourite: !row.isFavourite }]);
      await addToFavourite({ id: row._id });
    };
  };

  const onDeleteClick = (value) => {
    return async () => await deleteAnswer({ id: value.row._id })
      .then(res => window.location.reload());
  };

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await results()
        .then(res => {
          if (res.status === 200)
            setAnswers(res.data);
          else
          navigate('/login');
        })
        .catch(err => {
          console.log(err);
          navigate('/login');
        });
    }
    fetchData();
  }, [navigate]);

  useEffect(() => {
    columns.current = [
      { field: 'name', headerName: 'Name', minWidth: 150 },
      { field: 'email', headerName: 'Email', minWidth: 300 },
      { field: 'phone', headerName: 'Phone', minWidth: 200 },
      { field: 'country', headerName: 'Country', minWidth: 200 },
      { field: 'shortDescription', headerName: 'Description', minWidth: 300, flex: 1 },
      {
        field: 'favourite',
        type: 'actions',
        width: 70,
        renderCell: (value) => (
          !value.row.isFavourite ?
            <span onClick={onFavouriteClick(value.row)}>
              <StarOutlineIcon />
            </span>
            :
            <span onClick={onFavouriteClick(value.row)}>
              <StarIcon />
            </span>
        ),
      },
      {
        field: 'delete',
        type: 'actions',
        width: 70,
        renderCell: (value) => (
          <span onClick={onDeleteClick(value)}>
            <DeleteIcon />
          </span>
        ),
      },
      {
        field: 'details',
        type: 'actions',
        width: 140,
        renderCell: (value) => (
          <Button variant="contained" onClick={() => setCurrentAnswers(value.row)}>More info</Button>
        ),
      },
    ];
  }, [onFavouriteClick]);


  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        apiRef={apiRef}
        rows={answers}
        columns={columns.current}
        pageSize={10}
        getRowId={row => row._id}
        getRowHeight={() => 'auto'}
        disableRowSelectionOnClick={true}
        sx={{
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
        }}
      />
      {!!currentAnswer &&
        <Box>
          <h2>Objective: </h2>
          <p>{currentAnswer.objective}</p>
          <h2>Budget: </h2>
          <p>{currentAnswer.budget}</p>
          <h2>Deadline: </h2>
          <p>{(new Date(currentAnswer.deadline)).toLocaleString('uk-UA', { year: 'numeric', month: 'numeric', day: 'numeric' })}</p>
          <h2>Target audience: </h2>
          <p>{currentAnswer.targetAudience}</p>
          <h2>Is new project: </h2>
          <p>{currentAnswer.isNewProject ? "Yes" : "No"}</p>
          <h2>Backgorund info: </h2>
          <p>{currentAnswer.backgroundInfo}</p>
        </Box>
      }
    </div>
  );
}

export default Results;
