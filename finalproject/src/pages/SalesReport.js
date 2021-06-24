import { Helmet } from 'react-helmet';
import {
  Box,
} from '@material-ui/core';
import AppContext from 'src/Context';
import ActionsS from 'src/ActionsS';
import SalesReportFrom from 'src/components/salesreport/SalesReportFrom';
import SalesReportList from 'src/components/salesreport/SalesReportList';

const SalesReport = () => {
  const data = ActionsS();

  return (
    <AppContext.Provider value={data}>
      <>
        <Helmet>
          <title>Products | Material Kit</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <div className="App">
            <h1 align="center">銷售報表</h1>
            <br />
            <SalesReportFrom />
            <br />
            <SalesReportList />
          </div>
        </Box>
      </>
    </AppContext.Provider>
  );
};

export default SalesReport;
