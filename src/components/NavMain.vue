<template>
  <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand @click="$router.push('/')">Crud G Digital</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item @click="$router.push('/')">Inicio</b-nav-item>
              <b-nav-item @click="$router.push('/marcas')">Marca</b-nav-item>
              <b-nav-item @click="$router.push('/modelos')">Modelo</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
</template>

<style>

</style>