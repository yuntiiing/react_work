import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import UserForm from 'src/components/customer/UserForm';
import UserList from 'src/components/customer/UserList';

const Customer = () => (
  <>
    <Helmet>
      <title>Employee | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <div className="App">
        <h1 align="center">員工資料</h1>
        <br />
        <UserForm />
        <br />
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Product"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
        <br />
        <UserList />
      </div>
    </Box>
  </>
);

export default Customer;
