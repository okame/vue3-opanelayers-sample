<template>
  <div class="slider">
    <input @change="onChangeSlider" type="range" min="0" max="3000">{{ height }}m
  </div>
  <ol-map id="map">
    <ol-view :center="center" :zoom="zoom" />

    <ol-vector-tile-layer :styles="vtstyle">
      <ol-source-vector-tile :url="url" :format="mvtFormat" />
    </ol-vector-tile-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature v-for="(feature, index) in features" :key="index">
          <ol-geom-point :coordinates="feature.getGeometry()?.getCoordinates()" />
          <ol-style>
            <ol-style-circle radius="5">
              <ol-style-fill color="rgba(255, 0, 0, 0.5)" />
              <ol-style-stroke color="rgba(255, 0, 0, 1)" width="1" />
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { throttle } from 'lodash'
import MVTFormat from 'ol/format/MVT'
import { transform } from 'ol/proj'
import vtstyle from '@/lib/vtstyle'
import geojson from '@/json/mt.json'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'

const center = transform([139.767125, 35.681236], 'EPSG:4326', 'EPSG:3857')
const zoom = 10
const mvtFormat = new MVTFormat()
const url = 'https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf'

const baseFeatures = geojson.features
  .map((f) => {
    const geometry = new Point(transform(f.geometry.coordinates, 'EPSG:4326', 'EPSG:3857'))
    const height = Number(f.properties['標高'].split('m')[0])
    const feature = new Feature({ geometry, height })

    return feature
  })
  .filter((f) => {
    return f.getGeometry()?.getCoordinates()
  })

const features = computed(() => {
  return baseFeatures.filter(f => {
    return f.get('height') > height.value
  })
})

const height = ref(0)
const onChangeSlider = throttle((e: any) => {
  const value = Number(e.target.value)
  height.value = value
}, 50)
</script>

<style scoped lang="sass">
#map
  width: 100%
  height: 100%
  position: absolute
  top: 0
  left: 0
  z-index: 0

.slider
  position: fixed
  bottom: 20px
  left: 20px
  z-index: 1000
</style>
