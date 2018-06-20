<template>
  <div class="goods">
    <!-- 分類 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 專場 -->
        <li class="menu-item" :class="{'current' : currentIndex===0}" @click="selectMenu(0)">
          <p class="text">
            <img :src="container.tag_icon" alt="" v-if="container.tag_icon" class="icon">
            {{container.tag_name}}
          </p>
        </li>

        <li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{'current' : currentIndex===index+1}" @click="selectMenu(index+1)">
          <p class="text">
            <img :src="item.icon" alt="" v-if="item.icon" class="icon">
            {{item.name}}
          </p>
          <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
          <!-- 專場 -->
          <li class="container-list food-list-hook">
            <div v-for=" (item,n) in container.operation_source_list" :key="n">
              <img :src="item.pic_url" alt="">
            </div>
          </li>
          <!-- 具體分類 -->
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h3 class="title">{{item.name}}</h3>
          <!-- 具體商品列表 -->
          <ul>
            <li v-for="(food, index) in item.spus" :key="index" class="food-item">
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img class="product" :src="food.product_label_picture" alt="">
                <p class="price">
                  <span class="text">${{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></shopcart>
  </div>
</template>
<script>
// 導入
import BScroll from 'better-scroll'
import Shopcart from 'components/Shopcart/Shopcart'
import Cartcontrol from 'components/Cartcontrol/Cartcontrol'
export default {
  data() {
    return {
      container:{},
      goods:[],
      poiInfo: {},
      listHeight:[],
      scrollY:0,
      menuScroll:{},
      foodScroll:{},
    }
  },
  components: {
    Shopcart,
    BScroll,
    Cartcontrol,
  },
  methods:{
    head_bg(imgName){
      return "background-image: url(" + imgName + ");";
    },
    // 滾動初始化
    initScroll() {
      // ref屬性是可以綁定某個DOM 或組件
      this.menuScroll = new BScroll(this.$refs.menuScroll,{
        click:true
      });
      console.log('this.menuScroll', this.menuScroll);
      this.foodScroll = new BScroll(this.$refs.foodScroll,{
        probeType:3,
        click:true
      });

      // 添加滾動監聽事件
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    calculateHeight() {
      // 通過refs 獲取到對應元素
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      // 添加到數組區間
      //  0~216       1.
      // 217~1342     2.
      let height = 0 ;
      this.listHeight.push(height);
      for (let i=0; i<foodlist.length; i++  ) {
        let item = foodlist[i];
        // 累加
        height +=item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      // 根據下標 滾動到相對應的位子
      let el = foodlist[index];
      // 滾動到位置
      this.foodScroll.scrollToElement(el,300);
    },
    calculateCount(spus){
      let count = 0;
      spus.forEach((food) => {
        if (food.count> 0){
          count +=food.count;
        }
      });
      return count;
    }
  },
  created() {
  const that = this;
  this.$axios.get('/api/goods')
    .then(function(response) {
      const dataSourse = response.data;
      if (dataSourse.code == 0) {
          that.container = dataSourse.data.container_operation_source;
          that.goods = dataSourse.data.food_spu_tags;
          that.poiInfo = dataSourse.data.poi_info;
          // 調用滾動初始化
          // that.initScroll();
          // 開始時，DOM元素沒有渲染，高度是問題
          // 在獲取到數據後，並DOM已經被渲染，列表的高度是完成的
          // 使用 nextTick
          that.$nextTick( ()=> {
            that.initScroll();

            // 計算分類區間高度
            that.calculateHeight();
          });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  },
  computed: {
    currentIndex() { //根據右側滾動位子 確定對應的索引
      for (let i =0 ; i< this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];
        // 判斷是否在區間
        if (!height2 || (this.scrollY >= height1 && this.scrollY <height2)){
          return i;
        }
      }
      return 0 ;
    },
    selectFoods() {
      let foods = [] ;
      this.goods.forEach((good)=> {
        good.spus.forEach((food)=> {
          if (food.count>0) {
            foods.push(food);
          }
        })
      });
      return foods;
    },
  },
}
</script>
<style scoped>
  @import url('Goods.css');

</style>

