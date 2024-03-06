<script setup lang="ts">
import { onMounted } from 'vue'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'
import { transform } from 'ol/proj'

onMounted(() => {
  const center = transform([139.767125, 35.681236], 'EPSG:4326', 'EPSG:3857')
  const zoom = 12

  new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({ center, zoom })
  })
})
</script>

<template>
  <main>
    <div id="map"></div>
  </main>
</template>
