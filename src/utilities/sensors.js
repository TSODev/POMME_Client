import BME280 from './bme280'
import DHT22 from './dht22'

const SENSORS = {
    capabilities: ['temperature', 'humidity', 'pressure'],
    models: [BME280,DHT22]
}

export default SENSORS