<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <h2>Nova Marca</h2>
        <hr />

        <b-alert variant="danger" v-if="error.message" show>{{error.message}}</b-alert>
        <b-alert variant="info" v-if="info.message" show>{{info.message}}</b-alert>

        <b-form v-if="show" @submit.prevent="onSubmit()">

          <b-form-group id="input-group-name" label="Marca:" label-for="input-name">
            <b-form-input id="input-name" v-model="form.name" type="text" :state="error.name.state" placeholder="Informe a marca"></b-form-input>
            <b-form-invalid-feedback id="input-name-feedback">{{error.name.message}}</b-form-invalid-feedback>
          </b-form-group>

          <b-button type="submit" variant="primary" size="lg" block>Enviar</b-button>

        </b-form>
      </div>

      <div class="col-md-6">
        <h2>Todas as Marca</h2>
        <hr />

        <table class="table">
            <thead class="table-dark">
                <tr>
                <th width="10%">ID</th>
                <th width="63%">Marca</th>
                <th width="28%">Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(marca) in marcas.data" :key="marca.id">
                    <th scope="row">{{marca.id}}</th>
                    <td>{{marca.name}}</td>
                    <td>
                        <b-button  v-b-modal.modal-1 @click="editMarca(marca.id)" variant="success" size="sm">Editar</b-button>
                        <b-button class="ml-1" @click="deleteMarca(marca.id)" variant="danger" size="sm">Excluir</b-button>
                    </td>
                </tr>
            </tbody>
        </table>

        <pagination :data="marcas" @pagination-change-page="getResults"></pagination>

      </div>
    </div>

    <b-modal id="modal-1" title="Editar Marca">

        <b-form  v-if="show" @submit.prevent="updateMarca()">

          <b-form-group id="input-group-editname" label="Marca:" label-for="input-editname">
            <b-form-input id="input-editname" required v-model="form.editname" type="text"></b-form-input>
           </b-form-group>

          <b-button type="submit" variant="primary" size="lg" block>Atualizar</b-button>

        </b-form>
    </b-modal>

  </div>
</template>

<script>
import {apiPublic} from "../services/apiServices"
export default {
  data: () => ({
    form: {
      id: null,
      name: null,
      editname: null
    },
    show: true,
    marcas:{},
    error: {
      message: null,
      name: {
        state: null,
        message: null,
      }
    },
    info: {
      message: null,
    },
  }),

    mounted() {
		this.getResults();
  },
  
  methods: {
    errorReset() {
      this.error = {
        message: null,
        name: {
          state: null,
          message: null,
        }
      };
      this.info = {
        message: null,
      };
    },

    async onSubmit() {
        try {
            this.errorReset()
            if(!this.form.name){
              this.error.message = "Informe uma Marca"
              this.error.name.state = false;
              this.error.name.message = "Informe uma Marca"
              return;
            }
            await apiPublic.post('/marcas', {
                name: this.form.name
            })
            this.form.name = null;
            this.info.message = "Marca criada com sucesso!"
            this.getResults();
        } catch (error) {
            console.error(error)
            this.error.message = "Não foi possivel concluir"
            if (!error.response || !error.response.data) 
            return;
        }
    },

    deleteMarca(id){
        this.errorReset()
        apiPublic.delete('marcas/'+id)
        .then(response => {
            this.marcas = response.data;
            this.error.message = "Marca excluida com sucesso!"
			this.getResults();
		});
    },

    getResults(page = 1) {
			apiPublic.get('marcas?page=' + page)
				.then(response => {
					this.marcas = response.data;
				});
    },

    editMarca(id){
        apiPublic.get('marcas/all/'+id)
        .then(response => {
            this.form.id       = response.data.id;
            this.form.editname = response.data.name;
        });
    },
    
    updateMarca(){
      try {
            this.errorReset()
            apiPublic.put('marcas/'+this.form.id,{
            id: this.form.id,
            name: this.form.editname
        })
        .then(response => {
            this.marcas = response.data;
            this.$bvModal.hide('modal-1')
            this.info.message = "Marca atualizada com sucesso!"
            this.getResults();
        });
        } catch (error) {
            console.error(error)
            alert(this.error.message = "Não foi possivel concluir")
            if (!error.response || !error.response.data) 
            return;
        }
    },
  },
};
</script>

<style>
</style>