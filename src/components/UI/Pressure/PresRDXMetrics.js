import React, {useEffect, useState} from 'react'

import Metric from '../Metric';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SVGPresIcon from '../SVGIcons/SVGPresIcon';

const useStyles = makeStyles(theme => ({
    metrics: {
        width: '98%',
        height: 100,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
      },
  }),'PresMetrics');

const PresRDXMetrics = (props) => {

    const classes = useStyles();

    const [metric, setmetric] = useState('--.-')
    useEffect(() => {
        console.log('[PRESRDXMETRICS]')
        if (props.comingFrom === props.device.id)
        setmetric(Math.round(props.values.pressure /100) /1)
    }, [props.values.pressure])

    return (
//      (props.device.id === props.comingFrom) ?
        <React.Fragment>
        <div className={classes.metrics}>
        <Grid container alignItems="center" spacing={1}>
          <Grid className={classes.grid} item xs={2}>
            {/* <Metric
              value={900}
              unit="hPa"
              variantlabel="body2"
              variantvalue="body1"
              label="Min"
            /> */}
          </Grid>
          <Grid className={classes.grid} item xs={8}>
            <SVGPresIcon />
            <Metric
              // value={ props.hasData ? props.values.pressure : '--.-'}
              value={metric}
              unit="hPa"
              variantlabel="h5"
              variantvalue="h3"
              label="Pression Atmospherique"
              good={(props.device.id === props.comingFrom)}
            />
          </Grid>
          <Grid className={classes.grid} item xs={2}>
            {/* <Metric
              value={1100}
              unit="hPa"
              variantlabel="body2"
              variantvalue="body1"
              label="Max"
            /> */}
          </Grid>
        </Grid>
        </div>
      </React.Fragment>
//      :
//      <React.Fragment></React.Fragment>
    )
}

export default PresRDXMetrics