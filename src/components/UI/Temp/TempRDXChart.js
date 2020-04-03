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
      paddingTop: theme.spacing(2),
    },
}),{name: 'TempRXDChart'});

const TempRDXChart = (props) => {

  const classes = useStyles();

    useEffect(() => {
        console.log('[TEMPRDXCHART]',props.value, props.comingFrom, props.device.id)
    }, [props.value])

    if (props.hasData && (props.comingFrom === props.device.id)) {
      return (
        <div className={classes.chart}>
            <Grid container>
            <Grid item xs={12}>
                <RDXChart
                  device={props.device.id}
                  history={props.history}
                  metric="temperature"
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

export default TempRDXChart
