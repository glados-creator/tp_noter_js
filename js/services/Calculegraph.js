export default {
    graph1: function() {
        // Logique de création du graphique graph1
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Smithing', 'Heavy_Armor', 'Block', 'Two_Handed', 'One_Handed',
                    'Archery', 'Light_Armor', 'Sneak', 'Lockpicking', 'Pickpocket',
                'Speech', 'Alchemy', 'Illusion', 'Conjuration', 'Destruction',
            'Restoration', 'Alteration', 'Enchanting'],
                datasets: [{
                    label: 'Characteristique',
                    data: [15, 15, 15, 15, 15,15, 15, 15, 15, 15,15, 15, 15, 15, 15,15, 15, 15],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },
};
