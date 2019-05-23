
const Messages = {
    LOADING: {fr: "Chargement en cours", en: "loading content"},
    SIGN_IN: {fr: "Connexion", en: "LogIn"},
    REGISTER: {fr: "Creer un compte", en: "Sign up"},
    RESERVATION: {fr: "Réserver", en: "Book"},
    BEEDRIVER: {fr: "Devenir Conducteur", en: "Driver Sign Up"},
    CREATE_ROUTE: {fr: "Annoncer un départ", en: "Make a route"},
    LOGIN_LOADING: {fr: "Connexion en cours...", en: "Loading conection..."} 
}


 const GetMessage = (id) => {
    let lang = window.navigator.language.substring(0,2);
    let msg = Messages[id][lang]
    return (msg !== undefined ? msg : Messages[id]["fr"]) 
}

export default GetMessage;