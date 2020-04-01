import React, {useEffect} from 'react'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Chart from '../Charts/Chart';
import RDXChart from '../Charts/RDXChart';

const chartHeight = 250
const useStyles = makeStyles(theme => ({
  chart: {
      width: '100%',
      height: chartHeight,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
//      paddingTop: theme.spacing(2)
    },
}),{name:'HumChart'});

const HumChart = (props) => {

  const classes = useStyles();

    useEffect(() => {
        console.log('[HUMCHART]')
    }, [props.value])

    if (props.hasData) {
      return (
        <div className={classes.chart}>
            <Grid container>
            <Grid item xs={12}>
                <Chart
                  history={props.history}
                  metric="hum"
                  min="hmin"
                  max="hmax"
                  value={props.value}
                  device={props.device.id}
                />
            </Grid>
            </Grid>
        </div>
      )
    } else {
      return (
        <div className={classes.chart} />        
      )
    }


}

export default HumChart
