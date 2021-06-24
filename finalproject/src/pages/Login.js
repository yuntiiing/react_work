import { Link as RouterLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import AppContext from 'src/Context';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';

const Login = () => {
  const { login } = useContext(AppContext);
  const [account, setAccount] = useState({});

  const loginuser = (e, field) => {
    setAccount({
      ...account,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              id: '123',
              password: 'password123'
            }}
            validationSchema={Yup.object().shape({
              id: Yup.string().max(5),
              password: Yup.string().max(255)
            })}
            onSubmit={() => {
              login(account);
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  type="text"
                  margin="normal"
                  variant="outlined"
                  name="id"
                  label="ID"
                  placeholder={values.id}
                  onBlur={handleBlur}
                  onChange={(e) => loginuser(e, 'id')}
                  helperText={touched.id && errors.id}
                  error={Boolean(touched.id && errors.id)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  type="Password"
                  margin="normal"
                  variant="outlined"
                  name="password"
                  label="PASSWORD"
                  placeholder={values.password}
                  onBlur={handleBlur}
                  onChange={(e) => loginuser(e, 'phone')}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
