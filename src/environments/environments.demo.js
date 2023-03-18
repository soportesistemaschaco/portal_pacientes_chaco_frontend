require('dotenv').config()

export const environment = {
    production: false,
    baseURL: `${process.env.REACT_APP_API_URL}`,
    tgd: {
        clientId: `${process.env.REACT_APP_TGD_CLIENT_ID}`,
        clientSecret: `${process.env.REACT_APP_TGD_CLIENT_SECRET}`,
        redirectURI: `${process.env.REACT_APP_TGD_REDIRECT_URI}`,
        authURL: `${process.env.REACT_APP_TGD_AUTH_URL}`,
        apiURL: `${process.env.REACT_APP_TGD_API_URL}`,
    }
}