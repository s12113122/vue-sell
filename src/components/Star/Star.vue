<template>
  <div class="star">
    <h1>123</h1>
    <span v-for=" iteamClass in iteamClasses" :class="iteamClass" class="star-item">

    </span>
  </div>

</template>

<script>
  // 星星長度
  const LENGTH = 5;
  // 星星對應class
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
export default {
  props:{
    score: {
      type: Number,
    }
  },
  computed:{
    iteamClasses(){
      let result = [];
      // 4.7 => 4.5 3.9=>3.5
      // 對分數進行處理
      let score = Math.floor(this.score*2)/2;    //math.floor取整數 ex: 4.7*2=9.4 取整數後 9 在除2 4.5 === (4.7 =>4.5)
      // 小數 控制半形
      let hasDecimal = score % 1 !==0;
      // 整數 全星
      let integer = Math.floor(this.score);
      // 全星
      for (let i=0;  i < integer; i++ ){
        result.push(CLS_ON);
      }
      // 半星
      if (hasDecimal){
        result.push(CLS_HALF);
      }
      // 補齊星數
      while ( result.length < LENGTH){
        result.push(CLS_OFF);
      }
      return result;
    } 
  }
}
</script>
<style>
  .star{
    font-size: 0;
  }
  .star .star-item{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-repeat: no-repeat;
    background-size: 10px 10px;
  }
  .star .star-item:last-child{
    margin-right: 0 ;
  }

  /* 三種類型 */
  .star .on{
    background-image: url(./star24_on@2x.png);
  }
  .star .half{
    background-image: url(./star24_half@2x.png);
  }
  .star .off{
    background-image: url(./star24_off@2x.png);
  }


</style>
