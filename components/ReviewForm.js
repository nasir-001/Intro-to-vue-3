app.component('review-form', {
    template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="name">

        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>

        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>

        <label for="response">Would you recommend this product?</label>
        <textarea id="response" v-model="response"></textarea>

        <input type="submit" value="Submit" class="button">

    </form>`,
    data() {
        return {
            name: '',
            review: '',
            rating: null,
            response: ''
        }
    },
    methods: {
        onSubmit() {
            if (this.name === '' || this.review === '' || this.rating === null || response === '') {
                alert('Review is incomplete, Please fill out every field')
                return 
            }
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                response: this.response
            }
            this.$emit('review-submitted', productReview)

            this.name = '',
            this.review = '',
            this.rating = null,
            this.response = ''
        }
    }
})