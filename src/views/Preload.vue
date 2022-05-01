<template>
        <div class="preloader, text-animation">
            VCE USER TESTING SYSTEM
        </div>
        <div class="text-main">
            <span>P</span>
            <span>R</span>
            <span>O</span>
            <span>U</span>
            <span>D</span>
        </div>
        <div class="text-createby">
            <div>
                Create by: TAlex
            </div>
            <div>
                ITSTEP 2022
            </div>
        </div>
</template>


<script >

import { useRouter } from "vue-router";

export default{
    name: 'preloader',
    data(){
        return{
            show: true
        }
    },
    mounted(){

        this.showToggle()

        document.querySelector(".text-animation").innerHTML = 
        document.querySelector(".text-animation").textContent.replace(/./g, "<span>$&</span>");

        let spans = document.querySelectorAll(".text-animation span");

        for (let i = 0; i < spans.length; i++) {
            
            let left = innerWidth * Math.random();
            let top = innerHeight * Math.random();

            if(Math.random() < 0.5){
                spans[i].style.left = "-"+left+"px";
            } else {
                spans[i].style.left = left+"px";
            }

            if(Math.random() < 0.5){
                spans[i].style.top = "-"+top+"px";
            } else {
                spans[i].style.top = top+"px";
            }
        }

        let hr = document.createElement('hr');
        document.querySelector(".text-animation").append(hr);
        },

        methods:{
            showToggle(){
                setTimeout(() =>{
                    this.show = false
                    this.$router.push({name:'Login'})
                }, 5000)
            }
        },
}
</script>

<style scoped>
    @import "../assets/css/animation.css";
</style>