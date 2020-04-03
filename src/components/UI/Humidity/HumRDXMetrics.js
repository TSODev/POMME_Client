import React, {useEffect, useState} from 'react'

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
      },
  }),'HumMetrics');

const HumRDXMetrics = (props) => {

    const classes = useStyles();

    const [metric, setmetric] = useState('--.-')

    useEffect(() => {
        console.log('[HUMRDXMETRICS]')
        setmetric(Math.round(props.values.humidity *10) /10)
    }, [props.values.humidity])

    return (
      (props.device.id === props.comingFrom) ?
        <React.Fragment>
        <div className={classes.metrics}>
        <Grid container alignItems="center" spacing={1}>
          <Grid className={classes.grid} item xs={2}>
            {/* <Metric
              value={10}
              unit="%"
              variantlabel="body2"
              variantvalue="body1"
              label="Min"
            /> */}
          </Grid>
          <Grid className={classes.grid} item xs={8}>
            <SVGHumIcon />
            <Metric
              // value={ props.hasData ? props.values.humidity : '--.-'}
              value={metric}
              unit="%"
              variantlabel="h5"
              variantvalue="h3"
              label="Humidité"
            />
          </Grid>
          <Grid className={classes.grid} item xs={2}>
            {/* <Metric
              value={50}
              unit="%"
              variantlabel="body2"
              variantvalue="body1"
              label="Max"
            /> */}
          </Grid>
        </Grid>
        </div>
      </React.Fragment>
      :
      <React.Fragment></React.Fragment>
    )
}

export default HumRDXMetrics