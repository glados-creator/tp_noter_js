export default class Footer {
    static async render() {
        return `
        <footer>
        <ul>
            <li> <a href="/">Home</a> </li>
            <li> <a href="/#/preset">Preset</a> </li>
            <li> <a href="/#/comparaison">Comparaison</a> </li>
            <li> <a href="/#/user">Compte</a> </li>
        </ul>
        </footer>
        `;
    }
}