function Balance() {
  const ctx = React.useContext(UserContext);
  const isLoggedIn = ctx.currentUser !== null;
  const [show, setShow] = React.useState(isLoggedIn);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} /> :
        <BalanceMsg setShow={setShow} />}
    />
  )

}

function BalanceMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => props.setShow(true)}>
      Check balance again
    </button>
  </>);
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');

  function handle() {
    const url = `/account/balance/${email}`;
    (async () => {
      let res = await fetch(url);
      let balance = await res.json();
      console.log(balance);
      if (balance === null) {
        props.setStatus('Email not found')
      } else {
        setBalance(balance);
        props.setStatus(`Your balance is: ${balance}`);
        props.setShow(false);
      }
    })();
  }

  return (<>

    Email<br />
    <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)} /><br />

    <button type="submit"
      className="btn btn-light"
      onClick={handle}>
      Check Balance
    </button>

  </>);
}