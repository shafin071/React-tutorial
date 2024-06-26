

export default function UserInput({invenstmentVals, handleChange}) {

        return (
                <>
                        <section id="user-input">
                                <div className="input-group">
                                        <p>
                                                <label>Initial Investment</label>
                                                <input id="initialInvestment" type="number" required value={invenstmentVals.initialInvestment}
                                                onInput={handleChange}
                                        ></input>
                                        </p>
                                        <p>
                                                <label>Annual Investment</label>
                                                <input id="annualInvestment" type="number" required value={invenstmentVals.annualInvestment}
                                                onInput={handleChange}></input>
                                        </p>
                                </div>

                                <div className="input-group">
                                        <p>
                                                <label>Expected Return</label>
                                                <input id="expectedReturn" type="number" required value={invenstmentVals.expectedReturn}
                                                onInput={handleChange}></input>
                                        </p>
                                        <p>
                                                <label>Duration</label>
                                                <input id="duration" type="number" required value={invenstmentVals.duration}
                                                onInput={handleChange}></input>
                                        </p>
                                </div>
                        </section>

                </>

        )
}