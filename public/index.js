function Spa() {
  const [data, setData] = React.useState(null);
  return (
    <HashRouter>
      {
      <React.Fragment>
        <UserContext.Provider value={data}>
        <NavBar setData={setData}/>        
          <div className="container text-center" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </React.Fragment>
      }
    </HashRouter>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Spa/>);