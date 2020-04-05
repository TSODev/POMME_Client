import React, {useState, useEffect} from 'react'

import moment from 'moment';
import 'moment/locale/fr';
//import { makeStyles } from '@material-ui/core/styles';

import { LineChart, Line, XAxis , YAxis, Tooltip, ResponsiveContainer } from 'recharts';


moment.locale('fr');

//const chartWidth = 340
const chartHeight = 250
// const useStyles = makeStyles(theme => ({
//     root: {
//         width: chartWidth,
//         height: chartHeight,
//         backgroundColor: theme.palette.background.paper,
//         borderRadius: theme.spacing(1),

//       },
//   }));

const Chart = (props) => {

//    const classes = useStyles();

    const [MetricsData, setMetricsData] = useState([])


    useEffect(() => {
        console.log('[CHART]', props.value, MetricsData);
        setMetricsData(MetricData => [...MetricsData, {temp: props.value.temp, hum: props.value.hum, moment: moment().format('x')}]);
    },[props.value])

//     useEffect(() => {
//       console.log('[CHART]', moment(props.value.moment,'x').format());
//       settime(time => [...time, moment(props.value.moment,'x').format()])
// //      console.log(time)
//   },[props.value.moment])

    useEffect(() => {
      console.log('[Chart]-History', props.device, props.history)
      const hdevice = props.history.filter(d => d.device === props.device)
      // const h = props.history[props.device];
      const hist = [];
      if (hdevice.length > 0){
//        console.log('[Chart]-History for Device',hdevice, hdevice[0], hdevice[0].values)
        const deviceHistory = hdevice[0].values;
//        console.log('[Chart]-deviceHistory',deviceHistory)
        if (deviceHistory.length >0) {
          deviceHistory[0].map( element => {
//            console.log('[Chart]-element',JSON.parse(element))
            const el = JSON.parse(element)
            hist.push({
              temp: el.metrics.temp,
              hum: el.metrics.hum,
//              pressure: el.pressure / 100,
              moment: el.moment
            })
          })
        }
      // const h = props.history;
      // const hist = [];
      // if (h.length > 0){
      //   h.map( element => {
      //     hist.push(JSON.parse(element))
      //   })
        setMetricsData(hist);
      }
  }, [props.history])

  const formatXAxis = (tickItem) => {
      var x = moment(tickItem,'x');
      x.locale('fr')
      return x.format('ddd D à HH:mm')
  }

  const formatTooltipLabel = (tickItem) => {
    //      console.log('[CHART]-Tick',tickItem)
          return moment(tickItem,'x').format('ddd - HH:mm:ss')
      }

  const formatTolltip = (value, name, props) => {
    return [value, name.replace('metrics.', '')]
  }

    return (

        <ResponsiveContainer width = '98%' height = {chartHeight} >

                <LineChart
                // width={chartWidth}
                // height={chartHeight}
                data={MetricsData}
                >
                <Line type="monotone" dataKey={props.metric} stroke="#ef702b" dot={false} strokeWidth={3}/>
                {/* <Line type="monotone" dataKey={props.min} stroke="#b5856e" dot={false} strokeDasharray="3 4 5 2"/>
                <Line type="monotone" dataKey={props.max} stroke="#7C5B4B" dot={false}strokeDasharray="3 4 5 2"/> */}
                {/* <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="5 5" /> */}

                <XAxis
                  dataKey = 'moment'
                  domain = {['dataMin', 'dataMax']}
  //                ticks={time}
                  name = 'Heure'
                  tickFormatter = {formatXAxis}
                  type = 'number'
                />

                <YAxis width={35} 
                        scale="linear" 
                        type="number" 
                        domain={['dataMin - 1', 'dataMax + 1']}
                        dataKey={props.metric}
                        />
                <Tooltip  formatter={formatTolltip}
                          labelFormatter={formatTooltipLabel}/>
                </LineChart>
        </ResponsiveContainer>

    );
}

export default Chart
