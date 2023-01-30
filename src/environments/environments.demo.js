// require('dotenv').config()

// export const environment = {
//     production: false,
//     baseURL: `${process.env.REACT_APP_API_URL}`,
//     tgd: {
//         clientId: `${process.env.REACT_APP_TGD_CLIENT_ID}`,
//         clientSecret: `${process.env.REACT_APP_TGD_CLIENT_SECRET}`,
//         redirectURI: `${process.env.REACT_APP_TGD_REDIRECT_URI}`,
//         authURL: `${process.env.REACT_APP_TGD_AUTH_URL}`,
//         apiURL: `${process.env.REACT_APP_TGD_API_URL}`,
//     }
// }
export const environment = {
    production: false,
    baseURL: `http://201.217.244.105:8000/portalpaciente/api/v1`,
    tgd: {
        clientId: `109_469fzlhy0084gkscg4gsk8k88ow4kgggso8s44ososo80ccos8`,
        clientSecret: `1pnatc2ds77ocoggsk0gw4ccsw4gswoocows40ogcww4owg0c8`,
        redirectURI: `http://201.217.244.105:8000/auth-tgd`,
        authURL: `=https://stage.ventanillaunica.chaco.gov.ar/oauth/v2`,
        apiURL: `http://stage.ventanillaunica.chaco.gov.ar/api/v1`,
    }
}