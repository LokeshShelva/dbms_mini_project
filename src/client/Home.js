import React from "react";
import axios from "axios";

function Home() {
    const [data, setData] = React.useState([]);

    const fetchData = () => {
        axios.get('/faculty/teaching', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzU1MjMyMDYsImV4cCI6MTYzODExNTIwNn0.JSedX7alhX53j5LYtrus_AfmY-Xc0ktikFRXGdkltig',
            }
        }).then((val) => {
            setData(val.data)
        })
    }

    React.useEffect(fetchData, [])

    return (
        <div>
            {data && data.map(val =>
                <div key={val.id}>
                    <h4>{val.name}</h4>
                    <p>Rs. {val.salary}</p>
                </div>
            )}
        </div>
    )
}

export default Home;
