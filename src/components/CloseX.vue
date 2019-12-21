<template>
  <div class="closebtn-box">
     <span class="closebtn" @touchstart="handleClicked">X</span>
  </div>

</template>

<script>
export default {
  name: 'sample',
  data () {
    return {

    }
  },
  methods:{
    handleClicked(){
      console.debug("CloseX clicked");
      this.$emit('click')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.closebtn-box{
  position:absolute;bottom:-1.5rem;left:50%;margin-left:-.75rem;width:1.5rem;height:1.5rem;background-size:100%;background-repeat:no-repeat;
  background-color: #fff;  border-radius: 100%;
}
/* 关闭按钮 */
.closebtn{
  color: transparent;
  display: inline-block;
  width:  1.5rem;
  height: 1.5rem;
  background-color: #fff;
  border-radius: 100%;
  border: 1px solid rgba(255, 255, 255, .3);
}
.closebtn::before, .closebtn::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 1rem;
    top: 50%;
    left: 0.25rem;
    margin-top: -1px;
    background: #303133;
}
.closebtn::before {
    transform: rotate(45deg);
}
.closebtn::after {
    transform: rotate(-45deg);
}

</style>
