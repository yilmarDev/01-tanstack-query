import { useEffect, useState } from 'react';
import './App.css';

const getRandomNumberByUrl = async (): Promise<number> => {
  const res = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
  );

  const numberString = await res.text();
  return +numberString;
};

function App() {
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    getRandomNumberByUrl().then((number) => setRandomNumber(number));
  }, []);

  return (
    <>
      <div className="card">
        <button onClick={() => setRandomNumber((count) => count + 1)}>
          Random number is {randomNumber}
        </button>
      </div>
    </>
  );
}

export default App;
