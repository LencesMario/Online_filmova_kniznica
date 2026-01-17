<template>
  <div class="load-more">
    <button @click="handleClick">
      <slot>Zobraziť ďalšie</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "LoadMoreButton",
  props: {
    onClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.onClick()
    }
  }
}
</script>

<style>
.load-more {
  text-align: center;
  margin-top: 20px;
}

.load-more button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #333;
  cursor: pointer;
  background-color: #f5f5f5;
  transition: background-color 0.2s;
}

.load-more button:hover {
  background-color: #e0e0e0;
}
</style>
