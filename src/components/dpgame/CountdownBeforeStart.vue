<template>
  <div class="countdown-wrap">
    <div class="counter-wrap">
      <div class="full bg">
        <span>{{ counter }}</span>
      </div>
      <p> 准备开始 </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountdownBeforeStart',
  props:{
    counter: {
      default:3,
      type: Number
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.countdown-wrap{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
.full{
  height: 100%;
  width: 100%;
  border: 5px solid transparent;
  background-color: #fff;
  border-radius: 100%;
  line-height: 100%;
  opacity: .8;
}
.counter-wrap{
  position: absolute;
  background-color: gray;
  left: 50%;
  top: 50%;
  width: 28vh;
  height: 28vh;
  margin-left: -14vh;
  margin-top: -14vh;
  font-size: 22vh;
  text-align: center;
  border-radius: 100%;
  border: 3px solid #fff;
  padding: 2px;

}
.counter-wrap p{
  font-size: medium;
  padding: 1em;
}
.counter-wrap span{
  color: #F56C6C;
}
</style>
