import Page_comp from "../componants/Page";

export default class User extends Page_comp{
    async render() {
        return `
            <h1>User</h1>
            <p>Page de l'utilisateur</p>
        `;
    }
}