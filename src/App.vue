<template >
    <header>
        <div class="totalNavArea">
          <div class="navArea1">
            <div class="logoArea">
              <router-link @click="onCategoryChange('')" :to="{ name: 'Products'}" href="#">
                <img src="./assets/img/eletrolarlogo.png" alt="Logo Eletrolar"/>
              </router-link>
            </div>
            <div class="inputArea">
              <input ref="searchInput" type="search" @keydown.enter="onSearchItem" placeholder="Buscar Produtos...">
              <button class="enterBtn" @click="onSearchItem">Enter</button>
            </div>
            <!--<div></div>-->
          </div>
          <div class="navArea2">
            <nav>
                <ul>
                  <li>
                    <a class="dropdown" @click="toggleDropDown('produtos')">Produtos</a>  
                  </li>
                  <li >
                    <a class="dropdown" @click="toggleDropDown('controles')">Controles</a> 
                  </li>
                </ul>
            </nav>
          </div>
        </div>
  </header>
  <main>
      <div class="categoriesTotalArea">
          <ul class="categoriesArea" v-if="dropdownOpen === 'produtos'">
                        <li @click="onCategoryChange('')">Todos</li>
                        <li @click="onCategoryChange('carregadores')">Carregadores</li>
                        <li @click="onCategoryChange('cabos')">Cabos</li>
                        <li @click="onCategoryChange('fones')">Fones</li>
                        <li @click="onCategoryChange('midias')">Midias</li>
                        <li @click="onCategoryChange('gamer')">Gamer</li>
                        <li @click="onCategoryChange('informatica')">Informatica</li>
                        <li @click="onCategoryChange('adaptadores')">Adaptadores</li>
                        <li @click="onCategoryChange('antenas')">Antenas</li>
                        <li @click="onCategoryChange('fontes')">Fontes</li>
                        <li @click="onCategoryChange('eletrica')">Eletrica</li>
                        <li @click="onCategoryChange('iluminacao')">Iluminacao</li>
                        <li @click="onCategoryChange('baterias')">Baterias</li>
                        <li @click="onCategoryChange('ferramentas')">Ferramentas</li>
                        <li @click="onCategoryChange('suportes')">Suportes</li>
                        <li @click="onCategoryChange('variedades')">Variedades</li>
                        <li @click="onCategoryChange('veicular')">Veicular</li>
                        <li @click="onCategoryChange('radios')">Radios</li>
                        <li @click="onCategoryChange('som')">Som</li>
                        <li @click="onCategoryChange('garrafas')">Garrafas</li>
                        <li @click="onCategoryChange('eletronicos')">Eletronicos</li>
                        <li @click="onCategoryChange('brinquedos')">Brinquedos</li>
          </ul>
          <ul class="categoriesArea" v-if="dropdownOpen === 'controles'">
                        <li>Categoria A</li>
                        <li>Categoria B</li>
          </ul>
      </div>
      <router-view 
      :category-query="categoryQuery"
      ></router-view>
  </main>
  <footer>
    <FooterArea/>
  </footer>
</template>

<script >
  import Products from './views/Products.vue'
  import FooterArea from './components/FooterArea.vue'
  import { useFilterStore } from './stores/store';
  
  export default{
    components:{
      Products,
      FooterArea
    },

    data(){
      return{
        searchQuery: '',
        categoryQuery: '',
        dropdownOpen: null
      }
    },
    methods:{
      toggleDropDown(category){
        if(this.dropdownOpen === category){
          this.dropdownOpen = null;
        } else {
          this.dropdownOpen = category;
        }
      },
      async onCategoryChange(newCategory){
        
        
        this.categoryQuery = newCategory;



        useFilterStore().setCategoryQuery(this.categoryQuery);

        await this.$router.push({
          name: 'Products',
          query: { filter: this.categoryQuery }
        })
      },
      async onSearchItem(){
        
        
        this.searchQuery = this.$refs.searchInput.value

       
          
          useFilterStore().setSearchQuery(this.searchQuery);

          await this.$router.push({
              name: 'Products',
              query: { filter: this.searchQuery }
          })
        
        
              
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import url(./assets/_app.scss);
  
</style>