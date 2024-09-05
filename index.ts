import axios from "axios"

// TODO: Read serial numbers from config
const devices = ["A0B1917XA2F1D", "A0B1917GA2B29"]

const api = axios.create ({
    baseURL: process.env.ASA_BASE_URL ?? "http://192.168.1.30:5100",
    timeout: 5000
})

const unarm_config = {
    PIRTargetState: "Disarmed",
    VideoMotionEstimationEnable: false,
    AudioTargetState: "Disarmed"
}

const quality_config = {
    quality: "medium"
}

const audio_config = {
    enabled: false
}

const pir_config = {
    enabled: false,
    sensitivity: 80
}

function updateDevice(url: string, device: string, config: {}) {
    const endpoint = `/device/${device}/${url}`

    api.post(endpoint, config)
        .then(function(res) {
            if (res.data.result === false) {
                throw new Error("Unknown failure (result is false)")
            }
            console.log(`POST ${endpoint} succesful.`)
        }).catch(function(err) {
            console.log(`POST ${endpoint} failed: \n${err.message}`)
    })
}

function updateState(url: string, config: {}) {
    for (const device of devices) {
        updateDevice(url, device, config)   
    }
}

// TODO: Parse a user defined mapping of things to configure.
function handleAPI() {
    updateDevice("friendlyname", devices[0], {name: "Front"})
    updateDevice("friendlyname", devices[1], {name: "Back"})

    updateState("audiospeaker", audio_config)
    updateState("audiomic", audio_config)
    updateState("pirled", pir_config)
    updateState("quality", quality_config)
}

handleAPI()
setInterval(handleAPI, 200000)