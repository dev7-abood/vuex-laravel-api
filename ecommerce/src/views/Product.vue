<template>
    <div class="row mt-5" v-if="product">
        <div class="col-4">
            <img src="https://loremflickr.com/640/360" class="w-100" />
        </div>
        <div class="col-8">
            <h1>{{product.title}}</h1>
            <h3>${{product.price}}</h3>

            <input type="number" v-model.number="quantity" class="text-center col-1 mr-2 p-1" />
            <button class="btn btn-primary" @click="addToCart()">Add to Cart</button>

            <p class="mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Product",
        props: ['id'],
        data(){
          return {
              quantity : 1
          }
        },
        computed: {
            product() {
                return this.$store.state.product
            }
        },
        mounted() {
            this.$store.dispatch('getProduct', this.id)
        },
        methods: {
            addToCart() {
                this.$store.dispatch('addProductToCart', {
                    product: this.product,
                    quantity: this.quantity
                });
            }
        }
    }

</script>

<style scoped>

</style>