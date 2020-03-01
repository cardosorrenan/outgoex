<p align="center" >
  <img height="100" src="https://raw.githubusercontent.com/cardosorrenan/outgoex/master/public/logo.png">
</p>
<h6 align="center">
  A simple SPA for logging and tracking your expenses.
</h6>

---

#### :wrench: &nbsp; Technologies:
 * Vue.js v2.6
 * Vue Router v3.1
 * Firebase v7.14
 * Bootstrap v4.4


#### :zap: &nbsp; Run:
 * https://outgoex.firebaseapp.com
 * Login: testing@<span></span>outgoex.com
 * Password: 123456

###### Based on [this course](https://www.youtube.com/playlist?list=PL7SyCwLzd5jt7zcDoBjGt7v7zViBt7WgA) by Arthur Oliveira :pencil:

---

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production

* Rename ```env.local.example``` to ```env.local```
* Create a firebase account, make a new project and fill in the credentials at ```env.local```
* Linux/Mac:
```
mkdir deploy
cd deploy
firebase login
firebase init
firebase deploy
cd ..
npm run deploy
```
