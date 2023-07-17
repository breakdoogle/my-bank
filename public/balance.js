function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="secondary"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function BalanceMsg(props){
  const [balance, setBalance] = React.useState('');

  return(<>
    <input type="input"
      className="form-control"
      placeholder="Balance"
      value={balance}
      onChange={e => setBalance(e.currentTarget.value)}/><br/>
    <button type="submit" 
      className="btn btn-dark"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');
  
  function handle(){
    console.log(email,balance);
    // const url = `/account/findOne/${email}`;
    fetch(`/account/findOne`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({balance: 0})
    });
    (async () => {
        // var res  = await fetch(url);
        var res  = await fetch('');
        var data = await res.json();    
        console.log(data);        
    })();
    props.setShow(false);
    props.setStatus('');
    setBalance(balance);
  }

  return (<>
    Email<br/>
    <input type="text" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}>
        Check Balance
    </button>
  </>);
}