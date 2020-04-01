import React, {useEffect} from 'react'

import Metric from '../Metric';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SVGHumIcon from '../SVGIcons/SVGHumIcon';

const useStyles = makeStyles(theme => ({
    metrics: {
        width: '98%',
        height: 100,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
//        paddingBottom: theme.spacing(2)
      },
  }),{name: 'HumMetrics'});

const HumMetrics = (props) => {

    const classes = useStyles();

    useEffect(() => {
        console.log('[HUMMETRICS]')
    }, [props.values.hum])

    return (
        <React.Fragment>
        <div className={classes.metrics}>
        <Grid container alignItems="center" spacing={1}>
          <Grid className={classes.grid} item xs={2}>
            {/* <Metric
              value={props.minmax.minHum}
              unit="%"
              variantlabel="body2"
              variantvalue="body1"
              label="Min"
            /> */}
          </Grid>
          <Grid className={classes.grid} item xs={8}>
            <SVGHumIcon />
            <Metric
              value={ props.hasData ? props.values.hum : '--.-'}
              unit="%"
              variantlabel="h5"
              variantvalue="h3"
              label="Humidité"
            />
          </Grid>
          <Grid className={classes.grid} item xs={2}>
            {/* <Metric
              value={props.minmax.maxHum}
              unit="%"
              variantlabel="body2"
              variantvalue="body1"
              label="Max"
            /> */}
          </Grid>
        </Grid>
        </div>
      </React.Fragment>
    )
}

export default HumMetrics