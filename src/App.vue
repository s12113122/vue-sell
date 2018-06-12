<template>
  <div id="app">
    <Myheader :poiInfo="poiInfo"></Myheader>
    <MyNav></MyNav>
    <router-view></router-view>
  </div>
</template>

<script>
import Myheader from './components/Header/Header'
import MyNav from './components/Nav/Nav'

export default {
  name: 'App',
  components: {
    Myheader,
    MyNav,
  },
  data() {
    return {
      poiInfo: {}
    }
  },
  created() {
    const that = this;
    this.$axios.get('/api/goods')
    .then(function(response) {
      // console.log(response);
      const dataSourse = response.data;
      if (dataSourse.code == 0) {
          that.poiInfo = dataSourse.data.poi_info;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  }
}
</script>

<style>

</style>
