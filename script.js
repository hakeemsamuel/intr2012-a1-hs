document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map', {
        scrollWheelZoom: false
    }).setView([43.7, -79.42], 11); 

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    const gtaGeoJSON = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [-79.6393, 43.8555],
                            [-79.1169, 43.8555],
                            [-79.1169, 43.5810],
                            [-79.6393, 43.5810],
                            [-79.6393, 43.8555]
                        ]
                    ]
                },
                "properties": {
                    "name": "Greater Toronto Area"
                }
            }
        ]
    };

    L.geoJSON(gtaGeoJSON).addTo(map);

      const gtaRegions = [
        { name: "Toronto", lat: 43.7001, lng: -79.4163 },
        { name: "Mississauga", lat: 43.5890, lng: -79.6441 },
        { name: "Brampton", lat: 43.7315, lng: -79.7624 },
        { name: "Markham", lat: 43.8561, lng: -79.3370 },
        { name: "Vaughan", lat: 43.8372, lng: -79.5083 },
        { name: "Richmond Hill", lat: 43.8828, lng: -79.4403 },
        { name: "Oakville", lat: 43.4675, lng: -79.6877 },
        { name: "Burlington", lat: 43.3255, lng: -79.7990 },
        { name: "Pickering", lat: 43.8350, lng: -79.0890 },
        { name: "Ajax", lat: 43.8509, lng: -79.0204 },
        { name: "Whitby", lat: 43.8975, lng: -78.9429 },
        { name: "Oshawa", lat: 43.8975, lng: -78.8658 },
        { name: "Newmarket", lat: 44.0504, lng: -79.4663 }
    ];

    

    gtaRegions.forEach(region => {
        L.marker([region.lat, region.lng]).addTo(map)
            .bindPopup(`<b>${region.name}</b><br>Lat: ${region.lat}, Lng: ${region.lng}`);
    });

    
    const barChartData = {
        labels: [
            "$650k to $850k", "$850k to $940k", "$940k to $1.0M", "$1.0M to $1.1M", "$1.1M to $1.3M", "$1.3M to $2.8M"
        ],
        datasets: [{
            label: 'Percentage',
            data: [16, 12, 11, 10, 10, 41],
            backgroundColor: [
                'rgba(0, 0, 255, 0.5)', // Blue with 50% opacity
                'rgba(0, 0, 255, 0.75)', // Blue with 75% opacity
                'rgba(0, 0, 255, 1)', // Blue with 100% opacity
                'rgba(255, 0, 0, 0.5)', // Red with 50% opacity
                'rgba(255, 0, 0, 0.75)', // Red with 75% opacity
                'rgba(255, 0, 0, 1)' // Red with 100% opacity
            ],
            borderColor: [
                'rgba(0, 0, 255, 1)', // Blue border
                'rgba(0, 0, 255, 1)', // Blue border
                'rgba(0, 0, 255, 1)', // Blue border
                'rgba(255, 0, 0, 1)', // Red border
                'rgba(255, 0, 0, 1)', // Red border
                'rgba(255, 0, 0, 1)' // Red border
            ],
            borderWidth: 1
        }]
    };

    const barChartConfig = {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Housing Price Distribution'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#696969' // Change grid lines to white
                    }
                },
                x: {
                    grid: {
                        color: '#a9a9a9' // Change grid lines to white
                    }
                }
            }
        }
    };

    const barCtx = document.getElementById('myChart').getContext('2d');
    const myBarChart = new Chart(barCtx, barChartConfig);

    // Second Chart.js configuration with provided data
    const housingMarketData = {
        labels: [
            "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024", 
            "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024"
        ],
        datasets: [{
            label: "Average Home Price (GTA)",
            data: [
                1040994, null, null, null, null, null, 
                1130000, null, null, 1130000, 1106050, 1067186
            ],
            borderColor: "#007bff",
            backgroundColor: "#007bff",
            pointBackgroundColor: "#ff0000", 
            pointBorderColor: "#fff",
            pointRadius: (ctx) => ctx.raw !== null ? 6 : 0, 
            pointStyle: "circle",
            fill: false,
            tension: 0.3
        }]
    };

    const secondConfig = {
        type: 'line', 
        data: housingMarketData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Grid Line Settings'
                }
            },
            scales: {
                x: {
                    type: 'category', 
                    border: {
                        display: true
                    },
                    grid: {
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: true,
                        color: '#696969' // Change grid lines to white
                    }
                },
                y: {
                    border: {
                        display: false
                    },
                    grid: {
                        color: '#A9A9A9' // Change grid lines to white
                    },
                }
            }
        }
    };

    const secondCtx = document.getElementById('mySecondChart').getContext('2d');
    const mySecondChart = new Chart(secondCtx, secondConfig);
});

