<template>
<div>
   <div>
        <div v-if="selectedAccount">
          <h2>Account Details</h2>
          <p>Name: {{ selectedAccount.name }}</p>
          <p>Balance: ${{ selectedAccount.Balance }}</p>
          <div>
              <h2>Transaction History for {{ selectedAccount.name }}</h2>
              <div>
                <h3>Debit Transactions</h3>
                <ul>
                  <li v-for="transaction in debitTransactions" :key="transaction.id">
                    ${{ transaction.amount }} - {{ transaction.date }} - Sent to: {{ transaction.recipient }}
                  </li>
                </ul>
              </div>
              <div>
                <h3>Credit Transactions</h3>
                <ul>
                  <li v-for="transaction in creditTransactions" :key="transaction.id">
                    ${{ transaction.amount }} - {{ transaction.date }} - Received from: {{ transaction.sender }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="accounts.length > 0">
            <h6><strong>Transfer Money</strong></h6>
            <div>
              <label for="sender">Sender:</label>
              <select v-model="sender" 
              @change="updateSender">
                <option v-for="account in 
                accounts"
                    :value="account" :key="account" 
                    >{{ account.name }}</option>
              </select>
            </div>
            <div>
              <label for="recipient">Recipient:</label>
              <select v-model="recipient" 
              @change="updateRecipient">
                <option v-for="account in 
                accounts" 
                :value="account"
               :key="account" >
                  {{ account.name }}</option>
              </select>
            </div>
            <div>
              <label for="amount">Amount:</label>
              <input type="number" v-model="amount" min="0">
            </div>
            <!--button @click="sendMoney">Send Money</button>
             <button @click="receiveMoney">Receive Money</button-->
            <button @click="transfer">Transfer</button>
          </div>
          <div v-else>
         <p>No account selected</p>
       </div>  
        </div>
        
        <button @click="updateAccountDetails">
            Update Account Details</button>
        </div>
 



  
</template>

<script>
export default {
  name: 'accountDetails', 
      props: ['accounts', 'selectedAccount', 'transactions'],
      data() {
        return {
          amount: 0,
          sender: this.selectedAccount,
          recipient: this.selectedAccount,

        }
    },

    computed: {
    debitTransactions() {
      return this.selectedAccount.transactions.filter(transaction => transaction.type === 'Debit');
    },
    creditTransactions() {
      return this.selectedAccount.transactions.filter(transaction => transaction.type === 'Credit');
    }
  },

    methods: {

      updateSender() {
      this.$emit('update-sender', this.sender);
    },
    updateRecipient() {
      this.$emit('update-recipient', this.recipient);
    },
    transfer() {
      if (!this.sender || !this.recipient || this.amount <= 0) {
        alert('Please select sender, recipient, and enter a valid amount');
        return;
      }
      if (this.sender.Balance < this.amount) {
        alert('Insufficient balance');
        return;
      }
      this.$emit('transfer', {
        sender: this.sender,
        recipient: this.recipient,
        amount: this.amount,
        date: new Date() // Include current date with the transaction details

      });
      this.sender = null;
      this.recipient = null;
      this.amount = 0;
    },

        
      }
      }
    


</script>

<style>

</style>