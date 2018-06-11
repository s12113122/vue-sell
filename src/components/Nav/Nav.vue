<template>
  <div class="nav">
    <router-link class="nav-item goods" to="/goods">
      點菜
      <i class="line"></i>
    </router-link>
    <router-link class="nav-item ratings" to="/ratings">
      評價
      <i class="line"></i>
    </router-link>
    <router-link class="nav-item seller" to="/seller">
      商家
      <i class="line"></i>
    </router-link>    
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
  .nav{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border:  1px solid #e4e4e4;
  }
  .nav .nav-item {
    flex:1;
    text-align: center;
    font-size: 13px;
    text-decoration: none;
    color: #666666;
    position: relative;
  }

  .nav .active{
    color: #FFBB22;
  }
  .nav .active .line {
    width: 20px;
    height: 2px;
    display: inline-block;
    background-color: #FFBB22;
    position: absolute;
    left: 50%;
    bottom:0;
    margin-left: -10px;
  }
</style>
