<template>
    <div class="paginationTotalArea">
        <li class="btnBox">
            <button @click="changePage(currentPage = 1)" :class="{'disabled': currentPage === 1}" class="btnPag" >Início</button>
            <button @click="changePage(currentPage - 1)" :class="{'disabled': currentPage === 1}" class="btnPag" >Anterior</button>
            <button @click="changePage(currentPage + 1)" :class="{'disabled': currentPage === pageCount}" class="btnPag" >Próximo</button>
            <button @click="changePage(currentPage = pageCount)" :class="{'disabled': currentPage === pageCount}" class="btnPag" >Fim</button>
        </li>
        
        
    </div>
</template>

<script>
    export default {

        props: {
            currentPage: Number,
            pageCount: Number
        },

        methods: {
            changePage(newPage){
                if(newPage >= 1 && newPage <= this.pageCount){
                    this.$emit('page-change', newPage);
                }
            }
        }
    }

</script>

<style scoped>
    .paginationTotalArea{
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:30px;
        margin-bottom: 30px;
    }

    .btnBox{
        display: flex;
        gap:2px;
    }

    .btnPag{
        background-color: #00043c75;
        width:60px;
        height: 40px;
        border: 1px solid gray;
        border-radius: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        cursor: pointer;
    }

    .disabled{
        display: none;
    }

    @media (min-width: 300px) and (max-width: 359px) {
    .btnPag{
        width: 30px;
        height: 30px;
        font-size: 10px;
    }
}
</style>