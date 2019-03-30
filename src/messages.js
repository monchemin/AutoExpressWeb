
const Messages = {
    loading: {fr: "Chargement en cours", en: "loading content"},
    loginTitle: {fr: "Connexion", en: "Sign In"}
}

 const GetMessage = (id) => {
    let lang = window.navigator.language;
    let msg = Messages[id][lang]
    return (msg !== undefined ? msg : Messages[id]["fr"]) 
}

export default GetMessage;