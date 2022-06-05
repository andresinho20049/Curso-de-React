import Cookie from 'js-cookie';

// Safari in incognito has local storage, but size 0
// This system falls back to cookies in that situation
const generateStorage = () => {


  try {
    if (!window.localStorage) {
      throw Error('no local storage');
    }

    // Setup simple local storage wrapper
    const setItem = (key: any, value: any) => localStorage.setItem(key, JSON.stringify(value));
    const getItem = (key: any) => {
      const item = localStorage.getItem(key) || '';
      try {
        return JSON.parse(item);
      } catch (e) {
        return null;
      }
    };
    const removeItem = (key: any) => localStorage.removeItem(key);

    return {
      get: getItem,
      set: setItem,
      remove: removeItem
    }

  } catch (e) {
    console.log('Erro no Storage')
    console.error(e)
    return {
      get: Cookie.get,
      set: Cookie.set,
      remove: Cookie.remove
    }
  }
}

const storage = generateStorage();

export default storage;
