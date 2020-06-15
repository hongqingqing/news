<template>
<div class="input_box">
  <input :type="type" class="news-input" :class="[status]" :placeholder="placeholder" :value="value" @input="handleInput">
  <span class="tips" v-show="showErr">{{errMsg}}</span>
</div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },
  //  接收type和placeholder
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  methods: {
    handleInput (e) {
      const { value } = e.target
      // console.log(value)
      this.$emit('input', value)
      if (!this.rules) return
      if (this.rules.test(value)) {
        // this.status = true
        this.status = 'success'
      } else {
        this.status = 'error'
      }
    }
  },
  computed: {
    showErr () {
      return this.status === 'error' && this.errMsg
    }
  }
}
</script>

<style lang="scss" scoped>
.input_box{
  padding-bottom: 20px;
  position: relative;
  .news-input{
    width: 100%;
    height: 38px;
    border-bottom: 1px solid #666;
    font-size: 18px;
    background-color: transparent;
    &.error{
      border-color: red;
    }
    &.success{
      border-color:green;
    }
  }
  .tips{
    color:red;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}

</style>
