import {Link, useNavigate, useParams} from 'react-router-dom'
import {useState , useEffect} from 'react';


import { alpha, makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import {
   
    Search,
    AccountCircle,
    Mail,
    Notifications,
    More
} from '@material-ui/icons'

import MenuIcon from '@material-ui/icons/Menu';
import GetAppIcon from '@material-ui/icons/GetApp';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,

} from '@material-ui/core'

import './Header.scss'


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));



const Header = () => {

    const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [drawerState, setDrawerState] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
    
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );


    const [searchText, setSearchText] = useState("")
    let navigate = useNavigate();

    useEffect(() => {
        if(searchText.length > 0) 
            navigate(`/search/${searchText}`)
        else
            navigate(`/movies`)    
    }, [searchText])

    return (
        <div className="header">



<div className={classes.grow}>
      <AppBar position="fixed" >
        <Toolbar className='head-appbar'>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerState(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/movies" className='header-links'>
               Movies
           </Link>

           <Link to="/tvShows" className='header-links'>
               TvShows
           </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=> setSearchText(e.target.value)} 
                value={searchText}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Mail />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
             
              aria-haspopup="true"
            
              color="inherit"
            >
              <More />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    
      {renderMenu}

      <Drawer open={drawerState} onClose={() => setDrawerState(false)}>
                <List component="nav">
                  <ListItem button>
                  
                      <div className="icon-head">
                      <GetAppIcon/>
                      </div>
                  

                    <ListItemText primary="Downloaded movies"/>

                  </ListItem>
                </List>
        </Drawer>
    </div>

            

           

           

         
           
        </div>
    )
}

export default Header;