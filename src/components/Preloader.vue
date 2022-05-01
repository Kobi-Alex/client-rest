<template>
    <div v-if="show" class="preloader">
        <p>Hello APP</p>
    </div>
</template>

<script >
export default{
    name: 'preloader',
    data(){
        return{
            show: true
        }
    },
    mounted(){
        this.showToggle()
    },
    methods:{
        showToggle(){
            setTimeout(() =>{
                this.show = false
            }, 5000)
        }
    }
}
</script>