import axios from "axios"

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

function updateState(url: string, config: {}) {
    for (const name of devices) {
        api.post(`/device/${name}/${url}`, config)
            .then(function() {
                console.log(`POST /device/${name}/${url} succesful.`)
            }).catch(function(err) {
                console.log(`POST /device/${name}/${url} failed: \n${err.message}`)
            })
    }
}

function handleAPI() {
    updateState("arm", unarm_config)
    updateState("quality", quality_config)
}

handleAPI()
setInterval(handleAPI, 30000)