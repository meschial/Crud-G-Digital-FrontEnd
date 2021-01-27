<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-6">
        <b-card class="text-center" bg-variant="dark" text-variant="white" title="Marcas">
          <b-card-text>
            Veja todas as marcas já cadastrada, adicione, remova ou edite uma marca.
          </b-card-text>
          <b-button @click="$router.push('/marcas')" block variant="primary">Ver todas</b-button>
        </b-card>
      </div>
      <div class="col-6">
        <b-card class="text-center" bg-variant="dark" text-variant="white" title="Modelos">
          <b-card-text>
            Veja todos os modelos já cadastrado, adicione, remova ou edite um modelo.
          </b-card-text>
          <b-button @click="$router.push('/modelos')" block variant="primary">Ver todos</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
     name: "Home",
    data() {
      return {
      }
    }
  }
</script>