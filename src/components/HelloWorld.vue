<template>
  <div class="layout_main">
    <p class="head">trade-robot</p>
    <div class="symbol">
      <p>选择交易对:</p>
       <el-select v-model="symbolValue" placeholder="请选择" @change="getSymbol">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- <div class="side">
      <el-radio-group v-model="sideRadio" @input="getSideValue">
      <el-radio  label="buy">买</el-radio>
      <el-radio  label="sell">卖</el-radio>
      </el-radio-group>
    </div> -->
    <!-- <div class="type_price">
    <div class="orderType">
      <el-radio-group v-model="typeRadio" @input="getTypeValue">
      <el-radio label="market">市价</el-radio>
      <el-radio label="limit">限价</el-radio>
      </el-radio-group>
    </div>
    <div class="price" v-if="isLimit"><el-input v-model="price" placeholder="请输入限价"></el-input></div>
    </div> -->
    <!-- <div class="amount">
      <p>购买数量:<p/>
      <div class="input_amount"><el-input v-model="amount" placeholder="请输入购买数量"></el-input></div>
    </div> -->
     <div class="amount">
      <p>输入杠杠倍数:<p/>
      <div class="input_amount"><el-input v-model="level" placeholder="请输入杠杆倍数"></el-input></div>
    </div>
    <div class="tdmode">
      <el-radio-group v-model="tdModeRadio" @input="getTdModeValue">
       <el-radio  label="isolated">逐仓</el-radio>
      <el-radio   label="cross">全仓</el-radio>
      </el-radio-group>
    </div>
    <!-- <div class="tp_sl">
      <p class="set_tl">止盈/止损</p>
        <el-switch
        v-model="tpSlValue"
        @change="setTpSl"
        active-color="#13ce66"
        inactive-color="#707070">
        </el-switch>
      <div class="input_tp" v-if="isTPSl"><el-input v-model="tpPrice" placeholder="止盈价格"></el-input></div>
      <div class="input_sl" v-if="isTPSl"><el-input v-model="slPrice" placeholder="止损价格"></el-input></div>
    </div> -->
    <div class="message_button">
      <el-button type="warning" plain @click="generateAlertMessage">生成Alert Mesage</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'BTC-USDT-SWAP',
          label: 'BTC-USDT-SWAP'
        }, {
          value: 'ETH-USDT-SWAP',
          label: 'ETH-USDT-SWAP'
        }],
        tpSlValue:false,
        isLimit:false,
        isTPSl:false,
        symbolValue: '',
        tdModeRadio:"",
        sideRadio:"",
        typeRadio:"",
        radio:1,
        price:"",
        amount:"",
        level:"",
        tpPrice:"",
        slPrice:"",
        alertMessage:""
      }
    },
    methods:{
      // 获取选中的交易对
     getSymbol(value){
       console.log(value)
     },
     //选中的是买还是卖
     getSideValue(value){
       console.log(value)
     },
     //选中的是限价还是市价
     getTypeValue(value){
       console.log(value)
       if(value == "limit"){
         this.isLimit = true
       }else{
         this.isLimit = false
       }
     },
     //选中的是逐仓还是全仓
     getTdModeValue(value){
       console.log(value)
     },
     //设置止盈止损
     setTpSl(value){
        console.log(value)
        if(value){
          this.isTPSl = true
        }else{
          this.isTPSl = false
        }
     },
     onCommentInputChange(){
       this.alertMessage = document.getElementById("commentContent").value;
     },
     generateAlertMessage(){
       console.log("点击了me")
       var message={
            "apiSec":"5BFasdasdtNg7hwkgCzYQMJSDHDSHD2qOzmtldJasdc",
            "symbol":"ADA-USDT-SWAP",
            "amount":"{{strategy.market_position_size}}",
            "type":"market",
            "side":"{{strategy.order.action}}",
            "price":"",
            "tdMode":"isolated",
            "level":"1",
            "enable_stop_loss":false,
            "enable_stop_gain":false,
            "slTriggerPx":"",
            "tpTriggerPx":""
        }
        console.log(this.symbolValue)
        //交易对判断
        if(this.symbolValue !=null && this.symbolValue != ''){
          message.symbol = this.symbolValue
        }else{
          this.$message.error('请选择交易对');
          return
        }
        //买卖方向判断
        // if(this.sideRadio != null && this.sideRadio != ""){
        //   message.side = this.sideRadio
        // }else{
        //   this.$message.error('请选择交易方向:买or卖');
        //   return
        // }
        //市场价还是限价判断
        // if(this.typeRadio !=null &&this.typeRadio != ""){
        //   if(this.typeRadio=="limit"){
        //     message.type = "limit"
        //   }else{
        //     message.type = "market"
        //   }
        // }else{
        //   this.$message.error('请选择交易类型:市价or限价');
        //   return
        // }
        //如果是限价，对价格进行判断
        // if(this.typeRadio == "limit"){
        //   if(this.price !=null&&this.price !=""){
        //     message.price = this.price
        //   }else{
        //   this.$message.error('请输入你要交易的价格');
        //   return
        //   }
        // }
        //对购买数量进行判断
        // if(this.amount !=null&&this.amount!=""){
        //   message.amount = this.amount
        // }else{
        //   this.$message.error('请输入你要购买的数量');
        //   return
        // }
        //对杠杆倍数进行判断
        if(this.level !=null&this.level!=""){
          message.level = this.level
        }else{
          this.$message.error('请输入杠杆倍数');
          return
        }
        //对逐仓和全仓进行判断
        if(this.tdModeRadio !=null&this.tdModeRadio!=""){
          message.tdMode = this.tdModeRadio
        }else{
          this.$message.error('请选择逐仓or全仓');
          return
        }
        //是否设置了止盈止损
        // if(this.tpSlValue){
        //   message.enable_stop_loss = true
        //   message.enable_stop_gain = true
        //   if(this.tpPrice !=null&this.tpPrice!=""&this.slPrice!=null&this.slPrice!=""){
        //     message.tpTriggerPx = this.tpPrice
        //     message.slTriggerPx = this.slPrice
        //   }else{
        //     this.$message.error('请输入止盈止损的价格');
        //     return
        //   }
        // }else{
        //   message.enable_stop_loss = false
        //   message.enable_stop_gain = false
        // }
        //弹框
          this.$confirm(message, 'Alert Message', {
          confirmButtonText: '复制',
          cancelButtonText: '取消',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '复制成功!'
          });
          //复制生成的message
          this.copy(JSON.stringify(message))
          console.log("复制内容")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });

     },
      copy (text) {   
        const el = document.createElement('input')
        el.setAttribute('value', text)
        // 将input元素插入页面
        document.body.appendChild(el)
        // 选中input元素的文本
        el.select()
        // 复制内容到剪贴板
        document.execCommand('copy')
        // 删除input元素
        document.body.removeChild(el)
        },
      prettyFormat(code) {
      try {
        for (const key in code) {
          if (typeof code[key] === 'function') {
            let str = code[key];
            str = str.toString();
            code[key] = str.replace(/\n/g, '<br/>');
          }
        }
        // 设置缩进为2个空格
        let str = JSON.stringify(code, null, 2);
        str = str
          .replace(/&/g, '&')
          .replace(/</g, '<')
          .replace(/>/g, '>');
        // str = str.replace(/\n/g, '/r')
        return str;
      } catch (e) {
        console.error('异常信息:' + e);
        return '';
      }
    }

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
  margin-top: 10px;
  font-weight:bold;
  font-size: 26px;
  
}
.side{
  display: flex;
  justify-content: center;
  margin-top: 15px;
  align-items: center;
}
.symbol{
  display: flex;
  justify-content: center;
  margin-top: 15px;
  align-items: center;
}
.type_price{
   display: flex;
   justify-content: center;
   margin-top: 10px;
   align-items: center;
}
.price{
  margin-left: 10px;
  width: 110px;
}
.amount{
  display: flex;
  justify-content: center;
  margin-top: 15px;
  align-items: center;
}
.tdmode{
  margin-top: 10px;
}
.tp_sl{
  display: flex;
  justify-content: center;
  margin-top: 15px;
  align-items: center;
}
.input_tp{
  width: 90px;
  margin-left: 5px;
}
.input_sl{
  width: 90px;
  margin-left: 5px;
}
.message_button{
  margin-top: 25px;
}
.set_tl{
  margin-right: 5px;
}
.layout_main{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #B3C0D1;
  width: 800px;
  height: 640px;
}
</style>
