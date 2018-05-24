<template>
<div>
  <div class="col-lg-4 col-md-6 mb-4" v-for="(book, i) in bookTemp" :key="{i}">
    <div class="card h-100" >
      <a href="#"><img class="card-img-top" :src="book.image" alt="book" style="height: 200px; width: 175px"></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">{{ book.title }}</a>
        </h4>
        <router-link :to="{ path:'/' + book._id, params: { id: book._id } }">
          Add Review
        </router-link>
        <p class="card-text">Reviews</p>
        <hr>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex' 

export default {
  name: 'Book',
  data() {
    return {
      bookTemp: []
    }
  },
  methods: {
    
  },
  created() {
    axios
      .get(`http://localhost:3000/books/${this.$route.params.id}`)
      .then(result => {
        console.log(result)
        this.bookTemp = result.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    $route: function (to, from) {
      this.$router.go()
    }
  }
}
</script>

