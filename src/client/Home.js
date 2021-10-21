import React from "react";
import axios from "axios";

function Home() {
    const [data, setData] = React.useState({});

    const fetchData = () => {
        axios.get('/api').then((val) => {
            setData(val.data)
        })
    }

    React.useState(fetchData(), [])

    return (
        <div>
            {data ? <h1>{data.message}</h1> : <h1>Hello</h1>}
        </div>
    )
}

export default Home;
