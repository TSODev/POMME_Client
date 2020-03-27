import React from 'react'

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

    return (
        <div className={classes.metric}>
            <Typography variant={props.variantlabel}>
                {props.label}
            </Typography>
            <Typography variant={props.variantvalue}>
                {props.value}{props.unit}
            </Typography>
        </div>
    )
}

export default Metric
