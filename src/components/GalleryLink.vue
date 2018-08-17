<template>
  <span :class="{'clickable': asLink}" @click="$emit('click')">{{ text }}</span>
</template>

<script>
export default {
  props: {
    text: String,
    asLink: Boolean
  }
};
</script>

<style lang="scss" scoped>
span.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: #00897b;
}

span:not(.clickable) {
  color: #90a4ae;
  text-decoration: line-through;
  pointer-events: none;
}
</style>

