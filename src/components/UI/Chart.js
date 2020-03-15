import React, {useState, useEffect} from 'react'

import moment from 'moment';
import 'moment/locale/fr';
import { makeStyles } from '@material-ui/core/styles';

import { LineChart, Line, XAxis , YAxis, Tooltip, ResponsiveContainer } from 'recharts';


moment.locale('fr');

const chartWidth = 340
const chartHeight = 250
const useStyles = makeStyles(theme => ({
    root: {
        width: chartWidth,
        height: chartHeight,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),

      },
  }));

const Chart = (props) => {

    const classes = useStyles();

    const [MetricsData, setMetricsData] = useState([])
    const [time, settime] = useState([])


    useEffect(() => {
//        console.log('[CHART]', props.metric);
        setMetricsData(MetricData => [...MetricsData, props.value]);
    },[props.value])

//     useEffect(() => {
//       console.log('[CHART]', moment(props.value.moment,'x').format());
//       settime(time => [...time, moment(props.value.moment,'x').format()])
// //      console.log(time)
//   },[props.value.moment])

    useEffect(() => {
      const h = props.history;
      const hist = [];
      if (h.length > 0){
        h.map( element => {
          hist.push(JSON.parse(element))
        })
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
          return moment(tickItem,'x').format('HH:mm:ss')
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

// const TimeSeriesChart = ({ chartData }) => (
//   <ResponsiveContainer width = '95%' height = {500} >
//     <ScatterChart>
//       <XAxis
//         dataKey = 'time'
//         domain = {['auto', 'auto']}
//         name = 'Time'
//         tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm Do')}
//         type = 'number'
//       />
//       <YAxis dataKey = 'value' name = 'Value' />

//       <Scatter
//         data = {chartData}
//         line = {{ stroke: '#eee' }}
//         lineJointType = 'monotoneX'
//         lineType = 'joint'
//         name = 'Values'
//       />

//     </ScatterChart>
//   </ResponsiveContainer>
// )
