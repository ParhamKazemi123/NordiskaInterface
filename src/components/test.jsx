import React, { useEffect, useState } from 'react';

function VerkComp() {
  const [verks, setVerk] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/verk')
      .then(res => res.json())
      .then(data => setVerk(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th><th>project id</th><th>data</th>
        </tr>
      </thead>
      <tbody>
        {verks.map(verk => (
          <tr key={verk.id}>
            <td>{verk.id}</td><td>{verk.idproject}</td><td>{verk.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VerkComp;
