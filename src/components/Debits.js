/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {

  let viewDebits = () => {
    const { debits } = props;
    return debits.map((debit) => { 
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.addDebit({
      id: props.debits.length + 1,
      amount: Number(e.target.amount.value),
      description: e.target[1].value,
      date: new Date().toJSON()
    });
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {viewDebits()}

      <form onSubmit={onSubmit}>
        <br/>
        <label>Amount</label>
        <input type="number" name="amount" step="any"/>
        <label>Description</label>
        <input type="text" name="description "/>
        <button type="submit" >Add Debit</button>
      </form>
      <br/>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;