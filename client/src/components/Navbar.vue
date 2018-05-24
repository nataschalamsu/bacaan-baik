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
              <a class="nav-link" href="#">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Logout</a>
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
      ogin: {
        email: '',
        password: ''
      },
      register: {
        email: '',
        password: ''
      },
      isLogin: false
    }
  },
  methods: {
    loginUser: function () {
      console.log(this.login)
      axios
        .post('https://hacktivoverflow.herokuapp.com/users/signin', {
          email: this.login.email,
          password: this.login.password
        })
        .then(response => {
          console.log("masuk", response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', response.data.nowLogin.role)
            localStorage.setItem('id', response.data.nowLogin._id)
            localStorage.setItem('status', this.isLogin)
            const loginRole = localStorage.getItem('role')
            console.log(response.data.nowLogin)
            if (loginRole === 'admin') {
              this.isAdmin = true
            }
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
        .post('https://hacktivoverflow.herokuapp.com/users/signup', {
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
    }
  }
}
</script>

<style>

</style>


