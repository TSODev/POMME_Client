import React, {useState, useEffect} from 'react';

import SENSORS from '../utilities/sensors';

import EnabledCapability from './UI/EnabledCapabilty';

import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        minHeigth: '100vh',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        textAlign: 'left',
      },
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
                    <Typography variant='h4'>
                        {props.device.alias || props.device.id}
                    </Typography>

                    {
                        (typeof(selected) !== 'undefined') ?
                        selected.map((c,index) => 
                            <EnabledCapability className={classes.root} key={index} device={props.device} capability={c} hasData={props.hasData} />) : null
                    }
                </div>
            :
            null
           } 


        </React.Fragment>
    )
}

export default DeviceLayout
