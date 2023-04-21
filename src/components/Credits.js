/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {

  let viewCredits = () => {
    const { credits } = props;
    return credits.map((credit) => { 
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.addCredit({
      id: props.credits.length + 1,
      amount: Number(e.target.amount.value),
      description: e.target[1].value,
      date: new Date().toJSON()
    });
  }

  return (
    <div>
      <h1>Credits</h1>
      {viewCredits()}
      <br/>

      <form onSubmit={onSubmit}>
        <label>Amount</label>
        <input type="number" name="amount" step="any"/>
        <label>Description</label>
        <input type="text" name="description "/>
        <button type="submit" >Add Credit</button>
      </form>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;