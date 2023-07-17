function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="secondary"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-dark" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Make Another Deposit
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
      
  function handle(){
    console.log(email,amount);
    fetch(`/account/update`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, amount: amount, balance: 0})
    });
    (async () => {
      var res  = await fetch('');
      var data = await res.json();    
      console.log(data);
  })();
    props.setShow(false);
    props.setStatus('');
  }

  return(<>
    Email<br/>
    <input type="text" 
      className="form-control" 
      placeholder="Enter email" 
      value={email}
      onChange={e => setEmail(e.currentTarget.value)}/><br/>
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount}
      onChange={e => setAmount(e.currentTarget.value)}/><br/>
    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}>Deposit</button>
  </>);
}