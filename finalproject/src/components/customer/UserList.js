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

const UserList = () => {
  const {
    users,
    userLength,
    editMode,
    cancelEdit,
    updateUser,
    deleteUser,
  } = useContext(AppContext);
  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateUser(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };
  const enableEdit = (Empid, EmpName, DeptId, JobTitle, City, Address, Phone) => {
    setNewData({
      Empid,
      EmpName,
      DeptId,
      JobTitle,
      City,
      Address,
      Phone
    });
    editMode(Empid);
  };

  const deleteConfirm = (Empid) => {
    if (window.confirm('請問是否確認刪除?')) {
      deleteUser(Empid);
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

  return !userLength ? (
    <p>{userLength === null ? 'Loading...' : 'Please insert some users.'}</p>
  ) : (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>員工編號</TableCell>
                <TableCell>員工姓名</TableCell>
                <TableCell>部門名稱</TableCell>
                <TableCell>職　　稱</TableCell>
                <TableCell>縣　　市</TableCell>
                <TableCell>住　　址</TableCell>
                <TableCell>電　　話</TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map(({
                Empid,
                EmpName,
                DeptId,
                JobTitle,
                City,
                Address,
                Phone,
                isEditing,
              }) => (
                isEditing === true ? (
                  <TableRow
                    hover
                    key={Empid}
                  >
                    <TableCell onChange={(e) => updateNewData(e, 'Empid')}>
                      { Empid }
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={EmpName}
                        onChange={(e) => updateNewData(e, 'EmpName')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={DeptId}
                        onChange={(e) => updateNewData(e, 'DeptId')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={JobTitle}
                        onChange={(e) => updateNewData(e, 'JobTitle')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={City}
                        onChange={(e) => updateNewData(e, 'City')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={Address}
                        onChange={(e) => updateNewData(e, 'Address')}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        defaultValue={Phone}
                        onChange={(e) => updateNewData(e, 'Phone')}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="secondary" className="btn green-btn" onClick={() => saveBtn()}>
                        <CheckSquare />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton className="btn default-btn" onClick={() => cancelEdit(Empid)}>
                        <XSquare />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    hover
                    key={Empid}
                  >
                    <TableCell>{Empid}</TableCell>
                    <TableCell>{EmpName}</TableCell>
                    <TableCell>{DeptId}</TableCell>
                    <TableCell>{JobTitle}</TableCell>
                    <TableCell>{City}</TableCell>
                    <TableCell>{Address}</TableCell>
                    <TableCell>{Phone}</TableCell>
                    <TableCell>
                      <IconButton color="primary" className="btn default-btn" onClick={() => enableEdit(Empid, EmpName, DeptId, JobTitle, City, Address, Phone)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton disald className="btn red-btn" onClick={() => deleteConfirm(Empid)}>
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
        count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[50, 100, 200]}
      />
    </Card>
  );
};

export default UserList;
