<template>
<div>

    <div>
    <!--h2>Account Overview - {{ account.name }}</h2>
      <p>Account ID: {{ account.id }}</p>
      <p>Balance: ${{ account.Balance }}</p-->
          <h5>Transaction History</h5>
          <ul>
            <li v-for="(transaction, index) in transactions" 
            :key="index">
              {{ transaction.sender }} sent 
              ${{ transaction.amount }} to 
              {{ transaction.recipient }}
            </li>
          </ul>
          <ul>
              <li v-for="transaction in transactions" :key="transaction.id">
              </li>
            </ul>


            </div>
        <div>
    
    </div>

        <!--div v-for="account in accounts" :key="account.id">
      <h3>{{ account.name }}</h3>
      <div>
        <h4>Sent Transactions:</h4>
        <ul v-if="account.sentTransactions">
          <li v-for="transaction in account.sentTransactions" :key="transaction.id">
            Amount: {{ transaction.amount }}, Date: {{ transaction.date }}
          </li>
        </ul>
        <p v-else>No sent transactions.</p>
      </div>
      <div>
        <h4>Received Transactions:</h4>
        <ul v-if="account.receivedTransactions">
          <li v-for="transaction in account.receivedTransactions" :key="transaction.id">
            Amount: {{ transaction.amount }}, Date: {{ transaction.date }}
          </li>
        </ul>
        <p v-else>No received transactions.</p>
      </div>
    </div-->
  </div>
</template>

<script>
export default {
name: 'transaction-history', 
props: ['transactions', 'accounts', 'selectedAccount'],

data () {
  return {
        sentTransactions: [], // Array to store sent transactions
        receivedTransactions: [],// Array to store received transactions
            
}},
}
</script>

<style>

</style>