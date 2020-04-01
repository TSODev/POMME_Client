import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import socket from './utilities/socketConnection';
import moment from 'moment';
import 'moment/locale/fr';
import axios from './axios';

import MainComponent from './components/MainComponent';
import Sensor from './components/UI/Sensor';
import SENSORS from './utilities/sensors';

import * as actions from './redux/actions/index'

const RABBIT = 'rabbitmq';
const SERIAL = 'serial';
const BME280 = 'bme280';
const DHT22 = 'dht22';

class App extends Component {
  

     constructor() {
       super();
       moment.locale('fr');
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
        esp32metric: {},
      history: [],
      sensor: {},
      devices: [],
    };
    
    signalDevice = (id, type, connectedBy) => {
//      const theDevice = this.state.devices.filter(d => d.id === id);
      const theDevice = this.props.rdx_devices.filter(d => d.id === id);

      if (theDevice.length === 0) {

        const newDevice = {"isNew": true, "id": id, "alias":'', "connect": connectedBy, "type": type };
        console.log('[APP] new device : ', id, type, SENSORS);
        const sensor = SENSORS.models.filter(s => s.id === type)[0];
        console.log('[APP] new device : ', id, type, sensor);
        newDevice.sensor = SENSORS.models.filter(s => s.id === type)[0]

        this.props.onNewDevice(newDevice);
//        const devices = [...this.state.devices];

        axios.post('/add', JSON.stringify(newDevice))
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    }


  componentDidMount() {

    console.log('[APP] mounted...')

    socket.on('metric',(data) => {
      const values = data.mesure;
      console.log('[APP] Socket :', values);
      this.signalDevice('mset0', DHT22, SERIAL)
      this.props.onNewNanoMetric(data.mesure)
      this.setState({metric: {values}})
      this.setState({hasData: true})
        })

    socket.on('esp32metric', (data) => {
      console.log('[APP] esp32metric :', data.mesure);
      this.signalDevice(data.mesure.device, BME280, RABBIT)
      this.props.onNewESP32Metric(data.mesure)
      this.setState({esp32metric: data.mesure})
    })

    socket.on('startHistoricData',(data) => {
      console.log('[APP] History Start :', data);
      })

    socket.on('historicData',(data) => {
      console.log('[APP] History :', data);
      this.setState({history: data.history});
    })

    socket.on('historicDataByDevice',(data) => {
      console.log('[APP] History :', data.device, data.history);
      this.props.onNewHistoryForAllDevices(data);
//      this.setState({history: data.history});
    })

    socket.on('endHistoricData',(data) => {
      console.log('[APP] History End :', data);
      })

    socket.on('sensorInfo',(data) => {
      console.log('[APP] sensor :', data);
      this.setState({sensor: data})
      })  
      
    socket.on('roomWelcome', (message) => {
      console.log('[APP] socket :', message);
    })
      

      axios.get('/sensors')
          .then ( response => {
            this.setState({devices: response.data})
            this.state.devices.map(d => this.props.onNewDevice(d))
            console.log('[GETDEVICES]', response.data, this.props.rdx_devices)
          })
          .catch ( err  => {
            console.log(err)
          })


  }

  

  render() {

    return (
      <React.Fragment>

        <Switch>
            <Route path="/" exact render={(props) => <MainComponent {...props} 
                                                      hasData={this.state.hasData} 
                                                      devices={this.state.devices}
                                                      metric={this.state.metric}
                                                      history={this.state.history}/>} 
            />
            <Route path="/sensor:Id" exact component={Sensor} 
            />          
        </Switch>

        
      </React.Fragment>

    )


  }
}

const mapStateToProps = (state) => {
  return {
    rdx_devices: state.generic.devices
  }
}

const MapDispatchToProps = dispatch => {
  return {
    onNewDevice: (data) => dispatch(actions.addDevice(data)),
    onNewESP32Metric: (data) => dispatch(actions.getESPNewMetric(data)),
    onNewNanoMetric: (data) => dispatch(actions.getNanoNewMetric(data)),
    onNewHistoryForAllDevices: (data) => dispatch(actions.getHistoryByDevice(data))
  }

}

export default connect(mapStateToProps, MapDispatchToProps)(App);
