import * as actions from '../actionTypes'

const newMetric = (metric) => {
    return {
        type: actions.NEW_NANO_METRIC,
        data: metric
    }
}

export const getNanoNewMetric = (metric) => {
    return(dispatch => {
        dispatch(newMetric(metric))
    })
}