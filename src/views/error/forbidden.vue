<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>4<span>0</span>3</h1>
      </div>
      <p>ACCESS FORBIDDEN</p>
      <p>I'm sorry buddy...</p>
      <a class="text-white" @click="clickHangle">Home page</a>
    </div>
  </div>
</template>

<script>
import Roles from "@/_helpers/_role.js";
import { decryptData } from "@/_helpers/crypto";
export default {
  methods: {
    clickHangle() {
      if (localStorage.auth) {
        let user = JSON.parse(decryptData(localStorage.auth));

        if (user.roles) {
          let user_roles = user.roles.split(",");
          let roles = Roles.filter((x) => x !== "Student");

          let isStaff = false;

          for (let role of user_roles) {
            if (roles.includes(role)) {
              isStaff = true;
              break;
            }
          }

          if (isStaff) {
            this.$router.push({ name: "HomeAdmin" });
          } else if (user_roles.includes("Student")) {
            this.$router.push({ name: "Home" });
          } else {
            this.$router.push({ name: "Login" });
          }
        } else {
          this.$router.push({ name: "Login" });
        }
      } else {
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style scopped>
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#notfound {
  position: relative;
  height: 100vh;
  background-color: transparent;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 460px;
  width: 100%;
  text-align: center;
  line-height: 1.4;
}

.notfound .notfound-404 {
  height: 260px;
  line-height: 153px;
}

.notfound .notfound-404 h1 {
  font-family: josefin sans, sans-serif;
  color: #222;
  font-size: 250px;
  letter-spacing: 10px;
  margin: 0;
  font-weight: 700;
  text-shadow: 2px 2px 0 #c9c9c9, -2px -2px 0 #c9c9c9;
}

.notfound .notfound-404 h1 > span {
  text-shadow: 2px 2px 0 #ffab00, -2px -2px 0 #ffab00, 0 0 8px #ff8700;
}

.notfound p {
  font-family: josefin sans, sans-serif;
  color: #c9c9c9;
  font-size: 16px;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 15px;
}

.notfound a {
  font-family: josefin sans, sans-serif;
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
  background: 0 0;
  color: #c9c9c9;
  border: 2px solid #c9c9c9;
  display: inline-block;
  padding: 10px 25px;
  font-weight: 700;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
  cursor: pointer;
}

.notfound a:hover {
  color: #ffab00;
  border-color: #ffab00;
}

@media only screen and (max-width: 480px) {
  .notfound .notfound-404 {
    height: 122px;
    line-height: 122px;
  }

  .notfound .notfound-404 h1 {
    font-size: 122px;
  }
}
</style>