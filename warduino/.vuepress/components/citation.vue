<template>
  <div>
    <b>Cite this work</b>
    <p class="light">If you use this work, please cite it using the metadata below. <a :href="url">Online article</a>
    </p>
    
    <ul>
        <!--<li><button class="tab"><span>APA</span></button></li>-->
        <li class="active"><button class="tab"><span>BibTex</span></button></li>
    </ul>
    <div style="clear: both;"></div>
    <form class="copy-text">
        <input type="text" class="text" :value="metadata" readonly/>
        <button type="button" class="copy" v-on:click="copy"><span>
        <svg aria-hidden="true" height="100%" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>
        </span></button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    url: {
        type: String,
        required: true
    },
    metadata: {
        type: String,
        required: true
    }
  },

  methods: {
    copy() {
        navigator.clipboard.writeText(this.metadata).then(() => {
          console.log('Content copied to clipboard');
          /* Resolved - text copied to clipboard successfully */
        },() => {
          console.error('Failed to copy');
          /* Rejected - text failed to copy to the clipboard */
        });
    }
  },
}
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

<style scoped>
ul {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}

li {
    float: Left;
    margin-right: 3px;
    padding-bottom: 5px;
}

path {
    fill: #4c4f69;
}

.citation {
    border-radius: 6px;
    border: 0.08rem solid #e6e9ef;
    
    padding: 1.25rem 1.5rem;
    margin: 0.85rem 1.60rem;

    overflow: auto;

    box-shadow: 0 8px 24px rgba(140,149,159,0.2);
}

.light {
    font-size: 0.75em;
    color: #9ca0b0;
}

.copy-text {
    margin: 0.85rem 0;
}

.input-group {
    display: table;
}

form {
    display:flex;
    flex-direction:row;
  
    font-size: 0.65em;
    color: #4c4f69;

    background: #eff1f5;

    border: none;
    border-radius: 6px;
}

form:focus-within { 
    outline: none;
}



button.tab {
    border: none;

    background: none;
    padding: 0.3em 0.5em;

    color: inherit;
    font-weight: bold;
}

button.tab:hover {
    border-radius: 6px;

    background: #e6e9ef;
}

button.tab:hover {
    cursor: pointer;
}

li.active {
    border-bottom: 2px solid #8839ef;
    margin-bottom: -2px;
}

button.copy {
  /* Just a little styling to make it pretty */
    border: 0.08rem solid #e6e9ef;
    border-collapse: collapse;

    padding: 0 10px;

    color: inherit;

    background: #eff1f5;

    border-top-right-radius: 6px;
    border-top-left-radius: 0;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 0;
}

button.copy:active {
    background: #e6e9ef;
}

input:focus {
  outline: none;
}

input {
    background: #eff1f5;

    color: inherit;

    flex-grow:2;
    min-height: 2em;

    padding: 0 1.5rem;

    border: 0.08rem solid #e6e9ef;
    border-top-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 6px;
    outline: none !important;

}
</style>
