import Vue from 'vue'
import App from './App.vue'
// Importando bulma, para etilziar a pagina, semelhante ao bootstrap
import "../node_modules/bulma/css/bulma.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
