import React, {useState, useEffect} from 'react'

import SENSORS from '../../utilities/sensors';

import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const SensorCapabilities = (props) => {

    // useEffect(() => {
    //     console.log('[CAPABILITIES]', props.capabilities)

    // }, [props.capabilities])


    return (

        SENSORS.capabilities.map((c, index) => {
            return (
                <React.Fragment key={index}>

                    <FormControlLabel control={
                    <Switch
                        checked={props.capabilities[c] || false}
                        disabled={!props.capabilities['can_' + c]}
                        name={c}
                        color="primary"
                        onChange={props.changeCapabilities}
                    />
                    }
                    label={c}
                    >
                    </FormControlLabel>
               
            </React.Fragment>
        )       
        })
    )


}

export default SensorCapabilities
