<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Start Bootstrap</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#regisModal" v-if="isLogin === false">Register</a>
              <div class="modal fade" id="regisModal">
                <div class="modal-dialog">
                  <div class="modal-content">
              
                    <div class="modal-header">
                      <h4 class="modal-title">Register</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
              
                    <div class="modal-body">
                      <form accept-charset="UTF-8">
                        <div class="form-group">
                          <label for="email">Email address:</label>
                          <input type="email" class="form-control" id="email" v-model="register.email">
                        </div>
                        <div class="form-group">
                          <label for="pwd">Password:</label>
                          <input type="password" class="form-control" id="pwd" v-model="register.password">
                        </div>
                        <button type="submit" class="btn btn-success"  data-dismiss="modal" @click="registerUser">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" data-target="#loginMod" v-if="isLogin === false">Login</a>
              <!-- The Modal -->
              <div class="modal fade" id="loginMod">
                <div class="modal-dialog">
                  <div class="modal-content">
              
                    <!-- Modal Header -->
                    <div class="modal-header">
                      <h4 class="modal-title">Login</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
              
                    <!-- Modal body -->
                    <div class="modal-body">
                      <form>
                        <div class="form-group">
                          <label for="email">Email address:</label>
                          <input type="email" class="form-control" id="emailLogin" v-model="login.email">
                        </div>
                        <div class="form-group">
                          <label for="pwdLogin">Password:</label>
                          <input type="password" class="form-control" id="pwdLogin" v-model="login.password">
                        </div>
                        <input type="button" class="btn btn-success" @click="loginUser" data-dismiss="modal" value="Login">
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href="#" class="nav-link" data-toggle="modal" aria-haspopup="true" aria-expanded="false" data-target="#newModal" v-if="isLogin === true">
                Add Book
              </a>

                <div class="modal" id="newModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                
                      <!-- Modal Header -->
                      <div class="modal-header">
                        <h4 class="modal-title">New Book</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>
                
                      <!-- Modal body -->
                      <div class="modal-body text-justify">
                        <form>
                          <div class="form-group">
                            <label for="newTitle">Title:</label>
                            <input type="text" class="form-control" id="newTitle" v-model="newBook.title">
                          </div>
                          <div class="form-group">
                            <label for="newAuthor">Author:</label>
                            <input type="text" class="form-control" id="newAuthor" v-model="newBook.author">
                          </div>
                          <div class="form-group">
                            <label for="newCompany">Company:</label>
                            <input type="text" class="form-control" id="newCompany" v-model="newBook.company">
                          </div>
                          <div class="form-group">
                            <div class="custom-file">
                              <label for="newImage">Image:</label>
                              <input type="file" class="form-control" id="newImage" @change="getNewImage">
                            </div>
                          </div>
                          <input type="button" class="btn btn-success" @click="addBook()" data-dismiss="modal" value="Post">
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logoutUser" v-if="isLogin === true">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      register: {
        email: '',
        password: ''
      },
      isLogin: false,
      newBook: {
        title: '',
        author: '',
        company: '',
        image: ''
      }
    }
  },
  methods: {
    loginUser: function () {
      console.log(this.login.password)
      axios
        .post('http://localhost:3000/users/signin', {
          email: this.login.email,
          password: this.login.password
        })
        .then(response => {
          console.log("masuk", response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.nowLogin._id)
            this.isLogin = true
            this.$router.push('/')
            alert('Welcome!')
        })
        .catch(err => {
          console.log("ini", err)
        })
    },
    registerUser: function () {
      console.log(this.register)
      axios
        .post('http://localhost:3000/users/signup', {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        })
        .then(response => {
          console.log(response)
          alert('Register Success')
        })
        .catch(err => {
          console.log(err)
        })
    },
    logoutUser: function () {
      localStorage.removeItem('token')
      this.isLogin = false
      this.login.email = ''
      this.login.password = ''
      this.$router.push('/')
    },
     addBook () {
      const { title, author, company, image } = this.newBook
      const formAdd = new FormData()

      formAdd.append('title', title)
      formAdd.append('author', author)
      formAdd.append('company', company)
      formAdd.append('image', image)

      axios({
        method: 'post',
        url: 'http://localhost:3000/books',
        data: formAdd,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          alert('book added')
          this.$router.push('/')
        })
        .catch(err => {
          console.log("masuk===> ",err);
        })
    },
    getNewImage(event) {
      this.newBook.image = event.target.files[0]
    }
  }
}
</script>

<style>

</style>


