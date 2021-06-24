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
  IconButton
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Edit,
  Trash2,
  XSquare,
  CheckSquare
} from 'react-feather';

const ProductList = () => {
  const {
    products,
    editMode,
    cancelEdit,
    updateProduct,
    deleteProduct,
    productLength,
  } = useContext(AppContext);

  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateProduct(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (id,
    ProdName,
    ProdID,
    UnitPrice,
    Cost) => {
    setNewData({
      id,
      ProdName,
      ProdID,
      UnitPrice,
      Cost
    });
    editMode(id);
  };

  const deleteConfirm = (ProdID) => {
    if (window.confirm('請問是否確認刪除?')) {
      deleteProduct(ProdID);
    }
  };

  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return !productLength ? (
    <p>{productLength === null ? 'Loading...' : 'Please insert some product.'}</p>
  ) : (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>產品編號</TableCell>
                <TableCell>產品名稱</TableCell>
                <TableCell>單　　價</TableCell>
                <TableCell>成　　本</TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(({
                ProdID,
                id = ProdID,
                ProdName,
                UnitPrice,
                Cost,
                isEditing,
              }) => (
                isEditing === true ? (
                  <TableRow
                    hover
                    key={id}
                  >
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={ProdID}
                        onChange={(e) => updateNewData(e, 'ProdID')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={ProdName}
                        onChange={(e) => updateNewData(e, 'ProdName')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={UnitPrice}
                        onChange={(e) => updateNewData(e, 'UnitPrice')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="cost"
                        defaultValue={Cost}
                        onChange={(e) => updateNewData(e, 'Cost')}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="secondary" className="btn green-btn" onClick={() => saveBtn()}>
                        <CheckSquare />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton className="btn default-btn" onClick={() => cancelEdit(id)}>
                        <XSquare />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    hover
                    key={id}
                  >
                    <TableCell>{ProdID}</TableCell>
                    <TableCell>{ProdName}</TableCell>
                    <TableCell>{UnitPrice}</TableCell>
                    <TableCell>{Cost}</TableCell>
                    <TableCell>
                      <IconButton color="primary" className="btn default-btn" onClick={() => enableEdit(id, ProdName, ProdID, UnitPrice, Cost)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton disald className="btn red-btn" onClick={() => deleteConfirm(ProdID)}>
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
        count={products.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[20, 50, 100]}
      />
    </Card>
  );
};

export default ProductList;
