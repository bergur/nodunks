<template>
  <div class="container is-centered">
    <img src="nodunks_logo.png" height="400" width="400" />
    
    <Welcome></Welcome>

    <Countries
      v-if="submitted === undefined"
      :list="countries"
      :default="answers.country"
      :loading="loading"
      @change="updateCountry"
    ></Countries>

    <Quiz
      v-if="submitted === undefined"
      @change="updateQuiz"
    >
    </Quiz>

    <Submit :success="submitted" @click="submit"></Submit>
  </div>
</template>

<script>
import agent from 'superagent'
import Welcome from './Welcome'
import Countries from './Countries'
import Quiz from './Quiz'
import Twitter from './Twitter'
import Submit from './Submit'

export default {
  components: {
    Welcome,
    Countries,
    Quiz,
    Twitter,
    Submit
  },
  data() {
    return {
      countries: [],
      answers: {
        country: undefined,
        ip: undefined,
        quiz: [],
      },
      loading: false,
      submitted: undefined
    }
  },
  methods: {
    updateCountry(val) {      
      this.answers.country = val
    },
    updateQuiz(val) {      
      this.answers.quiz = val
    },
    submit() {
      return agent
        .post('/submit')
        .send(this.answers)
        .then(res => {
          if (res.body && res.body.id) {
            this.submitted = true
          }
        })
        .catch(() => {
          this.submitted = false
        })
    }
  },
  created() {
    this.loading = true
    agent
      .get('/ip')
      .then(res => {
        this.answers.ip = res.body.ip
        this.answers.country = res.body.country
        this.loading = false
      })
    
    agent
      .get('/countries')
      .then(res => {        
        this.countries = res.body
      })
  }
}
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
html, body {
  text-align: center;
  margin: 0 auto;
  padding: 0;
  background: #5301A1;
  color: #FFFFFF;
}

.title {
  color: #FFFFFF;
}

</style>