import { useContext, useState } from 'react';
import AppContext from 'src/Context';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  SvgIcon,
  IconButton
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Edit,
  Trash2,
  XSquare,
  CheckSquare
} from 'react-feather';

const ProductSearch = () => {
  const {
    sproduct,
    editMode,
    cancelEdit,
    updateProduct,
    deleteProduct,
    sproductLength
  } = useContext(AppContext);

  const [newData, setNewData] = useState({});
  const pordid = sproduct.ProdID;
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
    if (window.confirm('Are you sure?')) {
      deleteProduct(ProdID);
    }
  };

  return !sproductLength ? (
    <p>{sproductLength === null ? 'Loading...' : '查無此產品'}</p>
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
              {(sproduct.isEditing === true ? (
                <TableRow
                  hover
                  key={pordid}
                >
                  <TableCell>
                    <input
                      type="text"
                      defaultValue={sproduct.ProdID}
                      onChange={(e) => updateNewData(e, 'ProdID')}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      defaultValue={sproduct.ProdName}
                      onChange={(e) => updateNewData(e, 'ProdName')}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      defaultValue={sproduct.UnitPrice}
                      onChange={(e) => updateNewData(e, 'UnitPrice')}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="cost"
                      defaultValue={sproduct.Cost}
                      onChange={(e) => updateNewData(e, 'Cost')}
                    />
                  </TableCell>
                  <TableCell>
                    <button type="button" className="btn green-btn" onClick={() => saveBtn()}>
                      <SvgIcon
                        fontSize="medium"
                      >
                        <CheckSquare />
                      </SvgIcon>
                    </button>
                  </TableCell>
                  <TableCell>
                    <IconButton color="secondary" className="btn green-btn" onClick={() => saveBtn()}>
                      <CheckSquare />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton className="btn default-btn" onClick={() => cancelEdit(sproduct.ProdID)}>
                      <XSquare />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow
                  hover
                  key={pordid}
                >
                  <TableCell>{sproduct.ProdID}</TableCell>
                  <TableCell>{sproduct.ProdName}</TableCell>
                  <TableCell>{sproduct.UnitPrice}</TableCell>
                  <TableCell>{sproduct.Cost}</TableCell>
                  <TableCell>
                    <IconButton color="primary" className="btn default-btn" onClick={() => enableEdit(sproduct.ProdID, sproduct.ProdName, sproduct.ProdID, sproduct.UnitPrice, sproduct.Cost)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton disald className="btn red-btn" onClick={() => deleteConfirm(sproduct.ProdID)}>
                      <Trash2 />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default ProductSearch;
