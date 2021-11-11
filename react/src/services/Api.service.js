import axios from "axios"

export default function get(url, callback) {
    axios.get(url).then(callback)
}

