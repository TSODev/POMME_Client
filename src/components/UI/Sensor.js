import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
//import InfoIcon from '@material-ui/icons/Info';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    iconbutton: {
        padding: theme.spacing(0),
    }
  }),'Sensor');

const Sensor = (props) => {

    const classes = useStyles();

    const onInfoClicked = () => {
        console.log('clicked');
    }
    return (
        <div>
            <IconButton  className={classes.iconbutton} color="secondary" aria-label="info"  onClick={onInfoClicked}>
                <SettingsIcon fontSize='large'/>
            </IconButton>
        </div>
    )
}

export default Sensor
