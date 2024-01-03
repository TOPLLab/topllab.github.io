<template>
  <figure :class="classes">
    <img :src="light" class="light-visible" :class="zoom" :alt="caption"><img :src="dark" class="dark-visible" :class="zoom" :alt="caption">
    <figcaption v-if="caption">Figure. {{ caption }}</figcaption>
  </figure>
</template>

<script>
import {withBase} from "vitepress";

export default {
 props: {
   src: {
     type: String,
     required: true
   },
   classes: {
     type: String,
     required: false,
     default: ''
   },
   darkmode: {
     type: String,
     required: false
   },
   caption: {
     type: String,
     required: false
   },
   zoomable: {
     type: Boolean,
     required: false,
     default: false
   }
 },
  data() {
   return {
     'light': withBase(this.src),
     'dark': withBase(this.darkmode ? this.darkmode : this.src),
     'zoom': this.zoomable ? 'data-zoomable' : ''
   }
  },
}
</script>

<style scoped>
figcaption {
  font-size: small;
  text-align: justify;

  margin-top: 15px;
}

</style>
