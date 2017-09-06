<template>
  <div>
    <h1>Register</h1>

    <input type="email" name="email" v-model="email" placeholder="email"><br>
    <input type="password" name="password" v-model="password" placeholder="password"><br>
    <button @click="register" type="button">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: 'sumit',
      password: '123'
    }
  },
  watch: {
    // email (value) {
    //   console.log('email has changed', value)
    // }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.email = 'hello world'
    // }, 2000)
  }
}
</script>
