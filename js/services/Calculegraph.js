import Chart from 'chart.js/auto';

function graph1() {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Créez un graphique
    const myChart = new Chart(ctx, {
        type: 'bar', // Type de graphique : 'bar', 'line', 'pie', etc.
        data: {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'], // Les étiquettes de l'axe des X
            datasets: [{
                label: 'Ventes mensuelles', // Légende du graphique
                data: [12, 19, 3, 5, 2], // Les données pour chaque mois
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond des barres
                borderColor: 'rgba(75, 192, 192, 1)', // Couleur des bordures des barres
                borderWidth: 1 // Épaisseur des bordures
            }]
        },
        options: {
            responsive: true, // Le graphique s'ajuste automatiquement
            scales: {
                y: {
                    beginAtZero: true // Commence l'axe des Y à 0
                }
            }
        }
    });

}


function graph2() {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Créez un graphique
    const myChart = new Chart(ctx, {
        type: 'bar', // Type de graphique : 'bar', 'line', 'pie', etc.
        data: {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'], // Les étiquettes de l'axe des X
            datasets: [{
                label: 'Ventes mensuelles', // Légende du graphique
                data: [12, 19, 3, 5, 2], // Les données pour chaque mois
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond des barres
                borderColor: 'rgba(75, 192, 192, 1)', // Couleur des bordures des barres
                borderWidth: 1 // Épaisseur des bordures
            }]
        },
        options: {
            responsive: true, // Le graphique s'ajuste automatiquement
            scales: {
                y: {
                    beginAtZero: true // Commence l'axe des Y à 0
                }
            }
        }
    });

}
