import Page_comp from "../componants/Page_comp.js";
//import Calculator_comp from "../componants/calculator_comp.js";

export default class Home extends Page_comp {
    async render() {
      
        return Page_comp.renderPage(() => `
      <section class="main-content">
        <h1>Welcome to Skyrim Calculator</h1>

        <h2>Optimisez votre expérience de jeu avec le Calculateur Skyrim</h2>
        <p>
  
Bienvenue sur notre Calculateur Skyrim, l'outil ultime pour les joueurs de The Elder Scrolls V: Skyrim souhaitant maximiser les performances de leur personnage et optimiser leur expérience de jeu.

<h2>Qu'est-ce que le Calculateur Skyrim ?</h2>

<p>
Notre Calculateur Skyrim est un outil puissant conçu pour vous aider à créer, optimiser et gérer votre personnage dans Skyrim. Grâce à une interface intuitive, vous pourrez planifier vos choix de race, compétences, avantages et équipements, afin d'obtenir la combinaison la plus efficace pour votre style de jeu.
Fonctionnalités principales

    Création de builds personnalisés : Choisissez votre race, spécialité, compétences et avantages afin de créer un personnage qui correspond parfaitement à vos préférences de jeu.

    Optimisation des performances : Grâce à des calculs basés sur les statistiques du jeu, le calculateur vous aide à obtenir les meilleurs résultats en termes de dégâts, de défense et d'efficacité des compétences.

    Visualisation des statistiques : En temps réel, vous pouvez voir l'impact de vos choix sur les statistiques de votre personnage, ce qui vous permet de prendre des décisions éclairées.

    Suggestions personnalisées : Si vous ne savez pas quel build choisir, notre outil vous propose des options basées sur les meilleures pratiques et les choix populaires de la communauté.
</p>

<h2>Pourquoi utiliser notre Calculateur Skyrim ? </h2>

<p>
    Gain de temps : Ne perdez plus de temps à expérimenter des builds inefficaces. Notre calculateur vous aide à créer un personnage optimal rapidement et facilement.

    Optimisation maximale : Que vous soyez un débutant ou un joueur expérimenté, notre outil vous permet de tirer le meilleur parti de votre personnage.

    Simplicité et accessibilité : L'interface conviviale et simple à utiliser vous permet d'accéder à des informations détaillées sans nécessiter de connaissances avancées en théorie de jeu.

    Personnalisation : Le calculateur prend en compte tous les aspects de votre personnage, des compétences aux équipements, pour vous offrir des suggestions adaptées à vos choix et votre style de jeu.</p>
        
</p>   

      </section>
    `);
    }
}

//${Calculator_comp.rendergraph()}