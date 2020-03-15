import React, {Component} from 'react';
import './App.css';
import socket from './utilities/socketConnection';
import moment from 'moment';
import 'moment/locale/fr';

import MainLayout from './components/UI/MainLayout';
import SyncLoader from 'react-spinners/SyncLoader';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

class App extends Component {

     constructor() {
       super();
       moment.locale('fr');
       console.log(moment.locale());
       socket.on('watchdog', (data) => {
        console.log('[APP] Watchdog', data);
        const id = localStorage.getItem('deviceId')
        socket.emit('watchdogEcho', {id})
      })
     }

    state = {
      hasData: false,
      metric: {
              values: {
                  temp: 20,
                  tmin: 20,
                  tmax: 20,
                  hum: 30,
                  hmin: 30,
                  hmax: 30,
                },
              moment: moment().format(''),
               },
      history: [],
      sensor: {},
    };
    


  componentDidMount() {

    console.log('[APP] mounted...')

    socket.on('metric',(data) => {
      const values = data.mesure;
      console.log('[APP] Socket :', values);
      var now = moment();
//      values.moment=now.locale('fr');
      this.setState({metric: {values}})
      this.setState({hasData: true})
        })

    socket.on('startHistoricData',(data) => {
      console.log('[APP] History Start :', data);
      })

    socket.on('historicData',(data) => {
      console.log('[APP] History :', data);
      this.setState({history: data.history});
    })

    socket.on('endHistoricData',(data) => {
      console.log('[APP] History End :', data);
      })

    socket.on('sensorInfo',(data) => {
      console.log('[APP] sensor :', data);
      this.setState({sensor: data})
      })


    
  }

  render() {
    if (this.state.hasData) {
      return (
        <MainLayout 
          metric={this.state.metric} 
          history={this.state.history}
        />
      );
    } else {
      return (
        <React.Fragment>
            <Box>
              <Typography variant="h4">
                En attente d'une mesure
              </Typography>
            </Box>
            <SyncLoader 
              color='#ef702b'
              size={30}
              margin={5}
            />
        </React.Fragment>
      )
    }

  }

}

export default App;
