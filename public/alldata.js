function AllData(){
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  
  return (
    <Card
      bgcolor="warning"
      header="All Data"
      status={status}
      body={show ?
        <AllDataForm setShow={setShow} setStatus={setStatus}/> :
        <AllDataMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function AllDataForm(){
  const ctx = React.useContext(UserContext);

  function handle(){
    fetch(ctx)
  }
  return (<>

    All Data<br/>
    <input type="input"
      className="form-control"
      placeholder="All Data display"/><br/>

    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}>
        Show All Data
    </button>

    </>);
}