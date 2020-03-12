import React from 'react';

import Grid from '@material-ui/core/Grid';
import Metric from './metric';
import Chart from './Chart';
import Spinner from './Spinner';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        borderRadius: theme.spacing(1),
      },
    grid: {
        border: '1px',
    },
    chart: {
        width: '100%',
        height: 180,
        backgroundColor: theme.palette.background.yellowpaper,
        borderRadius: theme.spacing(1),
      },
  }),'FullMetric');

const FullMetric = (props) => {

    const classes = useStyles();

    if (props.show) {

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid className={classes.grid} item xs={12}>
            <Metric
              value={props.values.metrics.temp}
              unit="°C"
              variant="h4"
              label="Température"
            />
          </Grid>
          <Grid className={classes.grid} item xs={6}>
            <Metric
              value={props.values.metrics.tmin}
              unit="°C"
              variant="body1"
              label="Min"
            />
          </Grid>
          <Grid className={classes.grid} item xs={6}>
            <Metric
              value={props.values.metrics.tmax}
              unit="°C"
              variant="body1"
              label="Max"
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {props.show ? (
            <Chart
              metric="temp"
              min="tmin"
              max="tmax"
              value={props.values.metrics}
            />
          ) : (
            <div className={classes.chart} />
          )}
        </Grid>
      </div>
    );
          }
          else {
              return (
                  <React.Fragment>
                      <Spinner />
                  </React.Fragment>
              )
          }
}

export default FullMetric
