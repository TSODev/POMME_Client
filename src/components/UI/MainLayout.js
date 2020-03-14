import React, {useState, useEffect} from 'react'

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Header from './Header';
import TempChart from './Temp/TempChart';
import TempMetrics from './Temp/TempMetrics';
import HumChart from './Humidity/HumChart';
import HumMetrics from './Humidity/HumMetrics';

import moment from 'moment';

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
  }),'MainLayout');

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


//============================================================
    
    return (

      <React.Fragment>

          <Box className={classes.root}>
            <Grid className={classes.grid} container>
              <Grid item sm={12}>
                <Header pulse={heartPulse} sensor={sensor}/>
              </Grid>
            </Grid>

            <Grid className={classes.mesures} container justify="space-around" alignitem="center" spacing={1}>
              <Grid className={classes.grid} item sm={12}>
                <TempMetrics values={metricsData} minmax= {minmax} hasData={hasData}/>
                <TempChart history={history} value={metricsData} hasData={hasData}/>
              </Grid>

              <Grid className={classes.grid} item sm={12}>
                <HumMetrics values={metricsData} minmax= {minmax} hasData={hasData}/>              
                <HumChart history={history} value={metricsData} hasData={hasData}/>
              </Grid>
            </Grid>
          </Box>

      </React.Fragment> 
    );
}

export default MainLayout
