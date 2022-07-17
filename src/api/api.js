import axios from "axios";

export function getUsers() {

    axios.get("/users").then((response) => {
        console.log(response.data);
    });
}