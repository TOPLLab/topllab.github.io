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

    <!-- features -->
    <!--
    <div class="features">
      <div class="container">
        <div class="grid column-3">
          <div class="item">
            <feature icon="rocket_launch"
                     header="Get started"
                     tagline="Start developing programs with WARDuino."
                     link="/guide/get-started"/>
          </div>
          <div class="item">
            <feature icon="terminal"
                     header="IDE support"
                     tagline="Manual for the WARDuino VS Code plugin."
                     link="/guide/plugin"/>
          </div>
          <div class="item">
            <feature icon="check_box"
                     header="Testing"
                     tagline="Get started with the Latch testing framework."
                     link="/guide/latch"/>
          </div>
          <div class="item">
            <feature icon="school"
                     header="Examples & Tutorials"
                     tagline="A selection of examples to get you started with WARDuino."
                     link="/guide/examples/"/>
          </div>
          <div class="item">
            <feature icon="menu_book"
                     header="Developer's guide"
                     tagline="Documentation of the WARDuino virtual machine implementation."
                     link="/reference/"/>
          </div>
          <div class="item">
            <feature icon="diversity_3"
                     header="Research"
                     tagline="Research articles published around the WARDuino project."
                     link="/articles/"/>
          </div>
        </div>
      </div>
    </div>
    -->

    <!-- details -->
    <div class="details">
      <div class="container">
        <div class="vp-doc grow">

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
                <p><a href="./guide/latch.html">-&gt; Automated testing</a></p>
                <p><a href="./guide/plugin.html">-&gt; Debugging in VS Code</a></p>
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
                <p><a href="./reference/primitives.html">-&gt; WARDuino primitives</a></p>
                <p><a href="./reference/debug-protocol.html">-&gt; Debug protocol</a></p>
                <p><a href="./reference/edward/index.html">-&gt; EDWARD debugger</a></p>
                <p><a href="./latch/index.html">-&gt; Latch reference</a></p>
              </article>
              <article class="list">
                <div class="heading">
                  <div class="icon">
                    <span class="material-symbols-rounded">school</span>
                  </div>
                  <div>
                    <h4>Examples & Tutorials</h4>
                  </div>
                </div>
                <p><a href="./guide/examples/analog.html">-&gt; Analog Read Serial</a></p>
                <p><a href="./guide/examples/blink.html">-&gt; Blinking LED</a></p>
                <p><a href="./guide/examples/button.html">-&gt; Button</a></p>
                <p><a href="./guide/examples/index.html">-&gt; More ...</a></p>
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
                <p><a style="font-size: 14px" href="./reference/development.html">-&gt; Development</a></p>
                <p><a href="./reference/platforms.html">-&gt; Supported platforms</a></p>
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
                <p><a href="https://github.com/TOPLLab/as-warduino-template">-&gt; AssemblyScript</a></p>
              </article>
              <div></div>
            </div>
          </div>

          <h2></h2>

          <h4 class="center">Research</h4>
          <p class="center">
            WARDuino and the related projects documented here, are being developed as part of active research projects.
            The principle investigators at Ghent University and the VUB, maintain this documentation website and the associated software.
            You can find out more about the research on the <i>published articles</i> page.
          </p>
          <p class="center"><a href="./articles/index.html">-&gt; Published articles</a></p>

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
  margin-top: 5px;
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
  margin:  0 auto;
}


@media (max-width: 640px) {
  max-width: 100%;
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
</style>