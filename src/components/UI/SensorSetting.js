import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { MemoryRouter as Router } from 'react-router';

import {useLocation, useHistory} from 'react-router-dom';

//import { withRouter } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import ContactlessIcon from '@material-ui/icons/Contactless';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';


import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';


import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    iconbutton: {
        padding: theme.spacing(0),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    list: {
        width: 250,
      },
    fullList: {
        width: 'auto',
      },
  }),'Sensor');



  

const SensorSetting = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

//    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
      console.log('[SETTINGS]', props.rdx_devices)
    }, [props.rdx_devices])

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setOpen(open);
      };

    const BadgedCompareArrowsIcon = (device) => (
          <Badge color="primary" badgeContent={'N'} invisible={!device.isNew}>
               <CompareArrowsIcon color="secondary" fontSize="large" />
          </Badge>  
    )

    const BadgedContactlessIcon = (device) => (
      <Badge color="primary" badgeContent={'N'} invisible={!device.isNew}>
           <ContactlessIcon color="secondary" fontSize="large" />
      </Badge>  
)
    const sensorSelectedHandler = (id) => {

        toggleDrawer(false);
        history.push({pathname: '/sensor?' + id})
    }
    
      const list = anchor => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >

        <Router>
          <List
                component="nav"
                aria-labelledby="capteurs-subheader"
                subheader={
                  <ListSubheader component="div" id="capteurs-subheader">
                    Capteurs
                  </ListSubheader>
                }
                className={classes.root}
          >

            {props.rdx_devices.map((device, index) => (

                <ListItem button key={device.id} onClick={(value) => sensorSelectedHandler(device.id)} >
                    <ListItemIcon>{device.connect === 'serial' ? <BadgedCompareArrowsIcon /> : <BadgedContactlessIcon />}</ListItemIcon>
                    <ListItemText primary={device.alias || device.id} />
                </ListItem>


            ))}

          </List>
        </Router>

        </div>
      );


    return (
        <div>
            <IconButton  className={classes.iconbutton} color="secondary" aria-label="info"  onClick={toggleDrawer(true)}>
                <SettingsInputComponentIcon fontSize='large'/>
            </IconButton>

            <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
                    {list('right')}
          </Drawer>

        </div>
    )
}
const mapStateToProps = (state) => {
  return {
    rdx_devices: state.generic.devices
  }
}

const MapDispatchToProps = dispatch => {
  return {
  }

}

export default connect(mapStateToProps, MapDispatchToProps)(SensorSetting);
//export default withRouter(SensorSetting)
