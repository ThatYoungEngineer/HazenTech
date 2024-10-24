import randomTasks from '../assets/data/tasks.js'

import * as React from 'react'
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
import Pagination from '@mui/material/Pagination'

import { FaRegTrashAlt } from 'react-icons/fa'
import { BiSolidPencil } from 'react-icons/bi'


function descendingComparator(a, b, orderBy) {
  if (orderBy === 'number_of_tasks') {
    return Number(b[orderBy]) - Number(a[orderBy]); // Number comparison
  }

  if (orderBy === 'created_at') {
    return new Date(b[orderBy]) - new Date(a[orderBy]); // Proper date comparison
  }

  if (typeof a[orderBy] === 'string' && typeof b[orderBy] === 'string') {
    return b[orderBy].localeCompare(a[orderBy]); // String comparison
  }

  return b[orderBy] < a[orderBy] ? -1 : 1;
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
]

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
        <TableContainer sx={{  height: {lg: '22.2rem', xl: '30.2rem'} , overflowY: 'auto', border: 'none' }}>
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
                  className={`${index  % 2 !== 0  && 'bg-[#F5F8FA]' }`}
                  sx={{ border: '1px solid #E7E8EA' }}
                >
                  <TableCell component="th" scope="row" padding="normal"
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Medium',
                      fontSize: '0.875rem',
                      width: '25%'
                    }}
                  >
                    {row.task_type}
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Medium',
                      fontSize: '0.875rem',
                      width: '11.5rem'
                    }}
                  >
                    {row.number_of_tasks}
                  </TableCell>
                  <TableCell 
                    align='left'
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Medium',
                      fontSize: '0.875rem',
                      width: {lg: '15%', xl: '10%'}
                    }}
                  >
                    {row.project}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Medium',
                      fontSize: '0.875rem',
                    }}
                  >
                    {row.client}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Medium',
                      fontSize: '0.875rem',
                    }}
                  >
                      {new Date(row.created_at).toLocaleString('en-GB', {
                        timeZone: 'UTC',
                        hour12: true,
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                  </TableCell>
                  <TableCell
                  padding='checkbox'
                    sx={{ 
                      border: '1px solid #E7E8EA',
                      color: '#06152B',
                      fontFamily: 'Inter-Medium',
                      fontSize: '0.875rem'
                    }}
                  >
                    <div className='w-full flex items-center justify-center gap-3'>
                      <BiSolidPencil color='#00457C' size={20} className='cursor-not-allowed' />
                      <FaRegTrashAlt color='#CB4B6C' size={18} className='cursor-not-allowed' />
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
            <button type='button' onClick={() => { setRowsPerPage(rows.length); setPage(1); }} className={`p-3 rounded-md ${rowsPerPage === rows.length ? 'text-white bg-[#00457C]' : 'text-[#1C1C1C] bg-transparent'}`}>All</button>
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