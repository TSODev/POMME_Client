import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import {useLocation, useHistory} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import SensorCapabilities from './SensorCapabilities';
import Spinner from './Spinner';

import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../redux/actions/index'


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #222',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    grid: {
        height: 300,
    },
    sensortype: {
        height: 250,
        width: 250,
    },
    sensorconnect: {
        height: 200,
        width: 200,
        marginTop: theme.spacing(5),
    },
    capabilities:{
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        marginLeft: theme.spacing(5),
    },
    calibration: {
        height: 200,
    },
    buttonGrid: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    }
  }),'Sensor');

  

const Sensor = (props) => {

    const classes = useStyles();
    let location = useLocation();
    let history = useHistory();
    const id = location.pathname.split('?')[1]

    const [alias, setalias] = useState('')
    const [sensorimage, setsensorimage] = useState('')
    const [connectimage, setconnectimage] = useState('')
    const [sensor, setsensor] = useState({loaded:false, error:false, device: {type: 'unknow', connect: 'unknow'}});
    const [loaded, setloaded] = useState(false)
    const [capabilities, setcapabilities] = useState({});

    useEffect(() => {
        const device = props.rdx_devices.filter(d => d.id === id)[0]
        console.log('[SENSOR]-id', id, device);
        setsensor(device)
        setalias(device.alias)
        setsensorimage(device.type.concat('.png'))
        setconnectimage(device.connect.concat('.png')) 
        setcapabilities(device.sensor)
        setloaded(true)
    },[id])

    const handleChange = (event) => {
        console.log(event.target.value);
        setalias(event.target.value);
    }

    const handleSave = () => {
        sensor.capabilities = capabilities;
        console.log('Update ->', sensor, alias)
        props.onDeviceUpdate(sensor, alias)
        history.goBack()
    }

    const handleCancel = () => {
        history.goBack()
    }

    const capabilityChangeHandler = (event) => {
        console.log('[CAPABILITIES]',event.target.name, event.target.checked);
        setcapabilities({...capabilities, [event.target.name]: event.target.checked})
    }

    return (

        <React.Fragment>
            {loaded ?
            <div>
            <Box className={classes.root}>
                <Grid container >
                    <Grid item xs={12}>
                        <Grid container   direction="row" justify="center" alignItems="center">
                            <Grid  className={classes.grid} item xs={4} >
                                <Typography variant='h6'> {sensor.type} </Typography>
                                <img className={classes.sensortype} src={sensorimage} alt={sensor.type} />
                            </Grid>
                            <Grid className={classes.grid} item xs={4} >
                                <Typography variant='body1'> {id} </Typography>
                                <img className={classes.sensorconnect} src={connectimage} alt={sensor.connect} />
                            </Grid>
                            <Grid className={classes.grid} item xs={4} >
                                <FormControl>
                                <InputLabel htmlFor={sensor.id}>Alias</InputLabel>
                                <OutlinedInput id={sensor.id} value={alias || ''} onChange={handleChange} />
                                <FormHelperText id="my-helper-text">Donnez un nom à ce capteur</FormHelperText>
                                </FormControl>
                                <FormGroup className={classes.capabilities}>
                                    {
                                       (typeof(capabilities) !== 'undefined')
                                            ? (<SensorCapabilities 
                                                sensor={sensor} 
                                                capabilities={capabilities}
                                                changeCapabilities={capabilityChangeHandler}/>)
                                            : null 
                                    }
                                </FormGroup>

                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Calibration</Typography>
                        <div className={classes.calibration}></div>
                    </Grid>
                    <Grid className={classes.buttonGrid} item xs={12}>
                        <Button className={classes.button} variant="outlined" color="secondary" onClick={handleCancel}>
                        Annuler
                        </Button>
                        <Button className={classes.button} variant="outlined" color="primary" onClick={handleSave}>
                        Valider
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            </div>
            :
           <Spinner />
            }

    </React.Fragment>
    )
}



const mapStateToProps = (state) => {
    return {
        rdx_devices: state.generic.devices,
    }
  }
  
  const MapDispatchToProps = dispatch => {
    return {
        onDeviceUpdate: (device, alias) => dispatch(actions.updateDevice(device, alias)),
        onDeviceLoad: (device) => dispatch(actions.loadDevice(device))
    }
  
  }
  
  export default connect(mapStateToProps, MapDispatchToProps)(Sensor);