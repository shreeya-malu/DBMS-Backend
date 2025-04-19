const map = L.map('map').setView([18.48636, 73.81600], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    const cumminsGeoJson = {
      "type": "Polygon",
        "coordinates": [
          [
            [
              73.8164168,
              18.4853467
            ],
            [
              73.8167004,
              18.4856872
            ],
            [
              73.8168962,
              18.4857316
            ],
            [
              73.8166861,
              18.4867995
            ],
            [
              73.8155602,
              18.4865789
            ],
            [
              73.8156214,
              18.4860528
            ],
            [
              73.8158294,
              18.4858168
            ],
            [
              73.8159865,
              18.4856717
            ],
            [
              73.816168,
              18.4855769
            ],
            [
              73.8162985,
              18.4853989
            ],
            [
              73.8164168,
              18.4853467
            ]
          ]
        ]
    };

    // 💡 Convert to Leaflet format (lat, lng)
    const cumminsLatLng = cumminsGeoJson.coordinates[0].map(coord => [coord[1], coord[0]]);

    // 🎯 Add Cummins boundary polygon
    const boundaryPolygon = L.polygon(cumminsLatLng, {
      color: 'blue',
      fillColor: 'green',
      fillOpacity: 0.1,
      weight: 2
    }).addTo(map);

    // 📍 Fit to view
    const bounds = boundaryPolygon.getBounds();
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);
    map.on('drag', function () {
      map.panInsideBounds(bounds, { animate: true });
    });

    boundaryPolygon.bindPopup("<b>Cummins College of Engineering for Women</b>");

    // 🖤 Mask area outside the campus
    const world = [
      [-90, -180],
      [-90, 180],
      [90, 180],
      [90, -180],
      [-90, -180]
    ];

    const mask = L.polygon([world, cumminsLatLng], {
      stroke: false,
      color: '#000',
      fillColor: '#000',
      fillOpacity: 0.7
    }).addTo(map);

  const buildings = [
    {
      name: "IT Department",
      coord: [18.48597,73.81602],
      events: ["AI Seminar", "Hackathon", "Open Lab"]
    },
    {
      name: "Main Building",
      coord: [18.48639,73.81589],
      events: ["Cultural Fest", "Guest Lecture"]
    },
    {
      name: "Mechanical Building",
      coord: [ 18.48552,73.81645],
      events: ["Book Fair", "Research Paper Writing Workshop"]
    },

    {
      name: "Instru Building",
      coord: [ 18.48646,73.81649],
      events: ["Book Fair", "Research Paper Writing Workshop"]
    },

    {
      name: "Suswaad Canteen",
      coord: [ 18.48620,73.81671],
      events: ["Book Fair", "Research Paper Writing Workshop"]
    }
  ];

  buildings.forEach(building => {
    const marker = L.marker(building.coord).addTo(map);
    marker.bindTooltip(building.name, {
      permanent: true,
      direction: 'top',
      className: 'building-label'
    });
  
    // ✨ Optional: Create a tile-style popup content
    const popupContent = `
      <div class="popup-tile">
        <h3>${building.name}</h3>
        <ul>
          ${building.events.map(event => `<li>${event}</li>`).join('')}
        </ul>
      </div>
    `;
    marker.bindPopup(popupContent);
  });
  