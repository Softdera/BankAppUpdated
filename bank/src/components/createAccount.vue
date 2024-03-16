<template>
        
        <div>
        


           <div class="container my-5">
        <div class="row">
            <div class="col-md-5">
                <h2>Create New Account</h2>
                    <form @submit.prevent="createAccount">
                    <div class="mb-2">
                        <input required 
                        type="text" 
                        id="name"
                        v-model="newAccount.name"
                        class="form-control" 
                        placeholder="Name" >
                    </div>
                    <div class="mb-2">
                        <input   type="number" 
                        v-model="newAccount.AccNumber"
                        id="AccNumber"
                        class="form-control" 
                        required
                        placeholder="Account Number">
                    </div>
                    <div class="mb-2">
                        <input required 
                        v-model="newAccount.Balance"
                        id="Balance"
                        type="number" class="form-control"
                         placeholder="Balance">
                    </div>
                   
                    <div class="mb-2">
                        <input required  
                        v-model="newAccount.Occupation"
                        id="Occupation"
                        type="text" class="form-control"
                         placeholder="Occupation">
                    </div>
                   
                   
                    <button type="submit"
                    class="btn btn-success"> 
                    Create Account</button>

                    </form>
            </div>
        </div>
        </div>
         
        </div>
        
</template>

<script>
export default {
    name: 'createAccount', 
      data() {
        return {
        
          newAccount: {
          name: '',
          Balance: '',
          Occupation: '',
          AccNumber: '',
          transactions: [] // Initialize an empty array for transactions
        }
        };
    },
    methods: {
        createAccount() {
          this.$emit('new-account', this.newAccount,


          );
          this.clearForm();
       
        },
        clearForm(){
    console.log(this.newAccount);
      this.newAccount = {
            name: '',
            Balance: '',
            Occupation: '',
            AccNumber: '',
      }},
      }
    }


</script>

<style>

</style>