// https://vitepress.dev/guide/custom-theme
import { h, onMounted, watch, nextTick } from 'vue';
import Theme from 'vitepress/theme';
import { useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';

import './style.css'

export default {
  ...Theme,

  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('img.data-zoomable', { background: 'var(--vp-c-bg)' });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },

  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // app.component('Home', home);
  }
}
