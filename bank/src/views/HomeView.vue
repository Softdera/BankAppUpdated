<template>
  <div>
    <h1>Soft Bank</h1>
   <div class="flex-container">
      <div class="row">
        <div class="col-md-6" >
          <div class="right-side">
            <div class="container mt-2 pt-4" v-if="accounts.length > 0">
            <div class="row">
                  <!-- Create Account Component -->
                <create-account @new-account="addAccount">
                </create-account>
              <h5>Select Account</h5>
              <div class="col-md-12" v-for="(account) in accounts" 
              :key="account.id">
                  <div class="card my-3 list-group-item-success shadow-lg">
                    <div class="row align-items-center">
                      
                    <div class="col-md-10">
                      <ul class="list-group ">
                        <li class="list-group-item">
                          Name: <span id="fw-bold name"> {{ account.name }} </span>
                        </li>
                        <li class="list-group-item">
                          Account Number: <span id="fw-bold AccNumber" > 
                            {{ account.AccNumber }} </span>
                        </li>
                        <li class="list-group-item">
                          Balance: <span id="fw-bold Balance"> 
                            ${{ account.Balance }} 
                          </span>
                        </li>
                        <li class="list-group-item">
                          Occupation: <span id="fw-bold Occupation"> {{ account.Occupation }} </span>
                        </li>                     
                      </ul>
                    </div>
                    <div class="col-md-2 pt-2">  
                     
                            <!--div v-model="selectedAccount"-->
                      

                              <button class="btn btn-info my-1"
                              @click="selectAccount(account)">
                            <i class="fa fa-pen"></i> 
                            </button>
                            <div>
                        <button class=" btn btn-success my-1"
                        @click="openBankStatement(account)">
                        <i class=" fa fa-arrow-right"></i></button>
                      </div> 
                        </div>
                          
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
        
        <div class="col-md-6">
          <div class="left-side">
              <div class="AccountDetails">
               <!-- Account Details Component -->
             <account-details :accounts="accounts" 
              :selected-account="selectedAccount" 
              @transfer="transferMoney"
              @update-account="updateAccount"
              :transactions="transactions">
              </account-details>

              </div>
             <div class="transactionHistory"> 
               <!-- Transaction History Component -->
             <transaction-history 
              :transactions="transactions"
              :accounts="accounts"> 
              </transaction-history>

              <div> 
                <div>Total transactions: {{ totalTransactions }}</div>

              </div>
              <div> 
                <div>Total Transactions Today: {{ totalTransactionsToday }}</div>
              </div>
             </div>
             <h2>Total Transactions for Each Account</h2>
                <ul>
                  <li v-for="account in accounts" :key="account.id">
                    {{ account.name }}: {{ getNumberOfTransactions(account) }}
                  </li>
                </ul>

                <div> 
            

          </div>
        </div>

             </div>
              </div>
        </div>
      </div>
