<template>
  <div class="section">
    <button
      v-if="showButton"
      class="button is-large is-warning"
      @click="$emit('click', true)"
    >
      Submit
    </button>

    <h3
      v-if="showThanks"
      class="title is-3"
    >
      Thank you for your participation!
    </h3>

    <h3
      v-if="showError"
      class="title is-3"
    >
      Oops! Something went wrong. Please try again later.
    </h3>

  </div>
</template>

<script>
export default {
  props: [
    'data',
    'submitted',
    'error'
  ],
  data() {
    return {
      showButton: false,
      showThanks: false,
      showError: false,      
    }
  },
  watch: {
    submitted (val) {
      console.log('submitted', val)
      this.showThanks = val === true
      this.showButton = val === false      
    },
    error (val) {
      console.log('error', val)
      this.showThanks = val === false
      this.showButton = val === false
      this.showError = val === true
    }
  }
}
</script>