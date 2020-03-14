import React, {useEffect} from 'react'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Chart from '../Chart';

const chartHeight = 250
const useStyles = makeStyles(theme => ({
  chart: {
      width: '100%',
      height: chartHeight,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
    },
}),'HumChart');

const HumChart = (props) => {

  const classes = useStyles();

    useEffect(() => {
        console.log('[HUMCHART]')
    }, [])

    if (props.hasData) {
      return (
        <div className={classes.chart}>
            <Grid container>
            <Grid item xs={12}>
                <Chart
                  history={props.history}
                  metric="metrics.hum"
                  min="hmin"
                  max="hmax"
                  value={props.value}
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
