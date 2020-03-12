import React, {useEffect} from 'react'

import Metric from '../metric';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    metrics: {
        height: 100,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
      },
  }),'HumMetrics');

const HumMetrics = (props) => {

    const classes = useStyles();

    useEffect(() => {
        console.log('[HUMMETRICS]')
    }, [props.values.hum])

    return (
        <React.Fragment>
        <div className={classes.metrics}>
        <Grid container alignItems="center" spacing={1}>
          {/* <Grid className={classes.grid} item xs={2}>
            <Metric
              value={props.values.hmin}
              unit="%"
              variantlabel="body2"
              variantvalue="body1"
              label="Min"
            />
          </Grid> */}
          <Grid className={classes.grid} item xs={8}>
            <Metric
              value={props.values.hum}
              unit="%"
              variantlabel="h5"
              variantvalue="h3"
              label="Humidité"
            />
          </Grid>
          {/* <Grid className={classes.grid} item xs={2}>
            <Metric
              value={props.values.hmax}
              unit="%"
              variantlabel="body2"
              variantvalue="body1"
              label="Max"
            />
          </Grid> */}
        </Grid>
        </div>
      </React.Fragment>
    )
}

export default HumMetrics