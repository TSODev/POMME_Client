import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'

import TempRDXMetrics from './Temp/TempRDXMetrics';
import TempRDXChart from './Temp/TempRDXChart';
import HumRDXMetrics from './Humidity/HumRDXMetrics';
import HumRDXChart from './Humidity/HumRDXChart';
import PresRDXMetrics from './Pressure/PresRDXMetrics';
import PresRDXChart from './Pressure/PresRDXChart';

import SyncLoader from 'react-spinners/SyncLoader';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        minHeigth: '100vh',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        textAlign: 'center',
      },
    mesures: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    grid: {
        width: '100%',
        border: 'none',
        borderWidth: 1,
        padding: theme.spacing(1),
        marginBottom: theme.spacing(2),
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    chart: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
      },
  }),{name:'EnablesCapability'});

const EnabledCapability = (props) => {

    const classes = useStyles();

    const [metrics, setmetrics] = useState()
    const [history, sethistory] = useState([])

    useEffect(() => {
        console.log('[DEVICELAYOUT]-[RDXCAPABILITY]', props.capability)


    }, [props.capability])

    useEffect(() => {
        console.log('[DEVICELAYOUT]-[RDXCAPABILITY]', props.device, props.rdx_hasESP32Metric)
        const deviceHistory = props.rdx_history.filter(h => h.device === props.device.id)
        sethistory(deviceHistory)
//        setmetrics(props.lastESP32Metric)

    }, [props.device, props.rdx_hasESP32Metric])

    const TempWidget = (props) => {
        return(
            <React.Fragment>
                {
                    (props.rdx_hasESP32Metric) ?
                <Box className={classes.root}>

                    <Grid className={classes.grid} item sm={12}>


                            <div>
                                <TempRDXMetrics values={props.rdx_lastESP32Metrics.values} hasData={props.rdx_hasESP32Metric}/>              
                                <TempRDXChart history={props.rdx_history} device={props.devices} value={props.rdx_lastESP32Metrics.values} hasData={props.rdx_hasESP32Metric}/>
                            </div>


                    </Grid>
                </Box>
                    :
                    <SyncLoader 
                        color='#ef702b'
                        size={10}
                        margin={5}
                    />
                    }
            </React.Fragment>
        )
    }
    const HumWidget = (props) => {
        return(
            <React.Fragment>
                {
                    (props.rdx_hasESP32Metric) ?
                <Box className={classes.root}>

                    <Grid className={classes.grid} item sm={12}>


                            <div>
                                <HumRDXMetrics values={props.rdx_lastESP32Metrics.values} hasData={props.rdx_hasESP32Metric}/>              
                                <HumRDXChart history={props.rdx_history} value={props.rdx_lastESP32Metrics.values} hasData={props.rdx_hasESP32Metric}/>
                            </div>


                    </Grid>
                </Box>
                    :
                    <SyncLoader 
                        color='#ef702b'
                        size={10}
                        margin={5}
                    />
                    }
            </React.Fragment>
        )
    }
    const PresWidget = (props) => {
        return(
            <React.Fragment>
                {
                    (props.rdx_hasESP32Metric) ?
                <Box className={classes.root}>

                    <Grid className={classes.grid} item sm={12}>


                            <div>
                                <PresRDXMetrics values={props.rdx_lastESP32Metrics.values} hasData={props.rdx_hasESP32Metric}/>              
                                <PresRDXChart history={props.rdx_history} value={props.rdx_lastESP32Metrics.values} hasData={props.rdx_hasESP32Metric}/>
                            </div>


                    </Grid>
                </Box>
                    :
                    <SyncLoader 
                        color='#ef702b'
                        size={10}
                        margin={5}
                    />
                    }
            </React.Fragment>
        )
    }


        return    (
            <Box className={classes.root}>
                <Grid className={classes.mesures} container justify="space-around" alignitem="center" spacing={1}>
                    {(props.capability.value) ?
                    <div className={classes.root}>
                    {
                        (props.capability.name === 'temperature' ? TempWidget(props) :
                        (props.capability.name === 'humidity' ? HumWidget(props) :
                        (props.capability.name === 'pressure' ? PresWidget(props) :
                        null)))
                    }
                    </div>
                    : null}
                </Grid>
            </Box>
            )

}

const mapStateToProps = (state) => {
    console.log('MapToState:', state)
    return {
        rdx_lastESP32Metrics : state.generic.lastESP32Metric,
        rdx_lastNanoMetrics: state.generic.lastNanoMetric,
        rdx_devices: state.generic.devices,
        rdx_history: state.generic.history,
        rdx_hasESP32Metric: state.generic.hasESP32Metric,
    }
  }
  
  const MapDispatchToProps = dispatch => {
    return {
  
    }
  
  }
  
  export default connect(mapStateToProps, MapDispatchToProps)(EnabledCapability);
