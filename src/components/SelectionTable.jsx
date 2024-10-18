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
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';

//records factory

function createData(id, name, email) {
    return {
      id,
      name,
      email,
    };
  }
  
  // Function to generate a random name
  function getRandomName() {
    const names = [
      'Talha', 'Ali', 'Munawar', 'Faraz', 'Muhammad', 
      'Sara', 'Aisha', 'Zain', 'Hina', 'Omar', 
      'Aliya', 'Rashid', 'Sana', 'Usman', 'Maya',
      // Add more names as needed
    ];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  // Function to generate a random email
  function getRandomEmail(name) {
    const domains = ['gmail.com', 'hazen.com', 'yahoo.com', 'outlook.com'];
    return `${name.toLowerCase().replace(/\s+/g, '')}@${domains[Math.floor(Math.random() * domains.length)]}`;
  }
  
  const rows = [];
  for (let i = 1; i <= 100; i++) {
    const name = getRandomName();
    const email = getRandomEmail(name);
    rows.push(createData(i, name, email));
  }
  
  

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
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            align='left'
            padding='normal'
            sx={{ backgroundColor: '#FBFBFB', border: '1px solid #E7E8EA', fontFamily: 'Inter-Semibold', fontSize: '13px', color: '#535353'}}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox" sx={{ background: '#FBFBFB', borderRight: "1px solid #E7E8EA", borderTop: '1px solid #E7E8EA' }} >
          <Checkbox
            color="#fff" 
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all items',
            }}
            sx={{
              '&.Mui-checked': {
                color: '#00457C',
              },
            }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function SelectionTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{maxHeight: {lg:'279px', xl: '352px'}, overflowY: 'auto' }}>
          <Table
            sx={{ minWidth: 350, borderCollapse: 'collapse' }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer', border: '1px solid #E7E8EA'}}
                    className={index % 2 !== 0 ? 'even-row' : ''}
                  >
                    <TableCell
                      sx={{ minWidth: 150, border: '1px solid #E7E8EA', fontFamily: 'Inter-Regular', fontSize: '13px', color: '#06152B', fontWeight: '400' }}
                      padding="normal"
                    >
                        <span className='flex items-center gap-1'>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR34VNI2RCmMP7q-xSlNft7ya1cNF_HxOZ-xA&s" 
                                alt="user"
                                className='w-10 h-10 rounded-full object-cover' 
                            />
                            {row.name}
                        </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ border: '1px solid #E7E8EA', fontFamily: 'Inter-Regular', fontSize: '13px', color: '#06152B'}}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        sx={{
                          '&.Mui-checked': {
                            color: '#00457C',
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
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
  );
}
