import CreditCard from "./credit-card/CreditCard"

const App = () => {
  return (
    <div className="App">
      <CreditCard onSubmit={(c) => fetch(
        '/api/payment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(c)
        }
      )}
      />
    </div>
  )
}

export default App
