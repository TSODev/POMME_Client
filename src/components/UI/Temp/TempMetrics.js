import React, {useEffect} from 'react'

import Metric from '../Metric';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SVGTempIcon from '../SVGIcons/SVGTempIcon';

const useStyles = makeStyles(theme => ({
    metrics: {
        width: '98%',
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
//        paddingBottom: theme.spacing(2)
      },
  }),{name: 'TempMetrics'});

const TempMetrics = (props) => {

    const classes = useStyles();

    useEffect(() => {
        console.log('[TEMPMETRICS]')
    }, [props.values.temp])

    return (
        <React.Fragment>
        <div className={classes.metrics}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={2} sm={2}>
            {/* <Metric
              value={props.minmax.minTemp}
              unit="°C"
              variantlabel="body2"
              variantvalue="body1"
              label="Min"
            /> */}
          </Grid>
          <Grid item xs={8} sm={8}>
              <SVGTempIcon />
            <Metric
              value={ props.hasData ? props.values.temp : '--.-'}
              unit="°C"
              variantlabel="h5"
              variantvalue="h3"
              label="Température"
              good={true}
            />
          </Grid>
          <Grid item xs={2} sm={2}>
            {/* <Metric
              value={props.minmax.maxTemp}
              unit="°C"
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

export default TempMetrics
