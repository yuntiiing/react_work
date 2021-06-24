import { useState, useContext } from 'react';
import AppContext from 'src/Context';
import {
  TextField,
  Box,
  CardContent,
  Card
} from '@material-ui/core';

const SalesReportFrom = () => {
  const { SalesSelect } = useContext(AppContext);
  const [selectSales, setSelectSales] = useState({});

  // Storing the Insert User Form Data.
  const SelectSalesReport = (e, field) => {
    setSelectSales({
      ...selectSales,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitSales = (e) => {
    e.preventDefault();
    SalesSelect(selectSales);
  };

  return (
    <Card>
      <CardContent align="center">
        <Box sx={{ maxWidth: 500 }}>
          <form className="SelectForm" onSubmit={submitSales}>
            <TextField
              require
              type="date"
              variant="outlined"
              label="開始日期"
              placeholder="請輸入日期"
              id="startdate"
              name="startdate"
              style={{ margin: 10 }}
              defaultValue="2016-01-02"
              onChange={(e) => SelectSalesReport(e, 'startdate')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="date"
              variant="outlined"
              label="結束日期"
              placeholder="請輸入日期"
              id="enddate"
              name="enddate"
              defaultValue="2018-12-30"
              style={{ margin: 10 }}
              onChange={(e) => SelectSalesReport(e, 'enddate')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="submit"
              value="查詢"
              style={{ margin: 10 }}
            />
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesReportFrom;
