import React, {useEffect, useState} from 'react'

import Metric from '../metric';
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
        setmetric(Math.round(props.values.pressure /10) /10)
    }, [props.values.pressure])

    return (
        <React.Fragment>
        <div className={classes.metrics}>
        <Grid container alignItems="center" spacing={1}>
          <Grid className={classes.grid} item xs={2}>
            <Metric
              value={900}
              unit="hPa"
              variantlabel="body2"
              variantvalue="body1"
              label="Min"
            />
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
            />
          </Grid>
          <Grid className={classes.grid} item xs={2}>
            <Metric
              value={1100}
              unit="hPa"
              variantlabel="body2"
              variantvalue="body1"
              label="Max"
            />
          </Grid>
        </Grid>
        </div>
      </React.Fragment>
    )
}

export default PresRDXMetrics