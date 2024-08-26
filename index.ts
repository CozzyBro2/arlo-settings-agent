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

function queryApi() {
    for (const name of devices) {
        api.post(`/device/${name}/arm`, unarm_config)
            .then(function(response) {
                console.log("success")
            }).catch(function(err) {
                console.log(err.message)
            })
    }
}

queryApi()
setInterval(queryApi, 30000)