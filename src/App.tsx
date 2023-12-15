import { useRandom } from './hooks/useRandom';
import './App.css';

function App() {
  const query = useRandom();
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
