import randomTasks from '../assets/data/tasks.js';
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import { FaRegTrashAlt } from 'react-icons/fa';
import { BiSolidPencil } from 'react-icons/bi';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: 'task_type', numeric: false, disablePadding: true, label: 'Task Type' },
  { id: 'number_of_tasks', numeric: true, disablePadding: false, label: 'Number of Tasks' },
  { id: 'project', numeric: false, disablePadding: false, label: 'Project' },
  { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created On' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              border: '1px solid #E7E8EA',
              backgroundColor: '#FBFBFB',
              color: '#535353',
              fontFamily: 'Inter-SemiBold',
              fontSize: '0.875rem',
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={headCell.id !== 'actions' && orderBy === headCell.id ? order : 'asc'}
              onClick={headCell.id === 'actions' ? undefined : createSortHandler(headCell.id)}
              sx={{ width: '100%' }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('task_type');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Generate random tasks
  const rows = randomTasks

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{  maxHeight: '350px', overflowY: 'auto', border: 'none' }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow
                  hover
                  key={row.id}
                  className={index % 2 !== 0 ? 'even-row' : ''}
                  sx={{ border: '1px solid #E7E8EA' }}
                >
                  <TableCell component="th" scope="row" padding="normal"
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Regular',
                      fontSize: '0.875rem',
                    }}
                  >
                    {row.task_type}
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Regular',
                      fontSize: '0.875rem',
                    }}
                  >
                    {row.number_of_tasks}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Regular',
                      fontSize: '0.875rem',
                    }}
                  >
                    {row.project}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Regular',
                      fontSize: '0.875rem',
                    }}
                  >
                    {row.client}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Regular',
                      fontSize: '0.875rem',
                    }}
                  >
                    {row.created_at}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Regular',
                      fontSize: '0.875rem',
                    }}
                  >
                    <div className='w-full flex items-center gap-3'>
                      <BiSolidPencil color='#00457C' size={20} className='cursor-pointer' />
                      <FaRegTrashAlt color='#CB4B6C' size={18} className='cursor-pointer' />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <section className='w-full mt-5 flex items-center justify-between'>
          <section className='flex items-center gap-2 font-Roboto-Regular text-sm'>
            <button type='button' onClick={() => setRowsPerPage(5)} className={`p-3 rounded-md ${rowsPerPage == '5' ? 'text-white bg-[#00457C]' : 'text-[#1C1C1C] bg-transparent' }  cursor-pointer`}>5</button>
            <button type='button' onClick={() => setRowsPerPage(10)} className={`p-3 rounded-md ${rowsPerPage == '10' ? 'text-white bg-[#00457C]' : 'text-[#1C1C1C] bg-transparent' }  cursor-pointer`}> 10 </button>
            <button type='button' onClick={() => setRowsPerPage(rows.length)} className={`p-3 rounded-md ${rowsPerPage == rows.length ? 'text-white bg-[#00457C]' : 'text-[#1C1C1C] bg-transparent' }  cursor-pointer`}> All </button>
          </section>
          <section>
            <Pagination
              count={Math.ceil(rows.length / rowsPerPage)} // Set total pages based on rows
              page={page} // Current page
              onChange={handleChangePage} // Handle page change
              shape="rounded"
            />
          </section>
        </section>
      </Paper>
    </Box>
  )
}