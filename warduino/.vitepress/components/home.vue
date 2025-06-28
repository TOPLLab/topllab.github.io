<script setup lang="ts">
import {useData} from 'vitepress'
import Feature from "./feature.vue";

const {frontmatter: fm} = useData()
</script>

<template>
  <div class="home">

    <!-- hero -->
    <div class="hero">
      <div class="container">
        <div class="main">
          <h1 v-if="fm.hero.name" class="name">
            <span v-html="fm.hero.name" class="clip"></span>
          </h1>
          <p v-if="fm.hero.text" v-html="fm.hero.text" class="smaller"></p>
          <p v-if="fm.hero.tagline" v-html="fm.hero.tagline" class="tagline"></p>
        </div>
      </div>
    </div>

    <!-- projects -->
    <!--
    <div class="features">
      <div class="container">
        <div class="grow divider">
          <h4 class="center">WARDuino</h4>
          <h4 class="center">EDWARD</h4>
          <h4 class="center">Latch</h4>
        </div>
      </div>
    </div>
    -->

    <!-- details -->
    <div class="details">
      <div class="container">
        <div class="vp-doc grow">
<!--          <h2></h2>-->

          <div style="display: flex; flex-flow: column nowrap; gap: 24px; justify-content: space-between">
            <div class="grow divider">
              <article class="list">
                <div class="heading">
                  <div class="icon">
                    <span class="material-symbols-rounded">rocket_launch</span>
                  </div>
                  <div>
                    <h4>Getting started</h4>
                  </div>
                </div>
                <p><a href="./guide/get-started.html">-&gt; Get started</a></p>
                <p><a href="./guide/examples/index.html">-&gt; Examples</a></p>
                <p><a href="./guide/plugin/">-&gt; VS Code plugin</a></p>
                <p><a href="./guide/latch.html">-&gt; Automated testing</a></p>
              </article>
              <article class="list">
                <div class="heading">
                  <div class="icon">
                    <span class="material-symbols-rounded">menu_book</span>
                  </div>
                  <div>
                    <h4>References</h4>
                  </div>
                </div>
                <p><a href="./reference/architecture.html">-&gt; WARDuino architecture</a></p>
                <p><a href="./reference/actions/index.html">-&gt; Built-in actions</a></p>
                <p><a href="./reference/debug-protocol.html">-&gt; Remote debug protocol</a></p>
                <p><a href="./reference/edward/index.html">-&gt; EDWARD debugger</a></p>
                <p><a href="./latch/index.html">-&gt; Latch testing</a></p>
              </article>
              <article class="list">
                <div class="heading">
                  <div class="icon">
                    <span class="material-symbols-rounded">school</span>
                  </div>
                  <div>
                    <h4>Tutorials</h4>
                  </div>
                </div>
                <p><a href="./guide/examples/index.html">-&gt; Example programs</a></p>
                <p><a href="./guide/plugin/tutorial.html">-&gt; Debugging with VS Code</a></p>
                <p><a href="./reference/edward/concurrency.html">-&gt; Debugging concurrency issues</a></p>
              </article>

            </div>

            <div class="grow divider">
              <article class="list">
                <div class="heading">
                  <div class="icon">
                    <span class="material-symbols-rounded">terminal</span>
                  </div>
                  <div>
                    <h4>Developer's guide</h4>
                  </div>
                </div>
                <p><a style="font-size: 14px" href="./reference/contributing.html">-&gt; Contributing</a></p>
                <p><a style="font-size: 14px" href="./reference/development.html">-&gt; Debugging the debugger</a></p>
                <p><a href="./reference/platforms.html">-&gt; Supported platforms</a></p>
                <p><a href="https://github.com/orgs/TOPLLab/projects/1" target="_blank">-&gt; Roadmap <span
                    class="material-symbols-rounded">open_in_new</span></a></p>
              </article>
              <article class="list">
                <div class="heading">
                  <div class="icon">
                    <span class="material-symbols-rounded">package</span>
                  </div>
                  <div>
                    <h4>Templates</h4>
                  </div>
                </div>
                <p><a href="https://github.com/TOPLLab/as-warduino-template" target="_blank">-&gt; AssemblyScript <span
                    class="material-symbols-rounded">open_in_new</span></a></p>
              </article>
              <article class="list">
                <div class="heading">
                  <div class="icon">
                    <span class="material-symbols-rounded">newsstand</span>
                  </div>
                  <div>
                    <h4>Blog posts</h4>
                  </div>
                </div>
                <p><a style="font-size: 14px" href="./blog/multiverse.html">-&gt; Applications for the MIO debugger</a></p>
              </article>
            </div>
          </div>

          <h2></h2>

          <h4 class="center">Research</h4>
          <p class="center">
            WARDuino and the related projects documented here, are being developed as part of active research projects.
            The principle investigators at Ghent University and the VUB, maintain this documentation website and the
            associated software.
            You can find out more about the research on the <i>published articles</i> page.
          </p>
          <p class="center"><a href="./articles/">-&gt; Published articles</a></p>

          <h2></h2>


        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

