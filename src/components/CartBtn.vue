<template>
    <div class="selectorsArea">
        <button @click="changeQtd('decrease')" class="selectorBtn">-</button>
            <input type="text" v-model="qtd" min="1" @input="updateQtd"/>
        <button @click="changeQtd('increase')" class="selectorBtn">+</button>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                qtd: 1,
            }
        },

        methods:{
            changeQtd(operation){
                if(operation === 'increase'){
                    return this.qtd += 1;
                } else if(operation === 'decrease' && this.qtd > 1){
                    return this.qtd -= 1;
                } 
            }   
        }
    }

</script>

<style lang="scss">

        .selectorsArea{

            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            border: 1px solid #c5c5c5;
            border-radius: 10px;
            
                    input{
                        border: 0;
                        width: 100%;
                        text-align: center;
                        outline: none;
                        font-size: 16px;
                    }


                    .selectorBtn{
                        border: 0;
                        background-color: #fff;
                        font-size: 24px;
                        font-weight: normal;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    
                    }
            
        }

            .cartBtn{
                border: 0;
                font-size: medium;
                background-color: #1e64be;
                color: #fff;
                font-weight: normal;
                width: 200px;
                height: 50px;
                border-radius: 10px;
                cursor: pointer;
            }
            .cartBtn:hover{
                background-color: #3478cf;
            }
            

</style>