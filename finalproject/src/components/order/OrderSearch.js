import { useContext, useState, Fragment } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AppContext from 'src/Context';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  IconButton,
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import {
  Edit,
  Trash2,
  CheckSquare,
  XSquare,
  CornerUpLeft
} from 'react-feather';
import OrderdetailForm from 'src/components/order/OrderdetailForm';
// import OrderList from 'src/components/order/OrderList';
// import Order from 'src/pages/Order';

const OrderSearch = () => {
  const {
    sorder,
    product,
    orderdetail,
    orderdetailLength,
    pressSet,
    updateOrderdetail,
    deleteOrderdetail,
    editMode1,
    cancelEdit1,
  } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [press, setPress] = useState(false);
  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateOrderdetail(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit1 = (seq,
    ProdId,
    Qty,
    Discount) => {
    setNewData({
      seq,
      ProdId,
      Qty,
      Discount
    });
    editMode1(seq);
  };

  const deleteConfirm = (seq) => {
    if (window.confirm('請問是否確認刪除?')) {
      deleteOrderdetail(seq);
    }
  };

  return !orderdetailLength ? (
    <p>{orderdetailLength === null ? 'Loading...' : '查無此訂單'}</p>
  ) : (
    <TableContainer component={Paper}>
      {(press === true ? (
        <OrderdetailForm />
      ) : (
        <Button align="right" variant="contained" color="secondary" size="large" style={{ marginLeft: 1500, marginTop: 20 }} onClick={() => setPress(true)}>
          新增產品
        </Button>
      ))}
      <br />
      <IconButton style={{ textAlign: 'right', }} edgeEnd className="btn default-btn" onClick={() => pressSet(false)}>
        <CornerUpLeft />
      </IconButton>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>序　　號</TableCell>
            <TableCell>訂單編號</TableCell>
            <TableCell>員工代號</TableCell>
            <TableCell>客戶代號</TableCell>
            <TableCell>訂貨日期</TableCell>
            <TableCell>備　　註</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorder.map(({
            OrderId,
            EmpId,
            CustId,
            OrderDate,
            Descript
          }) => (
            <Fragment key={OrderId}>
              <TableRow key={OrderId}>
                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>{sorder[0].seq}</TableCell>
                <TableCell>{OrderId}</TableCell>
                <TableCell>{EmpId}</TableCell>
                <TableCell>{CustId}</TableCell>
                <TableCell>{OrderDate}</TableCell>
                <TableCell>{Descript}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        訂單明細
                      </Typography>
                      <Table aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell>序　　號</TableCell>
                            <TableCell>訂單編號</TableCell>
                            <TableCell>產品代號</TableCell>
                            <TableCell>數　　量</TableCell>
                            <TableCell>折　　扣</TableCell>
                            <TableCell />
                            <TableCell />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderdetail.map(({
                            seq,
                            ProdId,
                            Qty,
                            Discount,
                            isEditings
                          }) => (
                            isEditings === true ? (
                              <TableRow key={seq}>
                                <TableCell style={{ width: 100 }} />
                                <TableCell>{seq}</TableCell>
                                <TableCell>{OrderId}</TableCell>
                                <TableCell>
                                  <select id="ProdId" defaultValue={ProdId} onChange={(e) => updateNewData(e, 'ProdId')}>
                                    {product.map((products) => (
                                      <option key={products.ProdID} value={products.ProdID}>
                                        {products.ProdID}
                                        &nbsp;－&nbsp;
                                        {products.ProdName}
                                      </option>
                                    ))}
                                  </select>
                                </TableCell>
                                <TableCell>
                                  <input
                                    type="text"
                                    defaultValue={Qty}
                                    onChange={(e) => updateNewData(e, 'Qty')}
                                  />
                                </TableCell>
                                <TableCell>
                                  <input
                                    type="text"
                                    defaultValue={Discount}
                                    onChange={(e) => updateNewData(e, 'Discount')}
                                  />
                                </TableCell>
                                <TableCell>
                                  <IconButton color="secondary" className="btn green-btn" onClick={() => saveBtn()}>
                                    <CheckSquare />
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <IconButton className="btn default-btn" onClick={() => cancelEdit1(seq)}>
                                    <XSquare />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ) : (
                              <TableRow key={seq}>
                                <TableCell style={{ width: 100 }} />
                                <TableCell>{seq}</TableCell>
                                <TableCell>{OrderId}</TableCell>
                                <TableCell>{ProdId}</TableCell>
                                <TableCell>{Qty}</TableCell>
                                <TableCell>{Discount}</TableCell>
                                <TableCell>
                                  <IconButton color="primary" className="btn default-btn" onClick={() => enableEdit1(seq, ProdId, Qty, Discount)}>
                                    <Edit />
                                  </IconButton>
                                </TableCell>
                                <TableCell>
                                  <IconButton disald className="btn red-btn" onClick={() => deleteConfirm(seq)}>
                                    <Trash2 />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            )))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderSearch;
