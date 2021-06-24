import { useContext, useState } from 'react';
import AppContext from 'src/Context';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

const SalesReportList = () => {
  const {
    sales,
    salesLength,
  } = useContext(AppContext);

  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return !salesLength ? (
    <p>{salesLength === null ? '' : ''}</p>
  ) : (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>客戶編號</TableCell>
                <TableCell>客戶名稱</TableCell>
                <TableCell>總銷售金額</TableCell>
                <TableCell>總利潤</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.slice(0, limit).map(({
                CustId,
                CustName,
                Total,
                Profit,
              }) => (
                <TableRow
                  hover
                  key={CustId}
                >
                  <TableCell>{CustId}</TableCell>
                  <TableCell>{CustName}</TableCell>
                  <TableCell>{Total}</TableCell>
                  <TableCell>{Profit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={sales.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[100, 200, 500]}
      />
    </Card>
  );
};

export default SalesReportList;
