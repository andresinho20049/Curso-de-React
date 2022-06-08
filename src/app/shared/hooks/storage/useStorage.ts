import { useCallback, useState } from 'react';
import storage from './storage';

/**
 * Hook personalizado para funcionar semelhante ao useState
 * porem, ela armazena o valor setado tbm no storage do browser
 * assim o valor da variavel não se perde ao fechar browser ou apos refresh 
 */
export const useStorage = (key:any) => {
  const [state, setState] = useState(() => storage.get(key));

  const set = useCallback((newValue: any) => {
    storage.set(key, newValue);
    setState(newValue);
  }, [key]);

  const remove = useCallback(() => {
    storage.remove(key);
    setState(undefined);
  }, [key]);

  return [state, set, remove];
}