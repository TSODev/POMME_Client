import React from 'react'

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        height: 40,
        backgroundColor: theme.palette.background.paper,
        textAlign: 'left',
      },
  }),'Heart');

const Heart = (props) => {

    const classes = useStyles()

    if (props.show) {
    return (
        <div className={classes.root}>
            <FiberManualRecordIcon fontSize='small' style={{ color: red[500]}}></FiberManualRecordIcon>
        </div>
    )
    } else {
        return (
        <div className={classes.root}>
            {/* <RadioButtonUncheckedIcon fontSize='small' style={{ color: red[500]}}></RadioButtonUncheckedIcon> */}
        </div>
        )
    }
}

export default Heart
