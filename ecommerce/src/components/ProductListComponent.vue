<template>
        <div class="d-flex align-items-stretch flex-wrap">
            <product-card-component v-for="product in products" :key="product.id" :product="product"/>
        </div>
</template>

<script>
    import ProductCardComponent from "./ProductCardComponent";
    export default {
        name: "ProductListComponent",
        components : {
            ProductCardComponent
        },
        mounted() {
            this.$store.dispatch('getProducts')
        },
        computed :{
            products()
            {
              return this.$store.state.products
            }
        }
    }
</script>

<style scoped>

</style>