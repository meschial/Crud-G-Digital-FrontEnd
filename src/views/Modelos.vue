<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <h2>Novo Modelo de Veículo</h2>
        <hr />

        <b-alert variant="danger" v-if="error.message" show>{{error.message}}</b-alert>
        <b-alert variant="info" v-if="info.message" show>{{info.message}}</b-alert>

        <b-form v-if="show" @submit.prevent="onSubmit()">

          <b-form-group id="input-group-name" label="Modelo:" label-for="input-name">
            <b-form-input id="input-name" v-model="form.name" type="text" :state="error.name.state" placeholder="Informe o Modelo"></b-form-input>
            <b-form-invalid-feedback id="input-name-feedback">{{error.name.message}}</b-form-invalid-feedback>
          </b-form-group>

           <b-form-group id="input-group-ano" label="Ano:" label-for="input-ano">
            <b-form-input id="input-ano" v-model="form.ano" type="number" :state="error.ano.state" placeholder="Informe o Ano"></b-form-input>
            <b-form-invalid-feedback id="input-ano-feedback">{{error.ano.message}}</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-marca" label="Marca:" label-for="input-marca">
            <select v-model="form.marca" class="form-control">
              <option v-for="(marca) in marcas.data" :key="marca.id" v-bind:value="marca.id">{{marca.name}}</option>
            </select>
            
          </b-form-group>
          

          <b-button type="submit" variant="primary" size="lg" block>Enviar</b-button>
        </b-form>
      </div>

      <div class="col-md-6">
        <h2>Todos os Modelos</h2>
        <hr />

        <table class="table">
            <thead class="table-dark">
                <tr>
                <th width="10%">ID</th>
                <th width="22%">Modelo</th>
                <th width="20%">Ano</th>
                <th width="20%">Marca</th>
                <th width="28%">Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(modelo) in modelos.data" :key="modelo.id">
                    <th scope="row">{{modelo.id}}</th>
                    <td>{{modelo.name}}</td>
                    <td>{{modelo.ano}}</td>
                    <td>{{modelo.nomemarcas}}</td>
                    <td>
                        <b-button  v-b-modal.modal-1 @click="editModelo(modelo.id)" variant="success" size="sm">Editar</b-button>
                        <b-button class="ml-1" @click="deleteModelo(modelo.id)" variant="danger" size="sm">Excluir</b-button>
                    </td>
                </tr>
            </tbody>
        </table>

        <pagination :data="modelos" @pagination-change-page="getResults"></pagination>

      </div>
    </div>

    <b-modal id="modal-1" title="Editar Marca">
        <b-form  v-if="show" @submit.prevent="updateModelo()">

          <b-form-group id="input-group-name" label="Modelo:" label-for="input-name">
            <b-form-input id="input-name" required v-model="form.editname" type="text" :state="error.name.state" placeholder="Informe o Modelo"></b-form-input>
            <b-form-invalid-feedback id="input-name-feedback">{{error.name.message}}</b-form-invalid-feedback>
          </b-form-group>

           <b-form-group id="input-group-ano" label="Ano:" label-for="input-ano">
            <b-form-input id="input-ano" required v-model="form.editano" type="number" :state="error.ano.state" placeholder="Informe o Ano"></b-form-input>
            <b-form-invalid-feedback id="input-name-feedback">{{error.ano.message}}</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-marca" label="Marca:" label-for="input-name">
            <select v-model="form.editmarca" class="form-control">
              <option disabled value="" selected="selected">Selecione uma marca</option>
              <option v-for="(marca) in marcas.data" :key="marca.id" v-bind:value="marca.id">{{marca.name}}</option>
            </select>
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
      ano:null,
      editname: null,
      editano: null,
      editmarca: null,
    },
    show: true,
    marcas:{},
    modelos:{},
    error: {
      message: null,
      name: {
        state: null,
        message: null,
      },
      ano: {
        state: null,
        message: null,
      },
      marca: {
        state: null,
        message: null,
      },
    },
    info: {
      message: null,
    },
  }),

    mounted() {
    this.getResults();
    this.getMarca();
  },
  
  methods: {
    errorReset() {
      this.error = {
        message: null,
        name: {
          state: null,
          message: null,
        },
        ano: {
          state: null,
          message: null,
        },
        marca: {
        state: null,
        message: null,
        },
      };
      this.info = {
        message: null,
      };
    },

    async onSubmit() {
        try {
            this.errorReset()
            if(!this.form.name){
              this.error.message = "Informe um modelo de veículo"
              this.error.name.state = false;
              this.error.name.message = "Informe um modelo de veículo"
              return;
            }
            if(!this.form.ano){
              this.error.message = "Informe o ano do veículo"
              this.error.ano.state = false;
              this.error.ano.message = "Informe o ano do veículo"
              return;
            }
            if(this.form.ano < 1900 || this.form.ano > 2021){
              this.error.message = "Informe um ano entre 1900 e 2021"
              this.error.ano.state = false;
              this.error.ano.message = "Informe um ano entre 1900 e 2021"
              return;
            }
            if(!this.form.marca){
              this.error.message = "Informe uma marca"
              this.error.marca.state = false;
              this.error.marca.message = "Informe uma marca"
              return;
            }
            await apiPublic.post('/modelos', {
                name: this.form.name,
                ano: this.form.ano,
                marca_id: this.form.marca,
            })
            this.form.name = null;
            this.form.ano = null;
            this.form.marca = null;
            this.getResults();
            this.getMarca();
            this.info.message = "Modelo criado com sucesso!"
        } catch (error) {
            console.error(error)
            this.error.message = "Não foi possivel concluir"
            if (!error.response || !error.response.data) 
            return;
        }
    },

    getResults(page = 1) {
			apiPublic.get('modelos?page=' + page)
				.then(response => {
					this.modelos = response.data;
				});
    },

    getMarca() {
			apiPublic.get('marcas/show' )
				.then(response => {
					this.marcas = response.data;
				});
    },

    deleteModelo(id){
        this.errorReset()
        apiPublic.delete('modelos/'+id)
        .then(response => {
            this.modelos = response.data;
      this.getResults();
      this.getMarca();
    });
    this.error.message = "Modelo excluido com sucesso!"
    },
    
    editModelo(id){
        apiPublic.get('modelos/'+id)
        .then(response => {
            this.form.id = response.data.id;
            this.form.editname = response.data.name;
            this.form.editano = response.data.ano;
            this.form.editmarca = response.data.marca_id;
        });
    },
    
    updateModelo(){
      try {
        this.errorReset()
        apiPublic.put('modelos/'+this.form.id,{
            id: this.form.id,
            name: this.form.editname,
            ano: this.form.editano,
            marca_id: this.form.editmarca
        })
        .then(response => {
            this.marcas = response.data;
            this.$bvModal.hide('modal-1')
            this.getResults();
            this.getMarca();
        });
        this.info.message = "Modelo atualizado com sucesso!"
      } catch (error) {
        console.error(error)
            this.error.message = "Não foi possivel concluir"
            if (!error.response || !error.response.data) 
            return;
      }
    },
  },
};
</script>

<style>
</style>