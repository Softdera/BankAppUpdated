<!-- AccountOverview.vue -->
<template>
    <div>
      <!--h2>Account Overview - {{ account.name }}</h2>
      <p>Account ID: {{ account.id }}</p>
      <p>Balance: ${{ account.Balance }}</p>
      <p>Transaction History:</p>
      <ul>
        <li v-for="(transaction, index) in 
        transactions" :key="index">
          {{ transaction.sender }} 
          sent ${{ transaction.amount }} to 
          {{ transaction.recipient }}
        </li>
      </ul-->
    </diV>
    
      

  </template>
  
  <script>
  export default {
    name: 'accountOverview',
    props: ['account']
  };
  </script>
  