import Vue from 'vue';
import Hello from './components/Hello';
// import Hello2 from './components/Hello2';
 
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    components: {
        Hello2
    }
});