import { useEffect, useReducer, useState } from 'react';
import './App.css';

const getRandomNumberByUrl = async (): Promise<number> => {
  const res = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
  );

  //throw new Error('Auxilio');

  const numberString = await res.text();
  return +numberString;
};

function App() {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getRandomNumberByUrl()
      .then(setRandomNumber)
      .catch((error) => setError(error.message));
  }, [key]);

  useEffect(() => {
    if (randomNumber) setIsLoading(false);
  }, [randomNumber]);

  useEffect(() => {
    if (error) setIsLoading(false);
  }, [error]);

  return (
    <>
      <div className="card">
        {isLoading ? (
          <h2>Cargando...</h2>
        ) : (
          !error && <h2> Random number is {randomNumber}</h2>
        )}
        {!isLoading && error && <h3>{error}</h3>}
      </div>
      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? '...' : 'New number'}
      </button>
    </>
  );
}

export default App;
