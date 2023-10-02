<template >
    <section >

        <div class="productsTotalArea">
            <div class="productsContainer" >
                <div v-for="product in results.data" :key="product.id" class="productArea" >
                    <div class="totalBasicInfo"  @click="openProductDetails(product.id)">
                        <picture>
                            <img class="productImg" :src="getImg(product.attributes.img.data[0].attributes.url)" :alt="product.attributes.name">
                        </picture>
                        <div class="textArea">
                            <h2>{{product.attributes.name}}</h2>
                        </div>
                        <div class="textArea">
                            <h3 v-if="product.attributes.price.toFixed(2) > 0">R$ {{product.attributes.price.toFixed(2)}}</h3>
                            <p v-if="product.attributes.price.toFixed(2) > 0">R$ {{(product.attributes.price * 0.95).toFixed(2) }} à vista</p>
                            <p v-else style="color:red;">Indisponível</p>
                        </div>
                    </div>
                    <div class="cartTotalArea">
                        <CartBtn style="width:100px; "/>
                        <div class="toCartBtn"><img src="../assets/cart.png"/></div>
                    </div>
                </div>
            </div>
        </div>

        <Pagination
        :current-page="currentPage"
        :page-count="pageCount"
        @page-change="onPageChange"
        />

    </section>
</template>

<script>
    import axios from 'axios';
    import Pagination from '../components/Pagination.vue'
    import CartBtn from '../components/CartBtn.vue';
    import { useFilterStore } from '../stores/store';

    export default{

        components: {
            Pagination,
            CartBtn
        },
        props:{
            categoryQuery: String
        },

        setup(){

            const filterStore = useFilterStore();
            filterStore.initializeFromUrl();
            return { filterStore }
        },
        data(){


            return {
                results: [],
                filteredProducts: [],
                currentPage: 1,
                pageCount: 1,
            }
        },
        mounted(){
            this.productsList();
        },
        methods: {

                productsList(page = 1){
                    axios
                    .get(`http://localhost:1337/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=30&filters[name][$contains]=${this.filterStore.searchQuery}&filters[category][$contains]=${this.filterStore.categoryQuery}`)
                        .then( response => {
                            this.results = response.data;
                            this.pageCount = response.data.meta.pagination.pageCount;
                        })
                },
            onPageChange(newPage){
                this.currentPage = newPage;

                this.productsList(newPage);

                window.scrollTo({ 
                        top: 0,
                    });
            },
            getImg(url){
                return `http://localhost:1337${url}`;
            },
            openProductDetails(id){
                this.$router.push({ name: 'Product', params: {id: id } })
            },

        },
        watch: {
            filterStore: {
                deep: true,
                handler(newSearchStore) {
                    this.currentPage = 1;
                    this.productsList(1);
                }
            }
        }
    }   

</script>

<style lang="scss" scoped>
    @import url(../assets/_products.scss);
</style>