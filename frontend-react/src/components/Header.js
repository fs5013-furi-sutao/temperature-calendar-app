import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Drawer from '@material-ui/core/Drawer';
// import { Link } from 'react-router-dom'
// import { Link } from 'gatsby';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
// import About from './About';
// import Home from './Home';

const styles = {
    list: {
        width: 250,
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends Component {
    state = {
        left: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="relative" color="inherit">
                    <Toolbar>
                        <h1>
                            <Link to="/">体温管理アプリ</Link>
                        </h1>
                        <Navbar />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);