export default class HeaderBar {
    static async render() {
        return `
      <header class="header-bar">
        <div class="header-left">
          <a href="/" class="header-title">Skyrim Calculator</a>
        </div>
        <div class="header-right">
          <a href="/#/preset" class="header-button">Preset</a>
          <a href="/#/comparaison" class="header-button">Comparaison</a>
          <a href="/#/user" class="header-button">Compte</a>
        </div>
      </header>
    `;
    }
}
