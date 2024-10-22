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
import { GrSearch } from 'react-icons/gr';

import { useSidebar } from '../context/sidebarContext';

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

  const isChecked = rowCount > 0 && numSelected === rowCount;
  const isIndeterminate = numSelected > 0 && numSelected < rowCount;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            align="left"
            padding="normal"
            sx={{
              width: '45%',
              backgroundColor: '#FBFBFB',
              border: '1px solid #E7E8EA',
              fontFamily: 'Inter-Semibold',
              fontSize: '13px',
              color: '#535353',
            }}
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
        <TableCell
          padding="none"
          sx={{
            width: '5%',
            background: '#FBFBFB',
            borderRight: '1px solid #E7E8EA',
            borderTop: '1px solid #E7E8EA',
          }}
        >
          <Checkbox
            indeterminate={isIndeterminate}
            checked={isChecked}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all items',
            }}
            sx={{
              '&.Mui-checked': {
                color: '#00457C',
              }
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
}





export default function SelectionTable ( {unchecked} ) {

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState(''); // State for search input

  const { users, handleSelectUser, selectedUsers } = useSidebar();

  console.log("selected users: ", selectedUsers)

  const rows = users  //initialize with users

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
     console.log('handleSelectAllClick')
    if (selectedUsers.length === 0) {
      const allIds = rows.map((n) => parseInt(n.id));
      allIds.forEach(id => handleSelectUser(id)); 
    } else {
      handleSelectUser("emptyArray")
    }
  };

  // React.useEffect (()=> {
  //   handleSelectUser("emptyArray")
  // }, [])
  
  
  const handleClick = (event, id) => handleSelectUser(id)

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  const visibleRows = React.useMemo(() => {
    return [...rows]
      .filter(
        (row) =>
          row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort(getComparator(order, orderBy))
      .slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, searchQuery]);

  return (
    <Box sx={{ width: '100%' }}>
      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-9 bg-white border border-[##D9D9D9] outline-none focus:border-[#00457C] font-Inter-Regular text-sm text-primary placeholder:font-Roboto-Regular placeholder:text-[#545454] placeholder:text-sm rounded-md"
        />
        <GrSearch className="font-medium text-[#545454] absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2" size={16} />
      </div>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ minHeight: { lg: '472px', xl: '600px' }, maxHeight: { lg: '472px', xl: '500px' }, overflowY: 'auto' }}>
          <Table sx={{ minWidth: 350, borderCollapse: 'collapse' }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selectedUsers.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} align="center" sx={{ borderRight: '1px solid #E7E8EA', borderLeft: '1px solid #E7E8EA' }}>
                    <div className="w-full h-full FlexCenter font-Inter-SemiBold text-base text-primary italic">
                      <p> No results found! </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {visibleRows.map((row, index) => {
                const isItemSelected = selectedUsers.includes(row.id);
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
                    className={index % 2 !== 0 && 'bg-[#F5F8FA]'}
                    sx={{ cursor: 'pointer', border: '1px solid #E7E8EA', '&.Mui-selected': { 
                      backgroundColor: index % 2 !== 0 ? '#F5F8FA' : '#FFF'
                    }}}
                  >
                    <TableCell
                      sx={{
                        minWidth: 150,
                        border: '1px solid #E7E8EA',
                        fontFamily: 'Inter-Regular',
                        fontSize: '13px',
                        color: '#06152B',
                        fontWeight: '400',
                      }}
                      padding="checkbox"
                    >
                      <span className="flex items-center gap-1">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR34VNI2RCmMP7q-xSlNft7ya1cNF_HxOZ-xA&s"
                          alt="user"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {row.name}
                      </span>
                    </TableCell>
                    <TableCell align="left" sx={{ border: '1px solid #E7E8EA', fontFamily: 'Inter-Regular', fontSize: '13px', color: '#06152B' }}>
                      {row.email}
                    </TableCell>
                    <TableCell padding="none">
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
        <section className="w-full mt-5 2xl:mt-0 flex items-center justify-between">
          <section className="flex items-center gap-2 font-Roboto-Regular text-sm">
            <button
              type="button"
              onClick={() => setRowsPerPage(5)}
              className={`p-3 rounded-md ${rowsPerPage === 5 ? 'text-white bg-[#00457C]' : 'text-[#1C1C1C] bg-transparent'}  cursor-pointer`}
            >
              5
            </button>
            <button
              type="button"
              onClick={() => setRowsPerPage(10)}
              className={`p-3 rounded-md ${rowsPerPage === 10 ? 'text-white bg-[#00457C]' : 'text-[#1C1C1C] bg-transparent'}  cursor-pointer`}
            >
              10
            </button>
            <button
              type="button"
              onClick={() => {
                setRowsPerPage(rows.length);
                setPage(1);
              }}
              className={`p-3 rounded-md ${rowsPerPage === rows.length ? 'text-white bg-[#00457C]' : 'text-[#1C1C1C] bg-transparent'}`}
            >
              All
            </button>
          </section>
          <section>
            <Pagination count={Math.ceil(rows.length / rowsPerPage)} page={page} onChange={handleChangePage} shape="rounded" />
          </section>
        </section>
      </Paper>
    </Box>
  );
}
