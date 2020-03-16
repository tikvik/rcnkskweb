<template>
    <div class="hello">{{ greeting }} <span><slot></slot></span>!</div>
</template>
 
<script>
    import Vue from 'vue';
 
    export default Vue.component('hello', {
        data() {
            return {
                greeting: 'Hello'
            }
        }
    });
</script> 
 
<style lang="less">
    .hello {
        color: red;
        
        span {
            color: blue;
        }
    }
</style> 