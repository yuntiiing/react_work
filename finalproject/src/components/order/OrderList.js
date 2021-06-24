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
  IconButton,
  Button
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import OrderForm from 'src/components/order/OrderForm';
import OrderSearch from 'src/components/order/OrderSearch';
import {
  Edit,
  Trash2,
  XSquare,
  CheckSquare,
  Search
} from 'react-feather';

const OrderList = () => {
  const {
    orders,
    employee,
    customer,
    press,
    searchOrder,
    updateOrder,
    deleteOrder,
    editMode,
    cancelEdit,
  } = useContext(AppContext);
  const [newData, setNewData] = useState({});
  const [press1, setPress1] = useState(false);

  const search = (OrderId, field) => {
    searchOrder({ [field]: OrderId });
  };

  const saveBtn = () => {
    console.log(newData);
    updateOrder(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (OrderId,
    EmpId,
    CustId,
    OrderDate,
    Descript) => {
    setNewData({
      OrderId,
      EmpId,
      CustId,
      OrderDate,
      Descript
    });
    editMode(OrderId);
  };

  const deleteConfirm = (OrderId) => {
    if (window.confirm('訂單明細會一併刪除，請問是否確認刪除?')) {
      deleteOrder(OrderId);
    }
  };

  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (press === true) ? (<OrderSearch />
  ) : (
    <Card>
      {(press1 === true ? (
        <OrderForm />
      ) : (
        <Button align="right" variant="contained" color="secondary" size="large" style={{ marginLeft: 1500, marginTop: 20 }} onClick={() => setPress1(true)}>
          新增訂單
        </Button>
      ))}
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>序　　號</TableCell>
                <TableCell>訂單編號</TableCell>
                <TableCell>員工代號</TableCell>
                <TableCell>客戶代號</TableCell>
                <TableCell>訂貨日期</TableCell>
                <TableCell>備　　註</TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(0, limit).map(({
                seq,
                OrderId,
                EmpId,
                CustId,
                OrderDate,
                Descript,
                isEditing,
              }) => (
                isEditing === true ? (
                  <TableRow
                    hover
                    key={OrderId}
                  >
                    <TableCell>{seq}</TableCell>
                    <TableCell>{OrderId}</TableCell>
                    <TableCell>
                      <select id="EmpId" defaultValue={EmpId} onChange={(e) => updateNewData(e, 'EmpId')}>
                        {employee.map((employees) => (
                          <option key={employees.EmpId} value={employees.EmpId}>
                            {employees.EmpId}
                            &nbsp;－&nbsp;
                            {employees.EmpName}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <select id="EmpId" defaultValue={CustId} onChange={(e) => updateNewData(e, 'CustId')}>
                        {customer.map((customers) => (
                          <option key={customers.CustId} value={customers.CustId}>
                            {customers.CustId}
                            &nbsp;－&nbsp;
                            {customers.CustName}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <input
                        type="date"
                        defaultValue={OrderDate}
                        onChange={(e) => updateNewData(e, 'OrderDate')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={Descript}
                        onChange={(e) => updateNewData(e, 'Descript')}
                      />
                    </TableCell>
                    <TableCell />
                    <TableCell>
                      <IconButton color="secondary" className="btn green-btn" onClick={() => saveBtn()}>
                        <CheckSquare />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton className="btn default-btn" onClick={() => cancelEdit(OrderId)}>
                        <XSquare />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    hover
                    key={OrderId}
                  >
                    <TableCell>{seq}</TableCell>
                    <TableCell>{OrderId}</TableCell>
                    <TableCell>{EmpId}</TableCell>
                    <TableCell>{CustId}</TableCell>
                    <TableCell>{OrderDate}</TableCell>
                    <TableCell>{Descript}</TableCell>
                    <TableCell>
                      <IconButton color="secondary" className="btn green-btn" onClick={() => search(OrderId, 'OrderId')}>
                        <Search />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" className="btn default-btn" onClick={() => enableEdit(OrderId, EmpId, CustId, OrderDate, Descript)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton disald className="btn red-btn" onClick={() => deleteConfirm(OrderId)}>
                        <Trash2 />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={orders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[50, 100, 500]}
      />
    </Card>
  );
};

export default OrderList;
