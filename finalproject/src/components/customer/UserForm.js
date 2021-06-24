import { useState, useContext } from 'react';
import AppContext from 'src/Context';
import {
  TextField,
  Box,
  CardContent,
  Card
} from '@material-ui/core';

const UserForm = () => {
  const { insertUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitUser = (e) => {
    e.preventDefault();
    insertUser(newUser);
    e.target.reset();
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ maxWidth: 3000 }}>
          <form className="insertForm" onSubmit={submitUser}>
            <h3 style={{ margin: 10 }} align="center">新增員工</h3>
            <TextField
              require
              type="text"
              variant="outlined"
              label="姓名"
              placeholder="請輸入姓名"
              id="EmpName"
              name="EmpName"
              style={{ margin: 10 }}
              onChange={(e) => addNewUser(e, 'EmpName')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="部門代號"
              placeholder="請輸入部門代號"
              id="DeptId"
              name="DeptId"
              style={{ margin: 10 }}
              onChange={(e) => addNewUser(e, 'DeptId')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="職稱"
              placeholder="請輸入職稱"
              id="JobTitle"
              name="JobTitle"
              style={{ margin: 10 }}
              onChange={(e) => addNewUser(e, 'JobTitle')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="縣市"
              placeholder="請輸入縣市"
              id="City"
              name="City"
              style={{ margin: 10 }}
              onChange={(e) => addNewUser(e, 'City')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="地址"
              placeholder="請輸入地址"
              id="Address"
              name="Address"
              style={{ margin: 10 }}
              onChange={(e) => addNewUser(e, 'Address')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="電話"
              placeholder="請輸入電話"
              id="Phone"
              name="Phone"
              style={{ margin: 10 }}
              onChange={(e) => addNewUser(e, 'Phone')}
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

export default UserForm;