</template>

    <script>


    import accountDetails from "../components/accountDetails.vue"
    import createAccount from "../components/createAccount.vue"
    import transactionHistory from "../components/transactions.vue"


    export default {
      name: 'home',    
      components:{
        accountDetails,
        createAccount,
        transactionHistory

      },
      data() {
       return{
        totalTransactionsToday: 0,
        totalTransactions: 0,
        accounts: [
          {
            name: 'Ada Chioma',
            id: 11,
            Balance: 4000,
            Occupation: 'Developer',
            AccNumber: 7774,
            transactions: []//for calculation each individual total transactions.


          },
          {
            name: 'Obinna Chi',
            id: 12,
            Balance: 6900,
            Occupation: 'Student',
            AccNumber: 7775,
            transactions: []

          },
          {
            name: 'Femi Ola',
            id: 14,
            Balance: 10000,
            Occupation: 'Lawyer',
            AccNumber: 7776,
            transactions: []

          },
          {
            name: 'Aisha Musa',
            id: 19,
            Balance: 15000,
            Occupation: 'Developer',
            AccNumber: 7777,
            transactions: []

          }
        ],
        selectedAccount: null, //this.account.name,
        transactions: [] // Array to store total transactions for each account

       } 
      },
     mounted () {
    },



      methods: {
        addAccount(newAccount) {  
          this.accounts.unshift(newAccount);
          this.selectedAccount = newAccount;
       
        },
        selectAccount(selectedAccount) {
          this.selectedAccount = selectedAccount;
          console.log('choose me');
    },

    transferMoney(transferData) {
      const senderIndex = this.accounts.findIndex(account => account.id === transferData.sender.id);
      const recipientIndex = this.accounts.findIndex(account => account.id === transferData.recipient.id);
      if (senderIndex === -1 || recipientIndex === -1) {
        alert('Error: Sender or recipient account not found');
        return;
      }
      if ( this.accounts[senderIndex].Balance < transferData.amount                 
      ) 
       { alert('Error: Insufficient balance');
        return;
      }
      
     this.accounts[senderIndex].Balance -= transferData.amount, 
      this.accounts[recipientIndex].Balance += transferData.amount;
     this.transactions.push({
        sender: transferData.sender.name, 
        recipient: transferData.recipient.name, 
        amount: transferData.amount,
           });


        this.accounts[senderIndex].transactions.push({
          sender: transferData.sender.name,
          type: 'Debit',
          amount: transferData.amount,
          date: new Date().toLocaleDateString(),
          recipient: transferData.recipient.name
        });

        // Record the transaction for recipient
        this.accounts[recipientIndex].transactions.push({
          recipient: transferData.recipient.name,
          type: 'Credit',
          amount: transferData.amount,
          date: new Date().toLocaleDateString(),
          sender: transferData.sender.name
        });
              //to add dates
     const today = new Date().toLocaleDateString();
      const transactionDate = new Date(transferData.date).toLocaleDateString();
      if (transactionDate === today) {
        this.totalTransactionsToday++;
      }
      alert('Transfer successful');
    this.totalTransactions = this.calculateTotalTransactions();
    return this.totalTransactionsToday
    },

    //To calculate the Total transactions performed by all accounts
       calculateTotalTransactions() {
        let totalTransactions = 0;
        this.accounts.forEach(account => {
          totalTransactions = this.transactions.length;
        });
        return totalTransactions;
      },


    

    
    getNumberOfTransactions(account) {
      return account.transactions.filter(transaction => transaction.type === 'Credit' || transaction.type === 'Debit').length;
    }
  
    
    }    
  }

  

  
      



   /* transferMoney(transferData) {
      if (!transferData.sender || !transferData.recipient || transferData.amount <= 0) {
        alert('Please select sender, recipient, and enter a valid amount');
        return;
      }
      if (transferData.sender.balance < transferData.amount) {
        alert('Insufficient balance');
        return;
      }
      transferData.sender.balance -= transferData.amount;
      transferData.recipient.balance += transferData.amount;
      this.transactions.push({
        sender: transferData.sender.name,
        recipient: transferData.recipient.name,
        amount: transferData.amount
      });
      // Add transaction to sender's and recipient's account transactions
      transferData.sender.transactions.push({
        sender: transferData.sender.name,
        recipient: transferData.recipient.name,
        amount: transferData.amount
      });
      transferData.recipient.transactions.push({
        sender: transferData.sender.name,
        recipient: transferData.recipient.name,
        amount: transferData.amount
      });
      alert('Transfer successful');
    }*/

  
      
      
    
    </script>

    <style>
    .left-side{
      background-color: whitesmoke;
      height: 250vh;
    }
    .AccountDetails{
      padding-top: 100px;
      padding-bottom: 50px;
    }

    .transactionHistory{
      margin-bottom: 50px;
      margin-top: 50px;
    }







    </style>
    

  








       
      
      
  

