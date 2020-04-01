import * as actions from '../actionTypes'

const newMetric = (metric) => {
    return {
        type: actions.NEW_ESP32_METRIC,
        data: metric
    }
}

export const getESPNewMetric = (metric) => {
    return(dispatch => {
        dispatch(newMetric(metric))
    })
}