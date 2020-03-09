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
  props: ['data', 'success'],
  data() {
    return {
      showButton: true,
      showThanks: false,
      showError: false,      
    }
  },
  watch: {
    success(val) {
      this.showButton = val === undefined      
      this.showThanks = val === true
      this.showError = val === false
    }
  }
}
</script>