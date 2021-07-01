import axios from 'axios';
import React from 'react';

export function Fib() {
  const [seenIndexes, setSeenIndexes] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [index, setIndex] = React.useState('');

  React.useEffect(() => {
    axios.get('/api/values/current').then(({ data }) => setValues(data));
  }, []);
  React.useEffect(() => {
    axios.get('/api/values/all').then(({ data }) => {
      console.log(data);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await axios.post('/api/values', {
      index,
    });
    setIndex('');
  }

  function renderSeenIndexes() {
    if (seenIndexes.length)
      setSeenIndexes(seenIndexes.map((index) => index.number).join(', '));
  }

  function renderValues() {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
}