/* features */
.home {
  padding-bottom: 96px;
}

@media (min-width: 768px) {
  .home {
    padding-bottom: 128px;
  }
}

/* hero & features */
.hero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
}

.features, .details {
  padding: 0 24px;
}

@media (min-width: 640px) {
  .hero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }

  .features, .details {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .hero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
  }

  .features, .details {
    padding: 0 64px;
  }
}

.name,
.smaller {
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

.VPHero.has-image .name,
.VPHero.has-image .smaller {
  margin: 0 auto;
}

/* hero text */

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

@media (min-width: 640px) {
  .name,
  .smaller {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}

@media (min-width: 960px) {
  .name,
  .smaller {
    line-height: 64px;
    font-size: 56px;
  }

  .hero.has-image .name,
  .hero.has-image .smaller {
    margin: 0;
  }
}

.tagline {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

.hero.has-image .tagline {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .tagline {
    line-height: 36px;
    font-size: 24px;
  }

  .hero.has-image .tagline {
    margin: 0;
  }
}

/* layout */
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
  }
}

.main {
  position: relative;
  z-index: 10;
  order: 2;
  flex-grow: 1;
  flex-shrink: 0;
}

.hero.has-image .container {
  text-align: center;
}

.grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;
  align-content: space-around;
  gap: 24px;
}

.column-3 > .item {
  width: calc((100% - (24px * 2)) / 3);
}

@media (min-width: 960px) {
  .hero.has-image .container {
    text-align: left;
  }

  .main {
    order: 1;
    width: calc((100% / 3) * 2);
  }

  .hero.has-image .main {
    max-width: 592px;
  }
}

@media (max-width: 640px) {
  .grid > .item {
    width: 100%;
  }
}

/* details */

.heading {
  display: flex;
  align-items: center;
}

.icon {
  box-sizing: border-box;
  margin-right: 8px;
  vertical-align: text-bottom;
}

.icon > span {
  line-height: 24px;
  letter-spacing: -0.02em;

}

.grow {
  flex-grow: 1;
}

h4.center {
  text-align: center;
}

p.center {
  max-width: 688px;
  margin: 0 auto;
}


@media (max-width: 640px) {
  p.center {
    max-width: 100%;
  }
}

.divider {
  display: flex;
  align-items: flex-start;
}

.divider > * {
  flex: 1;
}

@media (max-width: 640px) {
  .divider {
    flex-wrap: wrap;
    gap: 24px;
    justify-content: space-between;
  }

  .divider > * {
    flex: 0 0 auto;
    width: 100%;
  }
}

p {
  font-size: 14px;
  margin-top: 2px;
  margin-bottom: 0;
  padding-top: 8px;
  line-height: 24px;
  font-weight: 400;
}

a > span {
  font-size: inherit;
  font-weight: inherit;
}
</style>
