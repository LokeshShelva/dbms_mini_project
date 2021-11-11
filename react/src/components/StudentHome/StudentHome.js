import { useEffect, useState } from "react";
import axios from "axios";

function StudentNameCard() {

}

function StudentHome({ userId }) {

    useEffect(
        () => {
            axios.get(`/api/student/userId/${userId}`).then((val) => console.log(val.data))
        }, [])

    return (
        <h1>Hello</h1>
    )
}

export default StudentHome;