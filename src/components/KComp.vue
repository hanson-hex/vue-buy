<template>
    <button @click="handleClick">
        <slot></slot>
        <span>{{ name }}</span>
    </button>
</template>

<script>
export default {
  name: 'k-comp',
  inject: ['name'],
  methods: {
    handleClick (e) {
      this.$emit('bindclick', e)
    }
  }
}
</script>

<style scoped>

</style>