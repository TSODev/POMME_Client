import React, {useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    metric: {
//        height: 80,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(0),
        marginTop: theme.spacing(0),
        borderRadius: theme.spacing(1),

      },
  }));


const Metric = (props) => {
    const classes = useStyles();

    const [last, setLast] = useState(0)

    useEffect(() => {
        console.log('[METRIC]', props.good, props.value, last)
        if (props.good) setLast(props.value)
    }, [props.good])

const Data = (props) => {
    return ((props.good) ? props.value : last)
}
    return (
        <div className={classes.metric}>
            <Typography variant={props.variantlabel}>
                {props.label}
            </Typography>
            <Typography variant={props.variantvalue}>
                <Data />
                {props.unit}
            </Typography>
        </div>
    )
}

export default Metric
