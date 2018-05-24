<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <Navbar/>
    <div class="container">

      <div class="row">

        <div class="col-lg-3">

          <h1 class="my-4">Rak Buku</h1>

        </div>
        <!-- /.col-lg-3 -->

        <div class="col-lg-9">

          <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="(book, i) in booksTemp" :key="{i}">
            <div class="card h-100" >
              <a href="#"><img class="card-img-top" :src="book.image" alt="book" style="height: 200px; width: 175px"></a>
              <div class="card-body">
                <h5 class="card-title">
                  <a href="#">{{ book.title }}</a>
                </h5>
                <hr>
                <!-- {{ book.reviews }} -->
                <p class="card-text border-bottom border-dark text-left">Reviews</p>
                <div class="text-justify" v-for="(rev, j) in book.reviews" :key="{j}">
                  <p>{{ rev.user.email }}</p>
                  <p>{{ rev.userReview }}</p>
                  <a href="#" @click="deleteReview(rev)">Delete</a>
                </div>
              </div>
              <div class="card-footer">
                <!-- <router-link :to="{ path:'/' + book._id, params: { id: book._id } }"> -->
                <!-- <router-link to="{path: '/about' + book._id, params: { id: book._id } }">Go</router-link> -->
                <button type="button" class="btn btn-danger btn sm" @click="deleteBook(book)">Delete</button>
                <div class="dropdown">
                  <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Add Review
                  </button>
                  <div class="dropdown-menu">
                    <form class="px-4 py-3">
                      <div class="form-group">
                        <label>What do you think?</label>
                        <textarea class="form-control" rows="3" v-model="review" ></textarea>
                      </div>
                      <input type="button" class="btn btn-sm btn-primary" value="Submit" @click="postReview(book)">
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <!-- /.row -->

        </div>
        <!-- /.col-lg-9 -->

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->

    <!-- Footer -->
    <footer class="py-5 bg-dark">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Your Website 2017</p>
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import Book from '@/components/Book.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    Navbar,
    Book
  },
  data () {
    return {
      review: ''
    }
  },
  methods: {
    ...mapActions([
      'getAllBook'
    ]),
    postReview (book) {
      let token = localStorage.getItem('token')
      if (token) {
        axios
          .post(`http://localhost:3000/reviews`, {
            userReview: this.review,
            id: book._id
          }, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(result => {
            alert('thank you for you review')
          })
      } else {
        alert('please login first')
      }
    },
    deleteReview (rev) {
      let token = localStorage.getItem('token')
      if (token) {
        if (rev.user._id === localStorage.getItem('id')) {
          axios
            .delete(`http://localhost:3000/reviews/${rev._id}`, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(result => {
              alert('review deleted')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          alert('access denied')
        }
      } else {
        alert('please login first')
      }
    },
    deleteBook (book) {
      let token = localStorage.getItem('token')
      if (token) {
        if (book.user._id === localStorage.getItem('id')) {
          axios
            .delete(`http://localhost:3000/books/${book._id}`, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(result => [
              alert('book deleted')
            ])
            .catch(err => {
              console.log(err)
            })
        } else {
          alert('access denied')
        }
      } else {
        alert('please login first')
      }
    }
  },
  computed: {
    ...mapState([
      'booksTemp'
    ])
  },
  mounted () {
    this.getAllBook()
  }
}
</script>
