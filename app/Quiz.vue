<template>
  <div class="section">    
    <h3 class="title is-3">How well do you know us? No cheating!</h3>    
    <div
      v-for="q in questions"
      :key="q.id"
      class="field is-horizontal"
      style="align-items:center;"
    >         
      <div class="field-label">
        <label class="label">{{ q.question }}</label>                          
      </div>

      <div class="field-body" style="flex-grow:1;">
        <div class="select">
          <select @change="e => change(q.id, e.target.value)">
            <option></option>
            <option v-for="o in q.options" :key="o">{{ o }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>      
</template>

<script>
export default {
  data() {
    return {
      answers: [],
      questions: [
        {
          id: 1,
          question: 'Where is Leigh Ellis from?',
          options: [
            'Canada',
            'Australia',
            'USA',
          ]
        },
        {
          id: 2,
          question: "What is Trey Kerby's favorite team?",
          options: [
            'Toronto Raptors',
            'Atlanta Hawks',
            'Chicago Bulls',
          ]
        },
        {
          id: 3,
          question: "Tas Melas would bond the most with?",
          options: [            
            'LeBron James',
            'Kyle Lowry',
            'Giannis Antetokounmpo',
          ]
        },       
        {
          id: 4,
          question: "What is JE Skeets wife's name?",
          options: [
            'Jennifer',
            'Nora',
            'Olivia',
          ]
        },        
      ]
    }
  },
  methods: {
    change(id, val) {
      this.answers[id-1] = val
      this.$emit('change', this.answers)
    }
  }
}
</script>
<style scoped>
label.label {
  color: #FFFFFF;
}
</style>