import React, {useEffect} from 'react'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


import RDXChart from '../Charts/RDXChart';

const chartHeight = 250
const useStyles = makeStyles(theme => ({
  chart: {
      width: '100%',
      height: chartHeight,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
    },
}),'HumChart');

const HumRDXChart = (props) => {

  const classes = useStyles();

    useEffect(() => {
        console.log('[HUMRDXCHART]',props.values, props.hasData)
    }, [props.value])

    if (props.hasData) {
      return (
        <div className={classes.chart}>
            <Grid container>
            <Grid item xs={12}>
                <RDXChart
                  device={props.device.id}
                  history={props.history}
                  metric="humidity"
                  min="hmin"
                  max="hmax"
                  value={props.value}
                  good={(props.comingFrom === props.device.id)}
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

export default HumRDXChart
