/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  updateBalance() {
    let totalCredit = 0;
    let totalDebit = 0;

    for (let i of this.state.creditList) {
      totalCredit += i.amount;
    }

    for (let i of this.state.debitList) {
      totalDebit += i.amount;
    }

    this.setState({
      accountBalance: Math.round((totalCredit - totalDebit) * 100) / 100
    }
    ,console.log('updatebalance works')
    );
  }
  
  addCredit = (credit) => {
    this.state.creditList.push({
      id: credit.id,
      description: credit.description,
      amount: credit.amount,
      date: credit.date 
    })
    
    this.setState({creditList: this.state.creditList}, () => this.updateBalance());
  }

  addDebit = (debit) => {
    this.state.debitList.push({
      id: debit.id,
      description: debit.description,
      amount: debit.amount,
      date: debit.date 
    })
    
    this.setState({debitList: this.state.debitList}, () => this.updateBalance());
  }

  async componentDidMount() {
    let responseCLink = 'https://johnnylaicode.github.io/api/credits.json';
    let responseDLink = 'https://johnnylaicode.github.io/api/debits.json';

    try {
      let responseC = await axios.get(responseCLink);
      let responseD = await axios.get(responseDLink);

      this.setState({creditList: responseC.data});
      this.setState({debitList: responseD.data});
    }

    catch(error) {
      if (error.responseC) console.log(error.responseC.status);
      if (error.responseD) console.log(error.responseD.status);
    }

    this.updateBalance();
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} 
      accountBalance={this.state.accountBalance} 
      addCredit={this.addCredit}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} 
      accountBalance={this.state.accountBalance} 
      addDebit={this.addDebit}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;