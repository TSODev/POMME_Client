import React from 'react'

import { ReactComponent as Pressure } from "./SVGImages/Barometer.svg";


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

      iconRoot: {
        textAlign: 'center',
        maxWidth: 40,
        maxHeight: 40,
      }
  }),'SVGTempIcon');

const SVGPresIcon = (props) => {

    const classes = useStyles();

    return (
      <React.Fragment>
          <Pressure className={classes.iconRoot}/>
      </React.Fragment>
    );
}

export default SVGPresIcon