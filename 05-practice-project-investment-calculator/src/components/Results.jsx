import { calculateInvestmentResults, formatter } from '../util/investment.js';



export default function Results({ invenstmentVals }) {
        console.log("invenstmentVals: ", invenstmentVals);

        const invenstmentResults = calculateInvestmentResults(invenstmentVals);
        console.log("invenstmentResults: ", invenstmentResults);

        const initialInvestment = invenstmentResults[0].valueEndOfYear - invenstmentResults[0].interest - invenstmentResults[0].annualInvestment;

        return (
                <div>
                        <table id="result">
                                <thead>
                                        <tr>
                                                <th>Year</th>
                                                <th>Investment Value</th>
                                                <th>Interest (Year)</th>
                                                <th>Investment Capital</th>
                                                <th>Invested Capital</th>
                                        </tr>
                                </thead>

                                <tbody>
                                        {invenstmentResults.map((result) => {
                                                const totalInterest = result.valueEndOfYear - result.annualInvestment * result.year - initialInvestment;
                                                const totalAmountInvested = result.valueEndOfYear - totalInterest;
                                                return (
                                                        <tr key={result.year}>
                                                                <td>{result.year}</td>
                                                                <td>{formatter.format(result.valueEndOfYear)}</td>
                                                                <td>{formatter.format(result.interest)}</td>
                                                                <td>{formatter.format(totalInterest)}</td>
                                                                <td>{formatter.format(totalAmountInvested)}</td>
                                                        </tr>
                                                )
                                        }
                                        )}
                                </tbody>

                        </table>
                </div>
        );

}