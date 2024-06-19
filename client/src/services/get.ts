import getServerUrl from "./getServerUrl";

const get = async (path:string, headers = { "Content-Type": "application/json" }) => {
    return await fetch((getServerUrl+path), {
        method: "GET",
        headers: headers
    })
}

export default get;