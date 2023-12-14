import { useQuery } from '@tanstack/react-query';
import './App.css';

const getRandomNumberByUrl = async (): Promise<number> => {
  const res = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
  );

  throw new Error('Auxilio!!!');
  const numberString = await res.text();
  return +numberString;
};

function App() {
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: getRandomNumberByUrl,
  });

  return (
    <>
      <div className="card">
        {query.isFetching ? (
          <h2>Cargando...</h2>
        ) : (
          !query.error && <h2> Random number is {query.data}</h2>
        )}
        {!query.isLoading && query.error && <h3>{query.error.message}</h3>}
      </div>
      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? '...' : 'New number'}
      </button>
    </>
  );
}

export default App;
