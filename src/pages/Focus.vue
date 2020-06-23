<template>
  <div class="focus">
    <news-header>我的关注</news-header>
    <div class="list">
      <cell-focus></cell-focus>
    </div>
  </div>
</template>

<script>
import CellFocus from '../components/CellFocus'
export default {
  components: {
    'cell-focus': CellFocus
  }

}
</script>

<style lang='scss' scoped>

</style>
