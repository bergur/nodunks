<template>
  <div class="container is-centered">
    <img src="nodunks_logo.png" height="400" width="400" />
    
    <Welcome
      v-if="submitted === false"
    >
    </Welcome>

    <Countries
      v-if="submitted === false"
      :list="countries"
      :default="answers.country"
      :loading="loading"
      @change="updateCountry"
    ></Countries>
    
    <Submit
      :submitted="submitted"
      :error="error"
      @click="submit"
    >
    </Submit>

    <Graph
      v-if="submitted"
      :data="results"
    >
    </Graph>
  </div>
</template>

<script>
import agent from 'superagent'
import Welcome from './Welcome'
import Countries from './Countries'
import Twitter from './Twitter'
import Submit from './Submit'
import Graph from './Graph'

export default {
  components: {
    Welcome,
    Countries,    
    Twitter,
    Submit,
    Graph
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
      submitted: undefined,
      error: false,
      results: []
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
            return this.getResults()
          }
        })
        .catch(() => {
          this.error = true
          this.submitted = undefined
        })
    },
    getResults() {
      return agent
        .get('/listenerspercountry')
        .then(res => {        
          this.results = res.body
        })
    }
  },  
  created() {
    this.loading = true

    agent
      .get('/submitted')
      .then(res => {        
        this.submitted = res.body.submitted

        if (this.submitted) {
          this.getResults()
        }
      })
    
    agent
      .get('/ip')
      .then(res => {
        this.answers.ip = res.body.ip
        this.answers.country = res.body.country
        this.loading = false
      })
      .catch(() => {
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
