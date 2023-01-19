import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const contentDb = await openDB('jate', 1);
  const tx = contentDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ id: 1, content: content })
  const result = await request;
  
  console.log('Data saved!', result);
};

export const getDb = async () => {
  const contentDb = await openDB('jate', 1);
  const tx = contentDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;

  console.log('Result:', result);
  return result;
};

initdb();
