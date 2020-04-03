import * as actiontypes from '../actions/actionTypes';
import {updateObject} from '../../utilities/utils';
import SENSORS from '../../utilities/sensors';
import moment from 'moment';
import { getHistoryByDevice } from '../actions';
import { updateDevice } from '../actions/Devices/devices';



const initialState = {
    devices: [],                                // {loaded: 'false', error: false, device: {type: 'unknow', connect: 'unknow'}}
    history: [],
    lastESP32Metric: {},
    lastNanoMetric :{},
    hasESP32Metric : false,
    hasNanoMetric: false,
    comingFrom: '',
}

const getNewESP32Metrics = (state, action) => {
    console.log('[reducer]-getESP32Metrics', state, action)
    const device = action.data.device;
    const type = action.data.topic;
    const timestamp = moment().set('x', action.data.moment).format();

    return updateObject(state, {
        lastESP32Metric: {device, type, moment: timestamp, values: action.data},
        hasESP32Metric: true,
        comingFrom: device,
    })
}

const getNewNanoMetrics = (state, action) => {
    console.log('[reducer]-getNanoMetrics', state, action)
    const device = 'arduino';
    const type = 'serial';
    const timestamp = moment().set('x',action.data.moment).format();

    return updateObject(state, {
        lastNanoMetric: {device, type, moment: timestamp, values: action.data.metrics},
        hasNanoMetric: true,
    })
}

const addNewDevice = (state, action) => {
    console.log('[Reducer]-addDevice', state, action)
    var newDevices = state.devices.concat(action.data)
//     const newDevice = newDevices.filter(d => d.id === action.data.id)[0]
//     const index = newDevices.indexOf(newDevice);
// //    const nd = {...newDevice, sensor: SENSORS.models.filter(m => m.id === action.data.type)[0]}
//     const nd = {...newDevice}
//     newDevices[index] = nd
//    console.log('[Reducer]-addDevice',index, newDevices, nd);
    const historyInit = state.history.concat({device: action.data.id, values:[]})
    return updateObject(state, {
        devices: newDevices,
        history: historyInit
    })
}

const updateDeviceStart = (state, action) => {
    console.log('[Reducer]-UpdateDeviceStart', action)
    // const id = action.data.device.id;
    // const alias = action.data.alias;
    // const device = state.devices.filter(d => d.id === id)
    // if (device.length > 0) {
    //     device[0] = {...action.data.device, alias: action.data.alias}
    // }
    return updateObject(state, {

    })
}

const updateDeviceSuccess = (state, action) => {

    const devices = action.data.devices;
    const id = action.data.id;
    const arr = []
    console.log('[Reducer]-UpdateDeviceSuccess', action, devices, id)
    devices.map(d => {
        arr.push(JSON.parse(d))
    })
    const device = arr.filter((a) => a.id === id)
    const olddevice = state.devices.filter(d => d.id === id)[0]
    const index = state.devices.indexOf(olddevice)
    const newdevices = [...state.devices]
    newdevices[index] = device[0];
    console.log('[Reducer]-UpdateDeviceSuccess', arr, index, device, newdevices)
    return updateObject(state, {
        devices: newdevices
    })
}

const updateDeviceFail = (state, action) => {
    console.log('[Reducer]-UpdateDeviceFail', action)
    return updateObject(state, {
        
    })
}

const loadDeviceStart = (state, action) => {
    console.log('[Reducer]-LoadDevicesStart', action)
    return updateObject(state, {

    })
}

const loadDeviceSuccess = (state, action) => {
    console.log('[Reducer]-loadDeviceSuccess', action)
    const device = state.devices.filter(d => d.id === action.data.id)[0];
    console.log('[Reducer]-loadDeviceSuccess',device);
    device.loaded = 'true'
    return updateObject(state, {
        devices: [...state.devices, device]
    })
}

const loadDeviceFail = (state, action) => {
    return updateObject(state, {
        
    })
}


const getHistoryForAllDevice = (state, action) => {
    console.log('[Reducer]-getHistoryByDevice', state, action)
//    const device = action.data.device;
    const history = action.data.history;
    const stateHistory = state.history
    const historyForDevice = stateHistory.filter(h => h.device === action.data.device)
    const historicValuesForDevice = historyForDevice[0].values
    historicValuesForDevice[0] = history
//    console.log('historyForDevice', device, historicValuesForDevice);
//    console.log('NewHistory:',...state.history)
    return updateObject(state, {
        history: [...state.history]
    })
}

const reducer = (state = initialState, action) => {
    console.log('[REDUCER]',action.type);
    switch (action.type) {
        case actiontypes.NEW_DEVICE: return addNewDevice(state, action);
        case actiontypes.UPDATE_DEVICE_START: return updateDeviceStart(state, action);
        case actiontypes.UPDATE_DEVICE_SUCCESS: return updateDeviceSuccess(state, action);
        case actiontypes.UPDATE_DEVICE_FAIL: return updateDeviceFail(state, action);
        case actiontypes.LOAD_DEVICE_START: return loadDeviceStart(state, action);
        case actiontypes.LOAD_DEVICE_SUCCESS: return loadDeviceSuccess(state, action);
        case actiontypes.LOAD_DEVICE_FAIL: return loadDeviceFail(state, action);
        case actiontypes.NEW_ESP32_METRIC: return getNewESP32Metrics(state, action);
        case actiontypes.NEW_NANO_METRIC: return getNewNanoMetrics(state, action);
        case actiontypes.GET_HISTORY_DATA: return getHistoryForAllDevice(state, action);
        default:
            return state;
    }
};

export default reducer;
