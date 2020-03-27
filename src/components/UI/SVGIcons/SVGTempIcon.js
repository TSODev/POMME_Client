import React from 'react'

import { ReactComponent as Temperature } from "./SVGImages/Temperature.svg";


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

      iconRoot: {
        textAlign: 'center',
        maxWidth: 40,
        maxHeight: 40,
      }
  }),'SVGTempIcon');

const SVGTempIcon = (props) => {

    const classes = useStyles();

    return (
      <React.Fragment>
          <Temperature className={classes.iconRoot}/>
      </React.Fragment>
    );
}

export default SVGTempIcon