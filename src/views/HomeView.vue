<script setup lang="ts">
</script>

<template>
  <main>
    <ul>
      <li><router-link to="osm">オープンストリートマップ</router-link></li>
      <li><router-link to="gsi">国土地理院</router-link></li>
      <li><router-link to="mt">山情報</router-link></li>
      <li><router-link to="ol">vue3-openlayers</router-link></li>
    </ul>
  </main>
</template>

<style scoped lang="sass">
#map
  width: 100%
  height: 100%
  position: absolute
  top: 0
  left: 0
  z-index: 0
</style>
