import Page_comp from "../componants/Page";

export default class Home_page extends Page_comp{
    async render() {
        return `
            <h1>Home</h1>
            <p>Page d'accueil</p>
        `;
    }
}