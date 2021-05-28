import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Button, ButtonGroup,Checkbox, FormControlLabel,TextField,Typography,AppBar,Toolbar,IconButton,Menu,MenuItem} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles,ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import {green,orange} from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles=makeStyles({
  root:{
    background:'linear-gradient(45deg,#333,#999)',
    border:0,
    borderRadius:15,
    color:'white',
    padding:'5 30px',
    marginBottom:10,
  }
})

const theme=createMuiTheme({
  palette:{
    primary:{
      main:green[400],
    },
    secondary:{
      main:orange[400],
    }
  }
})

function ButtonStyled(){
  const classes=useStyles();
  return(
    <Button className={classes.root}>我是自帶樣式的按鈕</Button>
  )
}

function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);
  return(
    <FormControlLabel
      control={<Checkbox
      checked={checked}
      color="primary"
      onChange={(e)=>setChecked(e.target.checked)}
      inputProps={{'aria-label':'secondary checkbox'}}
      />} 
      label="Checkbox 測試"
    />
  )
}

function App() {
  const[anchorEl,setAnchorEl]=React.useState(null);
  const handleClick=(event)=>{
    setAnchorEl(event.currentTarget);
  };
  const handleClose=(event)=>{
    setAnchorEl(null);
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <AppBar>
            <Toolbar>
              <IconButton edge="start" colot="inherit" aria-label="menu">
                <MenuIcon aria-label="simple-menu" aria-haspopup="true" onClick={handleClick}/>
              </IconButton>
              <Menu id="simple-menu" 
              anchorEl={anchorEl} 
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
              <Typography variant="h6">
                News
              </Typography>
              <Button color="secondary" >
                LOGIN
              </Button>
            </Toolbar>
          </AppBar>
          <Typography variant="h3">
            歡迎來到 MUI
          </Typography>
          <Typography variant="subtitle1">
            Material UI
          </Typography>
          <ButtonStyled/>
          <TextField type="email" label="Email" placeholder="test@gmail.com"
            InputProps={{
              startAdornment:(
                <InputAdornment poistion="start">
                  <AccountCircle/>
                </InputAdornment>
              ),
            }} 
          />
          <CheckboxExample/>
          <ButtonGroup>
            <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} >
              SAVE
            </Button>
            <Button variant="contained" color="secondary" size="large" endIcon={<CloudUploadIcon />}> 
              UPLOAD 
            </Button>
          </ButtonGroup>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
