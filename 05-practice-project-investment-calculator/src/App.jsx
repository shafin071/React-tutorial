import { useState } from "react"

import Header from "./components/Header"
import UserInput from "./components/UserInput"
import Results from "./components/Results"


const InitialInvestmentValues = {
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
}


function App() {
        const [investmentValues, setInvestmentValues] = useState(InitialInvestmentValues)

        function handleInput(e) {
                let inputIdentifier = e.target.id;
                let inputValue = e.target.value;

                setInvestmentValues((prevUserInput) => {
                        return {
                                ...prevUserInput,
                                [inputIdentifier]: Number(inputValue)
                        }
                });
        }

        const inputIsValid = investmentValues.duration >= 1;


        return (
                <>
                        <Header />
                        <UserInput invenstmentVals={investmentValues} handleChange={handleInput} />
                        {!inputIsValid && (
                                <p className="center">Please enter a duration greater than zero.</p>
                        )}
                        {inputIsValid && <Results invenstmentVals={investmentValues} />}
                </>

        )
}

export default App
