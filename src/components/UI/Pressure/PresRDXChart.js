import React, {useEffect} from 'react'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Chart from '../Chart';
import RDXChart from '../RDXChart';

const chartHeight = 250
const useStyles = makeStyles(theme => ({
  chart: {
      width: '100%',
      height: chartHeight,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
    },
}),'PresChart');

const PresRDXChart = (props) => {

  const classes = useStyles();

    useEffect(() => {
        console.log('[PRESRDXCHART]')
    }, [props.value])

    if (props.hasData) {
      return (
        <div className={classes.chart}>
            <Grid container>
            <Grid item xs={12}>
                <RDXChart
                  device="24:6F:28:B2:3C:34"
                  history={props.history}
                  metric="pressure"
                  min="hmin"
                  max="hmax"
                  value={Math.round(props.value/10)/10}
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

export default PresRDXChart
