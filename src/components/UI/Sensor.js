import React, {useState, useEffect} from 'react';

import axios from '../../axios';
import SENSORS from '../../utilities/sensors'

import {useLocation, useHistory} from 'react-router-dom';
//import { withRouter } from 'react-router-dom';

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
        height: 150,
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
    const [sensor, setsensor] = useState({loaded:false, error:false, device: {type: 'unknow', connect: 'unknow'}})

    useEffect(() => {
        console.log('[SENSOR]-id', id);
        axios
        .get("/sensor?Id=" + id)
        .then(function(response) {
                console.log(response.data);
                setsensor({loaded: true, error: false, device: JSON.parse(response.data)})
        })
        .catch(function(error) {
                console.log(error);
                return({error: true})
        });
    },[id])

    useEffect(() => {
        console.log('[SENSOR]-sensor', sensor, SENSORS);
        setalias(sensor.device.alias)
        setsensorimage(sensor.device.type.concat('.png'))
        setconnectimage(sensor.device.connect.concat('.png'))

        
    }, [sensor])


    const handleChange = (event) => {
        console.log(event.target.value);
        setalias(event.target.value);
    }

    const handleSave = () => {
        console.log('Update ->', sensor.device)
        axios
          .put("/update?Id=" + sensor.device.id, {
            isNew: false,
            id: sensor.device.id,
            alias: alias,
            connect: sensor.device.connect,
            type: sensor.device.type
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
        history.goBack()
    }

    const handleCancel = () => {
        history.goBack()
    }


    return (

        <React.Fragment>
            {sensor.loaded ?
            <div>
            <Box className={classes.root}>
                <Grid container >
                    <Grid item xs={12}>
                        <Grid container   direction="row" justify="stretch" alignItems="center">
                            <Grid  className={classes.grid} item xs={4} >
                                <Typography variant='h6'> {sensor.device.type} </Typography>
                                <img className={classes.sensortype} src={sensorimage} alt={sensor.device.type} />
                            </Grid>
                            <Grid className={classes.grid} item xs={4} >
                                <Typography variant='body1'> {id} </Typography>
                                <img className={classes.sensorconnect} src={connectimage} alt={sensor.device.connect} />
                            </Grid>
                            <Grid className={classes.grid} item xs={4} >
                                <FormControl>
                                <InputLabel htmlFor={sensor.device.id}>Alias</InputLabel>
                                <OutlinedInput id={sensor.device.id} value={alias || ''} onChange={handleChange} />
                                <FormHelperText id="my-helper-text">Donnez un nom à ce capteur</FormHelperText>
                                </FormControl>
                                <FormGroup className={classes.capabilities}>
                                    <SensorCapabilities sensor={sensor.device}/>
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

//export default withRouter(Sensor)
export default Sensor