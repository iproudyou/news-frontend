import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { submitLogOut } from '../../signUp/stores/authApi';
import { pullNewsApi } from '../../articles/stores/newsApi';
import authContext from '../../signUp/stores/authContext';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: "white",
    },
    menuItem: {
      fontSize: "12px",
    },
}));

export default function Header() {
    const { state, dispatch } = useContext(authContext);
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handlePullNews = React.useCallback(async () => {
      await pullNewsApi();
    });

    const onLogOut = React.useCallback(async () => {
        const result = await submitLogOut();
        if (result.status === 200) {
            Cookies.remove("x_auth_access");
            Cookies.remove("x_auth_refresh");

            dispatch({type: "SET_USER", user: {}});
            history.push("/login");
        }
    });
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                News
            </Typography>
            <Button className={classes.link} onClick={onLogOut}>Logout</Button>
            <>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} className={classes.menuItem}>{state.user.firstName}</MenuItem>
                    { state.user.role === 'admin' && 
                      <MenuItem onClick={handlePullNews} className={classes.menuItem}>Pull News</MenuItem>
                    }
                </Menu>
            </>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
