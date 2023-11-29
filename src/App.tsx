import { useState } from "react"
import CreditCard from "./credit-card/CreditCard"

const App = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <div className="App">
      <CreditCard onSubmit={(c) => alert(JSON.stringify(c))} />
    </div>
  )
}

export default App
