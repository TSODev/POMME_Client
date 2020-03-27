import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import socket from './utilities/socketConnection';
import moment from 'moment';
import 'moment/locale/fr';
import axios from './axios';

import MainComponent from './components/MainComponent';
import Sensor from './components/UI/Sensor';

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
        esp32metric: {
              values: {
                  temp: 20,
                  hum: 30,
                  pres: 0,
                },
              moment: moment().format(''),
                },
      history: [],
      sensor: {},
      devices: [],
    };
    
    signalDevice = (id, type, connectedBy) => {
      const theDevice = this.state.devices.filter(d => d.id === id);
      if (theDevice.length === 0) {
//        console.log('[APP] new device : ', id);
        const newDevice = {"isNew": true, "id": id, "alias":'', "connect": connectedBy, "type": type };
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
      this.signalDevice('Serial_1', DHT22, SERIAL)
      this.setState({metric: {values}})
      this.setState({hasData: true})
        })

    socket.on('esp32metric', (data) => {
      console.log('[APP] esp32metric :', data.mesure);
      this.signalDevice(data.mesure.device, BME280, RABBIT)
      this.setState({esp32metric: data.mesure})
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
      

      axios.get('/sensors')
          .then ( response => {
            this.setState({devices: response.data})
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

export default App;
