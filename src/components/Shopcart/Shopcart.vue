<template>
  <div class="shopcart" :class="{'highligh': totalCount > 0}">
    <div class="content-left">
      <div class="logo-wrapper" :class="{'highligh': totalCount > 0}" @click="toggleList">
        <span class="icon-shopping_cart logo" :class="{'highligh': totalCount > 0}"></span>
        <i class="num" v-show="totalCount">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper">
        <p class="total-price" v-show="totalPrice">${{totalPrice}}</p>
        <p class="tip" :class="{'highligh': totalCount > 0}">另需{{poiInfo.shipping}}</p>
      </div>
    </div>
    <div class="content-right" :class="{'highligh': totalCount > 0}">
      {{payStr}}
    </div>
    <div class="shopcart-list" v-show="listShow" :class="{ 'show' : listShow}">
      <div class="list-top" v-if="poiInfo.discounts2">

        {{poiInfo.discounts2[0].info}}
      </div>
      <div class="list-header">
        <h3 class="title">1號口袋</h3>
        <div class="empty">
          <img src="./ash_bin.png" alt="">
          <span>清空購物車</span>
        </div>
      </div>
      <div class="list-content">
        <ul>
          <li class="food" v-for="(food, index) in selectFoods" :key="index">
            <div class="desc-wrapper">
              <div class="desc-left">
                <p class="name">{{food.name}}</p>
                <p class="unit" v-show="!food.description">{{food.unit}}</p>
                <p class="description"   v-show="food.description">{{food.description}}</p>
              </div>
              <div class="desc-right">
                <span class="price"> ${{food.min_price}}</span>
              </div>
            </div>
            <div class="cartcontrol-wrapper">
              <Cartcontrol :food="food"></Cartcontrol>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-bottom">
      </div>
    </div>
  </div>
</template>
<script>
  import  Cartcontrol from 'components/Cartcontrol/Cartcontrol'

  export default {
    data () {
      return {
        fold:true,
      }

    },
    props:['MinPriceTip', 'shipping'],
    props:{
      shipping:{
        type: String,
        default:'',
      },
      MinPriceTip:{
        type: String,
        default:'',
      },
      poiInfo:{},
      selectFoods:{
        type: Array,
        default(){
          return[
            // {
            //   min_price: 10,
            //   count: 2
            // },
            // {
            //   min_price: 7,
            //   count: 50
            // }
          ];
        }
      }
    },
    methods: {
      toggleList() {
        if(!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      }
    },
    computed:{
      totalCount() {
        let num = 0;
        this.selectFoods.forEach( (food) => {
          num += food.count;
        });
        return num;
      },
      totalPrice() {
        let total = 0 ;
        this.selectFoods.forEach( (food) => {
          total += food.min_price * food.count;
        });
        return total;
      },
      payStr() {
        if (this.totalCount>0) {
          return '去結算'
        } else {
          return this.poiInfo.MinPriceTip
        }
      },
      listShow(){
        if (!this.totalCount) {
          this.fold = true;
          return false ;
        }
        let show = !this.fold;
        return show;
      }
    },
    components:{
      Cartcontrol
    }
  }
</script>
<style>
  @import url("Shopcart.css");
</style>

