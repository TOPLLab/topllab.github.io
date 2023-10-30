<template>
  <figure>
    <div id="figure" :class="classes" />
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
 },
  data() {
   return {
     'light': `url(${withBase(this.src)})`,
     'dark': `url(${withBase(this.darkmode ? this.darkmode : this.src)})`
   }
  },
}
</script>

<style scoped>
#figure {
  background: v-bind(light) no-repeat center;
  background-size: contain;
  height: 0;
  padding-top: 50%;
}

html.dark #figure {
  background: v-bind(dark) no-repeat center;
}

figcaption {
  font-size: smaller;
}

</style>
