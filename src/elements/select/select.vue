<template>
  <div>
    <select class='select' v-model='selected' @input='event => { $emit("input", event.target.value) }'>
      <option v-for='option in options' :key='option.value' :value='option.value'>
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style></style>

<script>
  export default {
    props: ['options', 'value'],
    data() {
      return {
        selected: null,
      }
    },
    mounted() {
      this.selected = this.value;
    },
    watch: {
      value: function(newValue) {
        this.selected = newValue;
      }
    }
  }
</script>