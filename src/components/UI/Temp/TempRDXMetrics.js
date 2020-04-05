import React, {useEffect, useState} from 'react'

import {getMinMaxValues} from '../../../utilities/utils'

import Metric from '../Metric';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SVGTempIcon from '../SVGIcons/SVGTempIcon';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: '100%',
      minHeigth: '100vh',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
      textAlign: 'center',
      margin: theme.spacing(2),
      padding: theme.spacing(2, 0, 2, 0),
    },
    metrics: {
        width: '98%',
        height: 100,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        paddingBottom: theme.spacing(2),
      },
      grid: {
        width: '100%',
        border: 'none',
        borderWidth: 1,
        padding: theme.spacing(1),
        marginBottom: theme.spacing(2),
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    container: {
      paddingBottom: theme.spacing(2),
    }
  }),{name: 'TempRDXMetrics'});

const TempRDXMetrics = (props) => {

    const classes = useStyles();


    const [metric, setmetric] = useState('--.-')
    useEffect(() => {
        console.log('[TEMPRDXMETRICS]')
        if (props.comingFrom === props.device.id)
          setmetric(props.hasData ? Math.round(props.values.temperature *1) /1 : '--.-')
    }, [props.values.temperature])



    return (
//        (props.device.id === props.comingFrom) ?
        <React.Fragment>
        <div className={classes.metrics}>
        <Grid className={classes.container} container alignItems="center">
          <Grid className={classes.grid} item xs={2}>
            {/* <Metric
              value={10}
              unit="°C"
              variantlabel="body2"
              variantvalue="body1"
              label="Min"
            /> */}
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
              good={(props.device.id === props.comingFrom)}
            />
          </Grid>
          <Grid className={classes.grid} item xs={2}>
            {/* <Metric
              value={40}
              unit="°C"
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

export default TempRDXMetrics