<template>
  <div id="app">
    <main>
      <NavMain></NavMain>
      <router-view />
    </main>
    <FooterMain></FooterMain>
  </div>
</template>

<script>
 import NavMain from "@/components/NavMain.vue"
 import FooterMain from "@/components/FooterMain.vue"
export default {
  components:{
    NavMain,
    FooterMain
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
main{
  min-height: calc(100vh - 100px);
  margin-bottom: 35px;
}
</style>
