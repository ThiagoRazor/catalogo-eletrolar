<template>
    <section>
        <article>
            <div class="productArea">
                <div class="productInfo">
                    <div class="imgArea">
                        <picture>
                            <img :src="`http://localhost:1337${imgUrl}`"/>
                        </picture>
                    </div>
                    <div class="infoArea">
                        <h2>{{ name }}</h2>
                        <h3>R$ {{ price }}</h3>
                        <p>R$ {{ (price * 0.95).toFixed(2) }} à vista</p>
                        <div class="qtdArea">
                            <CartBtn />
                            <button class="cartBtn">Adicionar ao carrinho</button>
                        </div>
                    </div>    
                </div>
            </div>
        </article>
    </section>
</template>


<script>
import axios from 'axios';
import CartBtn from '../components/CartBtn.vue'

    export default{

        components:{
            CartBtn
        },

        data(){
            return {
                name: '',
                price: '',
                imgUrl: '',
                qtd: 1
            }
        },

        mounted(){
            this.productDetail();
        },
        methods:{
            productDetail(){

                axios
                .get(`http://localhost:1337/api/products?populate=*&pagination&filters[id][$eq]=${this.$route.params.id}`)
                .then((response) => {
                    const productInfo = response.data.data[0].attributes

                    this.name = productInfo.name;
                    this.price = productInfo.price.toFixed(2);
                    this.imgUrl = productInfo.img.data[0].attributes.url
                })
                
            },
            
        }
    }


</script>

<style lang="scss" >
    @import url(../assets/_product.scss);
</style>