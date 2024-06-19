import Cookies from "universal-cookie";

const isUserLogged = () => {
    const cookies = new Cookies();


    if (Boolean(cookies.get("auth_token"))){
        return true;
    }
    else{
        window.localStorage.clear()
        return false;
    }
}

export default isUserLogged;