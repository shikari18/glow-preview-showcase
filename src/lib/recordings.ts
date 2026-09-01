export type Recording = {
  id: string;
  title: string;
  createdAt: number;
  durationMs: number;
  mimeType: string;
  transcript: string;
  blob: Blob;
};

const DB_NAME = "examglow-recordings";
const STORE = "recordings";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(STORE, mode);
        const request = run(transaction.objectStore(STORE));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        transaction.oncomplete = () => db.close();
      }),
  );
}

export async function listRecordings(): Promise<Recording[]> {
  if (typeof indexedDB === "undefined") return [];
  const all = await tx<Recording[]>("readonly", (store) => store.getAll() as IDBRequest<Recording[]>);
  return all.sort((a, b) => b.createdAt - a.createdAt);
}

export async function saveRecording(recording: Recording): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  await tx("readwrite", (store) => store.put(recording) as IDBRequest<IDBValidKey>);
}

export async function deleteRecording(id: string): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  await tx("readwrite", (store) => store.delete(id) as IDBRequest<undefined>);
}

export function formatDuration(ms: number): string {
  const total = Math.round(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
