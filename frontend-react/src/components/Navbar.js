import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CreateIcon from '@material-ui/icons/Create';

const styles = {
  list: {
    width: 250,
  },
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: 24,
  },
};

class Navbar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/">
          <CreateIcon className={classes.buttonIcon} />
           体温記録
        </Button>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to="/chart">
            <ShowChartIcon className={classes.buttonIcon} />
           グラフ
        </Button>
      </div >
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);