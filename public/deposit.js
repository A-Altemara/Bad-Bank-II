function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ?
        <DepositForm setShow={setShow} setStatus={setStatus} /> :
        <DepositMsg setShow={setShow} />}
    />
  )
}

function DepositMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => props.setShow(true)}>
      Deposit again
    </button>
  </>);
}

function DepositForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle() {
    const url = `/account/deposit/${email}/${amount}`;
    (async () => {
      let res = await fetch(url);
      let balance = await res.json();
      if (balance === null) {
        props.setStatus('Email not found')
      } else {
        props.setStatus(`Your new balance is: ${balance}`);
        props.setShow(false);
      }
    })();
  }

  return (<>

    Email<br />
    <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />

    Amount<br />
    <input type="number"
      className="form-control"
      placeholder="Enter amount"
      value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br />

    <button type="submit"
      className="btn btn-light"
      onClick={handle}>Deposit</button>

  </>);
}