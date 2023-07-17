function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="success"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setStatus={setStatus}/> : 
        <CreateMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Account Created!</h5>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  
  function handle(){
      fetch(`/account/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: name, email: email, password: password})
      })
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus('');
              props.setShow(false);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus(text)
              console.log('err:', text);
          }
      });
    }
  
  return (<>

    Name<br/>
    <input type="text" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="text" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}>Create Account</button>

  </>);
}