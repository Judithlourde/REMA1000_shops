<template>
	<div id="map">
		<LoadingPage />
	</div>
	<Header />
</template>

<script>
	import mapboxgl from 'mapbox-gl';
	import LoadingPage from '../components/LoadingPage.vue'
	import Header from '../components/Header.vue'

	export default {
		components: {
			LoadingPage,
			Header
		},
		
		data() {
			return {
				mapbox_id: import.meta.env.VITE_MAPBOX_ID,
				stores: [],
			}
		},

		created() {
			this.fetchStores();
			this.fetchGeoCode();	
		},

		methods: {
			async fetchGeoCode() {
				navigator.geolocation.getCurrentPosition(position => {
					this.setupMap([position.coords.longitude, position.coords.latitude]);
				});			
			},

			async setupMap(center) {
				mapboxgl.accessToken = this.mapbox_id;
				const map = new mapboxgl.Map({
					container: 'map', // container ID
					style: 'mapbox://styles/mapbox/streets-v11', // style URL
					center: center, // starting position [lng, lat]
					zoom: 12 // starting zoom
				});
			
				// Create a marker for the current location and add it to the map.
				new mapboxgl.Marker({color: 'green'}).setLngLat(center).addTo(map);

				// Create markers for REMA 1000 shops and add it to the map - with the help og forEach function getting the coordinates
				this.stores.forEach(store => {
					const element = document.createElement('div');
					element.className = 'marker';
					element.style.backgroundImage = `url(/images/location-tag.svg)`;
					element.style.backgroundSize = '100%';	
					
					const popUpMarker = new mapboxgl.Popup()
					.setHTML(store.properties.shopName)

					new mapboxgl.Marker(element)
					.setLngLat([store.geometry.coordinates[0], store.geometry.coordinates[1]])
					.setPopup(popUpMarker)
					.addTo(map);
				});			
			
				// Add zoom and rotation controls to the map.
				map.addControl(new mapboxgl.NavigationControl());
				map.addControl(
					new MapboxDirections({
						accessToken: mapboxgl.accessToken
					}),
					'top-left'
				);	
			},

			async fetchStores() {
				const proxyUrl =`https://api.allorigins.win/get?url=${encodeURIComponent('https://rema.no/api/v2/stores')}`
				const responseStores = await fetch(proxyUrl)
				
				try {
					const results = await responseStores.json();											
					const parsedData = JSON.parse(results.contents)					
					const storesData = parsedData.results					
					this.storesData(storesData); 

				} catch(error) {
					console.log(error)
				}
			},

			// Map function creates the new array with the particular data
			storesData(storesData) {
				this.stores = storesData.map(store => {
					return {
						'type': 'StoresCollection',
						'properties': {
							'shopName': store.name,
							'municipalityName': store.municipalityName,
							'message': store.name,

							'openingHours': {
								"Monday": store.openingHours.Monday,
								"Tuesday": store.openingHours.Tuesday,
								"Wednesday": store.openingHours.Wednesday,
								"Thursday": store.openingHours.Thursday,
								"Friday": store.openingHours.Friday,
								"Saturday": store.openingHours.Saturday,
								"Sunday": store.openingHours.Sunday,
							}
						},

						'geometry': {
							'type': 'Point',
							'coordinates': [store.longitude, store.latitude]
						}
					}
				});
			}
		},
	}
</script>

<style>
	#map {
		width: 100vw;
		height: 100vh;
	}

	.marker {
		width: 20px;
		height: 20px;
	}
</style>

