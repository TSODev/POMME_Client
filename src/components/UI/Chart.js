import React, {useState, useEffect} from 'react'


import { makeStyles } from '@material-ui/core/styles';

import { LineChart, Line, YAxis, Tooltip } from 'recharts';

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

    useEffect(() => {
        console.log('[CHART]');
        setMetricsData(MetricData => [...MetricsData, props.value.metrics]);
    },[props.value.metrics])

    useEffect(() => {
      const h = props.history;
      const hist = [];
      if (h.length > 0){
        h.map( element => {
          hist.push(JSON.parse(element).metrics)
        })
        setMetricsData(hist);
      }
  }, [props.history])


    return (
      <div className={classes.root}>
                <LineChart
                width={chartWidth}
                height={chartHeight}
                data={MetricsData}
                >
                <Line type="monotone" dataKey={props.metric} stroke="#ef702b" dot={false} strokeWidth={3}/>
                <Line type="monotone" dataKey={props.min} stroke="#b5856e" dot={false} strokeDasharray="3 4 5 2"/>
                <Line type="monotone" dataKey={props.max} stroke="#7C5B4B" dot={false}strokeDasharray="3 4 5 2"/>
                {/* <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="5 5" /> */}

                <YAxis wigth={30} scale="linear" type="number" domain={['dataMin - 1', 'dataMax + 1']}/>
                <Tooltip />
                </LineChart>
      </div>
    );
}

export default Chart
