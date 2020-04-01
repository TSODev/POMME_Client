import React, {useState, useEffect} from 'react';

import SENSORS from '../utilities/sensors';

import EnabledCapability from './UI/EnabledCapabilty';
import EnabledRDXCapability from './UI/EnabledRDXCapabilty';

import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import SVGSensorIcon from './UI/SVGIcons/SVGSensorIcon';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        minHeigth: '100vh',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        textAlign: 'left',
        margin: theme.spacing(0),
        padding: theme.spacing(0),
      },
      title: {
          color: '#FFF',
          backgroundColor: theme.palette.background.secondary,
          borderRadius: theme.spacing(4),
          paddingTop:  theme.spacing(1),
          textAlign: 'center',
          height:  theme.spacing(7),
          margin:  theme.spacing(1,1,1,1)
      }
  }),{name:'DeviceLayout'});


const DeviceLayout = (props) => {

    const classes = useStyles();
    const [selected, setSelected] = useState([])

    useEffect(() => {
        console.log('[DEVICELAYOUT]', props.device)
        let arr = []
        SENSORS.capabilities.map((c,index) => 
            arr = arr.concat([{name: c, value: getDeviceCapabityEnable(props.device.sensor, c)}])
        )
        setSelected(arr)
    }, [props.device])

    const getDeviceCapabityEnable = (sensor, capabilityName) => {
        const obj = {}                                                  //help with cannot convert undefined to object
        Object.assign(obj, sensor)
        console.log('[GETDEVICECAPABILITY]', obj, capabilityName, Object.entries(obj))
        for (let [key, value] of (Object.entries(obj))) {
            if (key === capabilityName)
                return value;
        }
    }


    return (
        <React.Fragment>
            {(props.device.connect === 'rabbitmq') ?
                <div className={classes.root}>
                    <Divider variant='fullWidth' />
                    <Grid container>

                    <Grid className={classes.title} item sm={4}>
                    <Typography variant='h4'>
                        {props.device.alias || props.device.id}
                    </Typography>
                    </Grid>

                    {
                        (typeof(selected) !== 'undefined') ?
                        selected.map((c,index) => 
                            <EnabledRDXCapability className={classes.root} key={index} device={props.device} capability={c} />) : null
                    }
                    </Grid>
                </div>
            :
            <div>
                {(props.device.connect === 'serial') ?
                <div className={classes.root}>
                    <Divider variant='fullWidth' />
                    <Grid container>
                    <Grid className={classes.title} item sm={4}>
                    <Typography variant='h4'>
                        {props.device.alias || props.device.id}
                    </Typography>
                    </Grid>

                    {
                        (typeof(selected) !== 'undefined') ?
                        selected.map((c,index) => 
                            <EnabledCapability className={classes.root} key={index} device={props.device} capability={c} />) : null
                    }
                    </Grid>
                </div>
                :
                <p>Unknow sensor connector</p>
                }
            </div>
           } 


        </React.Fragment>
    )
}

export default DeviceLayout
