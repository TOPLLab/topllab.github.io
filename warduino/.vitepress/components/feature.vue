<script setup lang='ts'>
import {withBase} from 'vitepress';

defineProps<{
  header: string
  icon?: string
  tagline?: string
  link?: string
}>()
</script>

<template>
  <component
      :is="'a'"
      class="VPLink"
      :class="{
      link: link,
      'no-icon': true
    }"
      :href="link ? withBase(link) : undefined"
  >
    <article>
      <div class="heading">
        <div class="icon">
          <span v-if="icon" v-html="icon" class="material-symbols-rounded"></span>
        </div>
        <div>
          <h2 v-html="header" class="header"></h2>
        </div>
      </div>
      <p v-if="tagline" v-html="tagline" class="details"></p>
    </article>
  </component>
</template>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

/* features */
article {
  cursor: pointer;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  padding: 24px;
  transition: color .25s, background-color .25s;
}

.heading {
  display: flex;
  align-items: center;
}

.icon {
  box-sizing: border-box;
  margin-right: 8px;
  margin-top: 5px;
}

.icon > span {
  line-height: 24px;
  letter-spacing: -0.02em;

}

.header {
  margin: 0;
  padding: 0;
  letter-spacing: -0.02em;
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

article:hover {
  background-color: var(--vp-c-bg-soft-up);
}

article:hover > * {
  color: var(--vp-c-brand);
}
</style>