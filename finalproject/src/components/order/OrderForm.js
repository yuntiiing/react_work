import { useState, useContext } from 'react';
import AppContext from 'src/Context';
import {
  TextField,
  Box,
  CardContent,
  Card,
  MenuItem
} from '@material-ui/core';

const OrderFrom = () => {
  const {
    insertOrder,
    employee,
    customer,
    product
  } = useContext(AppContext);
  const [newOrder, setNewOrder] = useState({});

  const addNewOrder = (e, field) => {
    setNewOrder({
      ...newOrder,
      [field]: e.target.value,
    });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    insertOrder(newOrder);
    e.target.reset();
  };

  return (
    <Card>
      <CardContent align="center">
        <Box sx={{ maxWidth: 3000 }}>
          <form className="insertForm" onSubmit={submitOrder}>
            <h3 style={{ margin: 10 }} align="center">新增訂單</h3>
            <TextField
              require
              select
              type="text"
              variant="outlined"
              label="員工代號"
              id="EmpId"
              name="EmpId"
              style={{ margin: 10, width: 150 }}
              onChange={(e) => addNewOrder(e, 'EmpId')}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {employee.map(({ EmpId, EmpName }) => (
                <MenuItem key={EmpId} value={EmpId}>
                  {EmpId}
                  &nbsp;－&nbsp;
                  {EmpName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              require
              select
              type="text"
              variant="outlined"
              label="部門代號"
              id="CustId"
              name="CustId"
              style={{ margin: 10, width: 400 }}
              onChange={(e) => addNewOrder(e, 'CustId')}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {customer.map(({ CustId, CustName }) => (
                <MenuItem key={CustId} value={CustId}>
                  {CustId}
                  &nbsp;－&nbsp;
                  {CustName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              require
              type="date"
              variant="outlined"
              label="訂單日期"
              id="OrderDate"
              name="OrderDate"
              style={{ margin: 10 }}
              onChange={(e) => addNewOrder(e, 'OrderDate')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="text"
              variant="outlined"
              label="備　　註"
              id="Descript"
              name="Descript"
              defaultValue={null}
              style={{ margin: 10 }}
              onChange={(e) => addNewOrder(e, 'Descript')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <TextField
              require
              select
              type="text"
              variant="outlined"
              label="產品編號"
              id="ProdId"
              name="ProdId"
              style={{ margin: 10, width: 500 }}
              onChange={(e) => addNewOrder(e, 'ProdId')}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {product.map(({ ProdID, ProdName }) => (
                <MenuItem key={ProdID} value={ProdID}>
                  {ProdID}
                  &nbsp;－&nbsp;
                  {ProdName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              require
              type="text"
              variant="outlined"
              label="數　　量"
              placeholder="請輸入數量"
              id="Qty"
              name="Qty"
              style={{ margin: 10 }}
              onChange={(e) => addNewOrder(e, 'Qty')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="折　　扣"
              placeholder="請輸入折扣"
              id="Discount"
              name="Discount"
              style={{ margin: 10 }}
              onChange={(e) => addNewOrder(e, 'Discount')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="submit"
              value="新增"
              style={{ margin: 10 }}
            />
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderFrom;
