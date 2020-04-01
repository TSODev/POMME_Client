import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';

import DeviceLayout from '../DeviceLayout';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Header from './Header';
import TempChart from './Temp/TempChart';
import TempRDXChart from './Temp/TempRDXChart';
import TempMetrics from './Temp/TempMetrics';
import TempRDXMetrics from './Temp/TempRDXMetrics';
import HumChart from './Humidity/HumChart';
import HumRDXChart from './Humidity/HumRDXChart'
import HumMetrics from './Humidity/HumMetrics';
import HumRDXMetrics from './Humidity/HumRDXMetrics';

import PresRDXChart from './Pressure/PresRDXChart'
import PresRDXMetrics from './Pressure/PresRDXMetrics';

import moment from 'moment';
import * as _ from 'lodash';

import * as actions from '../../redux/actions/index'
import { makeStyles } from '@material-ui/core/styles';

moment.locale('fr')

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
  }),{name:'MainLayout'});

const MainLayout = (props) => {

    const classes = useStyles();

    const [metricsData, setmetricsData] = useState(
        {metrics:{
                temp: 20,
                tmin: 20,
                tmax: 20,
                hum: 30,
                hmin: 30,
                hmax: 30,},
        moment: moment().format('x'),
        },
)

    const [metricsESP32, setmetricsESP32] = useState()
    const [RDXhistory, setRDXhistory] = useState([])
    const [history, sethistory] = useState([
      {metrics:{
        temp: 20,
        tmin: 20,
        tmax: 20,
        hum: 30,
        hmin: 30,
        hmax: 30,},
      moment: moment().format('x'),
      }
    ])
    const [minmax, setminmax] = useState({ 
      minTemp: 20, 
      maxTemp: 20,
      minHum: 50, 
      maxHum: 50
    })
    const [sensor, setsensor] = useState({})
    const [hasData, sethasData] = useState(false)
    const [hasESP32Data, sethasESP32Data] = useState(false)
    const [heartPulse, setheartPulse] = useState(false)


    useEffect(() => {
      console.log('[MAINLAYOUT]>Metric');
      setmetricsData(props.metric.values)
      updateMinMaxValues(props.metric.values)
      setheartPulse(true)
      setTimeout(() => {
        setheartPulse(false)
      }, 500);
    }, [props.metric])

    useEffect(() => {
      console.log('[MAINLAYOUT]>History');
      sethistory(props.history);
      sethasData(true);
      setminmax(getMinMaxValues(props.history));
    }, [props.history])

    useEffect(() => {
      console.log('[MAINLAYOUT]>ReduxMetric', props.rdx_lastESP32Metrics)
      if (!_.isEmpty(props.rdx_lastESP32Metrics)) {
      setmetricsESP32({
        temperature: Math.round(props.rdx_lastESP32Metrics.values.temperature*10) /10,
        humidity: Math.round(props.rdx_lastESP32Metrics.values.humidity*10) /10,
        pressure: Math.round(props.rdx_lastESP32Metrics.values.pressure /10) / 10,
        moment: props.rdx_lastESP32Metrics.values.moment
      })
      sethasESP32Data(true)
    }
    }, [props.rdx_lastESP32Metrics])

    useEffect(() => {
      console.log('[MAINLAYOUT]>ReduxMetricHistory', props.rdx_history)    

      }, [props.rdx_history])  

      useEffect(() => {
        console.log('[MAINLAYOUT]>ReduxDevices', props.devices)    
//
        }, [props.devices])  

    const updateMinMaxValues = (metric) => {
//        console.log('[MINMAX]', metric, metric.metrics.temp, metric.metrics.hum, minmax)
        if (metric.metrics.temp < minmax.minTemp) setminmax({...minmax, minTemp: metric.metrics.temp});
        if (metric.metrics.temp > minmax.maxTemp) setminmax({...minmax, maxTemp: metric.metrics.temp});
        if (metric.metrics.hum < minmax.minHum) setminmax({...minmax, minHum: metric.metrics.hum});
        if (metric.metrics.hum > minmax.maxHum) setminmax({...minmax, maxHum: metric.metrics.hum});
    }

    const getMinMaxValues = (history) => {      
      const temp = [];
      const hum = [];
      history.map(h => {
        temp.push(JSON.parse(h).metrics.temp);
        hum.push(JSON.parse(h).metrics.hum);
      });
      return ({ 
        minTemp: Math.min( ...temp ), 
        maxTemp: Math.max( ...temp ),
        minHum: Math.min( ...hum ), 
        maxHum: Math.max( ...hum )
      });
    }

    const switchSettings = (value) => {
      console.log('Settings : ', value);
    }

//============================================================
    
    return (

      <React.Fragment>

          <Box className={classes.root}>
            {/* <Grid className={classes.grid} container>
              <Grid item sm={12}>
                <Header pulse={heartPulse} devices={props.devices} switchModalSetting={switchSettings}/>
              </Grid>
            </Grid> */}

              <Grid className={classes.mesures} container justify="space-around" alignitem="center" spacing={1}>
              <Grid className={classes.grid} item sm={12}>
                <TempMetrics values={metricsData} minmax= {minmax} hasData={hasData}/>
                <TempChart history={history} value={metricsData} hasData={hasData}/>
              </Grid>

              <Grid className={classes.grid} item sm={12}>
                <HumMetrics values={metricsData} minmax= {minmax} hasData={hasData}/>              
                <HumChart history={history} value={metricsData} hasData={hasData}/>
              </Grid>

              {/* <Grid className={classes.grid} item sm={12}>
                <TempRDXMetrics values={metricsESP32} hasData={hasESP32Data}/>              
                <TempRDXChart history={props.rdx_history} value={metricsESP32} hasData={hasESP32Data}/>
              </Grid>

              <Grid className={classes.grid} item sm={12}>
                <HumRDXMetrics values={metricsESP32} hasData={hasESP32Data}/>              
                <HumRDXChart history={props.rdx_history} value={metricsESP32} hasData={hasESP32Data}/>
              </Grid>

              <Grid className={classes.grid} item sm={12}>
                <PresRDXMetrics values={metricsESP32} hasData={hasESP32Data}/>              
                <PresRDXChart history={props.rdx_history} value={metricsESP32} hasData={hasESP32Data}/>
              </Grid> */}
              </Grid>
            {
              props.rdx_devices.map((d,index) => (
                <DeviceLayout className={classes.root} key={index} device={d} hasData={props.rdx_hasESP32Metric}/>                
              ))
            }



          </Box>

      </React.Fragment> 
    );
}

const mapStateToProps = (state) => {
  console.log('MapToState:', state)
  return {
      rdx_lastESP32Metrics : state.generic.lastESP32Metric,
      rdx_lastNanoMetrics: state.generic.lastNanoMetric,
      rdx_devices: state.generic.devices,
      rdx_history: state.generic.history,
      rdx_hasESP32Metric: state.generic.hasESP32Metric,
      rdx_hasNanoMetric: state.generic.hasNanoMetric,
  }
}

const MapDispatchToProps = dispatch => {
  return {
    onDeviceLoad: (device) => dispatch(actions.loadDevice(device))
  }

}

export default connect(mapStateToProps, MapDispatchToProps)(MainLayout);
