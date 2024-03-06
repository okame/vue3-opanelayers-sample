<script setup lang="ts">
import { onMounted } from 'vue'
import Map from 'ol/Map'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import View from 'ol/View'
import MVTFormat from 'ol/format/MVT'
import { transform } from 'ol/proj'
import geojson from '@/json/mt.json'
import vtstyle from '@/lib/vtstyle'
import Style, { type StyleFunction } from 'ol/style/Style'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'

const features = geojson.features.map(f => {
  const geometry = new Point(transform(f.geometry.coordinates, 'EPSG:4326', 'EPSG:3857'))

  return new Feature({ geometry })
})

onMounted(() => {
  const center = transform([139.767125, 35.681236], 'EPSG:4326', 'EPSG:3857')
  const zoom = 10

  new Map({
    target: 'map',
    layers: [
      new VectorTileLayer({
        source: new VectorTileSource({
          format: new MVTFormat(),
          url: 'https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf'
        }),
        style: vtstyle as StyleFunction
      }),
      new VectorLayer({
        source: new VectorSource({
          features
        }),
        style: new Style({
          image: new Circle({
            radius: 4,
            fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' }),
            stroke: new Stroke({ color: 'rgba(255, 0, 0, 1)' })
          })
        })
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
