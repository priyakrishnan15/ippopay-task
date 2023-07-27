import React, { useState } from "react";
import "./App.css";


function App() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  function isStrongPassword(password) {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isWithinLengthLimits = password.length >= 6 && password.length <= 20;
    const hasNoRepeatingChars = !/(.)\1\1/.test(password);
    return hasLowercase && hasUppercase && hasDigit && isWithinLengthLimits && hasNoRepeatingChars;
  }
  function minStepsToStrongPassword(password) {
    if (isStrongPassword(password)) {
      return 0;
    }
    let missingConditions = 0;
    if (!/[a-z]/.test(password)) {
      missingConditions++;
    }
    if (!/[A-Z]/.test(password)) {
      missingConditions++;
    }
    if (!/\d/.test(password)) {
      missingConditions++;
    }
    if (password.length < 6) {
      missingConditions += 6 - password.length;
    } else if (password.length > 20) {
      missingConditions += password.length - 20;
    }
    const repeatingCharsRegex = /(.)\1\1/g;
    let repeatingCharsCount = 0;
    let match;
    while ((match = repeatingCharsRegex.exec(password)) !== null) {
      repeatingCharsCount++;
    }
    missingConditions = Math.max(missingConditions, repeatingCharsCount);
    return missingConditions;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const minSteps = minStepsToStrongPassword(password);
    setResult(minSteps);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Password Strength Program</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="passwordInput">Enter password:</label>
            <input
              type="password"
              id="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Calculate</button>
        </form>
        {result !== null && (
          <div className="result">
            <h2>Result:</h2>
            <p>{`Minimum number of steps required: ${result}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
