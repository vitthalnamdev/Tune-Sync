const BASE_URL = process.env.REACT_APP_BASE_URL


export const endpoints ={
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login"
}

export const songEndpoints = {
    AUTOSUGGETION_API: BASE_URL + "songs/autosuggestion",
    GET_SONG: BASE_URL + "songs/song/:id"
}