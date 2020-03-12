import React, {useState, useEffect} from 'react'

import Grid from '@material-ui/core/Grid';

import Header from './Header';
import TempChart from './Temp/TempChart';
import TempMetrics from './Temp/TempMetrics';
import HumChart from './Humidity/HumChart';
import HumMetrics from './Humidity/HumMetrics';

import moment from 'moment';
import socket from '../../utilities/socketConnection';

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
    grid: {
        border: 'solid',
        borderWidth: 1,
        padding: theme.spacing(1),
        marginBottom: theme.spacing(2),
  //      margin: theme.spacing(0,1,2,3),
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    chart: {
        width: '100%',
        height: 180,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
      },
    loading: {
        width: '100%',
        height: 800
    },  
    dividerFullWidth: {
      margin: `5px 0 0 ${theme.spacing(2)}px`,
    },

  }));

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
    

    const [history, sethistory] = useState([])
//    const [len, setlen] = useState(3600)    
//    const [nb, setnb] = useState(1)
    const [sensor, setsensor] = useState({})
    const [hasData, sethasData] = useState(false)
    const [heartPulse, setheartPulse] = useState(false)


    useEffect(() => {
        socket.on('metric',(data) => {
          console.log('Socket :', data);
            setmetricsData(data.mesure);
            setheartPulse(true)
            setTimeout(() => {
              setheartPulse(false)
            }, 500);
            })
    },[])

    useEffect(() => {
        socket.on('startHistoricData',(data) => {
            console.log('History Start :', data);
            sethasData(false)
            })
    },[])

    useEffect(() => {
      socket.on('historicData',(data) => {
            console.log('History :', data);
            sethistory(data.history);
            sethasData(true);
        })
    },[])

    useEffect(() => {
        socket.on('endHistoricData',(data) => {
            console.log('History End :', data);
            })
    },[])

  useEffect(() => {
      socket.on('sensorInfo',(data) => {
          setsensor(data);
          console.log('sensor :', data);
          })
  },[])

  useEffect(() => {
    console.log('[MainLayout]')
//    socket.emit('historyRequest', {len: nb * len});
  },[])

//============================================================
    
    return (

      <React.Fragment>

          <div className={classes.root}>
            <Grid className={classes.grid} container>
              <Grid item sm={12}>
                <Header pulse={heartPulse} sensor={sensor}/>
              </Grid>
            </Grid>

            <Grid container justify="center" spacing={1}>
              <Grid className={classes.grid} item sm={6}>
                <TempMetrics values={metricsData.metrics}/>
                <TempChart history={history} value={metricsData} hasData={hasData}/>
              </Grid>

              <Grid className={classes.grid} item sm={6}>
                <HumMetrics values={metricsData.metrics}/>              
                <HumChart history={history} value={metricsData} hasData={hasData}/>
              </Grid>
            </Grid>
          </div>

      </React.Fragment> 
    );
}

export default MainLayout
