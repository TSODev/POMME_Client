import React, {useEffect, useState} from 'react'

import {getMinMaxValues} from '../../../utilities/utils'

import Metric from '../metric';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SVGTempIcon from '../SVGIcons/SVGTempIcon';

const useStyles = makeStyles(theme => ({
    metrics: {
        width: '98%',
        height: 100,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
      },
  }),'TempRDXMetrics');

const TempRDXMetrics = (props) => {

    const classes = useStyles();


    const [metric, setmetric] = useState('--.-')
    useEffect(() => {
        console.log('[TEMPRDXMETRICS]')
        setmetric(Math.round(props.values.temperature *10) /10)
    }, [props.values.temperature])



    return (
        <React.Fragment>
        <div className={classes.metrics}>
        <Grid container alignItems="center" spacing={1}>
          <Grid className={classes.grid} item xs={2}>
            <Metric
              value={10}
              unit="°C"
              variantlabel="body2"
              variantvalue="body1"
              label="Min"
            />
          </Grid>
          <Grid className={classes.grid} item xs={8}>
            <SVGTempIcon />
            <Metric
              // value={ props.hasData ? props.values.temperature : '--.-'}
              value={metric}
              unit="°C"
              variantlabel="h5"
              variantvalue="h3"
              label="Temperature"
            />
          </Grid>
          <Grid className={classes.grid} item xs={2}>
            <Metric
              value={40}
              unit="°C"
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

export default TempRDXMetrics