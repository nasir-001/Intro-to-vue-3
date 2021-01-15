app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    
    template:
    /*html*/
    `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" :class="[inStock ? '' : 'out-of-stock-img']" alt="productImage">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                <product-details :details="details"></product-details>
                <div 
                    :key="variant.id" 
                    v-for="(variant, index) in variants" 
                    @mouseover="updateVariant(index)"
                    class="color-circle"
                    :style="{ backgroundColor: variant.color }"  
                ></div>
                <button 
                    class="button" 
                    @click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
                >
                Add to cart</button>
                <button class="buttonRed" @click="reduceCart">Reduce cart</button>
                <div :key="item.id" v-for="item in sizes">
                Size {{ item.size }}
                </div>
                <p v-show="onSale">{{ isOnSale }}</p>
                <p>{{ description }}</p>
                <a :href="url">Product url</a>
            </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    
    data() {
        return {
            product: 'Boots',
            brand: 'Vue Mastery',
            onSale: true,
            selectedVariant: 0,
            url: 'https://www.google.com',
            details: ['50% cutton', '30% wool', '20% polyester'],
            reviews: [],
            response: [],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            sizes: [
                { id: 1, size: 12 },
                { id: 2, size: 14 },
                { id: 3, size: 16 },
                { id: 4, size: 18 },
            ],
            description: 'These is the description for this product.'
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        reduceCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        isOnSale() {
            return this.brand + " " + this.product + " " + "is on sale"
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    },
})