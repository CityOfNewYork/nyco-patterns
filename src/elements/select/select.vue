<template>
  <div>
    <select class="select" v-model="selected">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style>
  /* Styles should be written in SASS */
  /* Use BEMIT syntax for attribute. Try not to nest style declarations */
  /* .o-chart {} Objects are prefixed with o- */
  /* .o-chart__title {} A nested child of .o-chart is delimited by __ */
  /* .o-chart--horizontal {} Different .o-chart types are delimited by -- */
  /* if you need to nest a selector, it should be very very specific */
</style>

<script>
  export default {
    props: ['options'],
    data() {
      return {
        selected: 'all'
      }
    }
  }
</script>