import { useQuery } from '@tanstack/react-query';

const getRandomNumberByUrl = async (): Promise<number> => {
  const res = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
  );

  // throw new Error('Auxilio!!!');
  const numberString = await res.text();
  return +numberString;
};

export const useRandom = () => {
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: getRandomNumberByUrl,
  });

  return query;
};
