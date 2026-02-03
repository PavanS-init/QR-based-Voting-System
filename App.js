import React, { useState } from "react";
import axios from "axios";

function App() {
  const [candidate, setCandidate] = useState("");

  const submitVote = async () => {
    await axios.post("http://localhost:5000/cast-vote", {
      candidate
    });
    alert("Vote submitted successfully");
  };

  return (
    <div>
      <h2>QR Code Based Online Voting System</h2>

      <select onChange={(e) => setCandidate(e.target.value)}>
        <option value="">Select Candidate</option>
        <option value="Candidate A">Candidate A</option>
        <option value="Candidate B">Candidate B</option>
      </select>

      <br /><br />
      <button onClick={submitVote}>Submit Vote</button>
    </div>
  );
}

export default App;