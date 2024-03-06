<script setup lang="ts">
import { onMounted } from 'vue'
import Map from 'ol/Map'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import View from 'ol/View'
import MVTFormat from 'ol/format/MVT'
import { transform } from 'ol/proj'
import { type StyleFunction } from 'ol/style/Style'
import vtstyle from '@/lib/vtstyle'

onMounted(() => {
  const center = transform([139.767125, 35.681236], 'EPSG:4326', 'EPSG:3857')
  const zoom = 12

  new Map({
    target: 'map',
    layers: [
      new VectorTileLayer({
        source: new VectorTileSource({
          format: new MVTFormat(),
          url: 'https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf'
        }),
        style: vtstyle as StyleFunction
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
