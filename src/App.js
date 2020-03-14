import React, {Component} from 'react';
import './App.css';
import socket from './utilities/socketConnection';
import moment from 'moment';

import MainLayout from './components/UI/MainLayout';
import Spinner from './components/UI/Spinner';
import SyncLoader from 'react-spinners/SyncLoader';


class App extends Component {

     constructor() {
       super();
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
              moment: moment().format('x'),
               },
      history: [],
      sensor: {},
    };
    


  componentDidMount() {

    console.log('[APP] mounted...')

    socket.on('metric',(data) => {
      console.log('[APP] Socket :', data);
      const values = data.mesure;
      this.setState({metric: {values, moment}})
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

            <SyncLoader 
              color='#ef702b'
              size={30}
              margin={5}
            />

      )
    }

  }

}

export default App;
