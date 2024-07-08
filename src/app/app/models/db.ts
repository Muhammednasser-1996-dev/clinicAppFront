import { Encryption } from './encryption';
import { Compresser } from '../helpers/compresser';

export class DB {
  private static CACHE_KEY = 'cashier_';

  // Example in-memory cache for server-side storage
  private static inMemoryCache: { [key: string]: any } = {};

  /**
   * Store data using a storage mechanism that works both in browser and server.
   * In this example, we use a simple in-memory cache. Replace with your preferred server-side storage solution.
   *
   * @param key Storage key
   * @param data Data to store
   * @param crypt Whether to encrypt the data
   */
  public static set(key: string, data: any, crypt = false): void {
    data = JSON.stringify(data);

    // Encrypt data if requested
    if (crypt) {
      data = Encryption.encrypt(data);
    }

    const compressedData = Compresser.compress(data);

    if (typeof window !== 'undefined' && window.localStorage) {
      // Client-side: Use localStorage
      localStorage.setItem(DB.CACHE_KEY + key, compressedData);
    } else {
      // Server-side: Implement server-side storage logic (e.g., in-memory cache, database, etc.)
      DB.inMemoryCache[DB.CACHE_KEY + key] = compressedData;
    }
  }

  /**
   * Remove data from storage.
   *
   * @param key Storage key
   */
  public static remove(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Client-side: Use localStorage
      localStorage.removeItem(DB.CACHE_KEY + key);
    } else {
      // Server-side: Implement server-side storage logic
      delete DB.inMemoryCache[DB.CACHE_KEY + key];
    }
  }

  /**
   * Retrieve data from storage.
   *
   * @param key Storage key
   * @param crypt Whether to decrypt the data
   * @returns Stored data or null if not found
   */
  public static get(key: string, crypt = false): any {
    let data: any = null;

    if (typeof window !== 'undefined' && window.localStorage) {
      // Client-side: Use localStorage
      data = localStorage.getItem(DB.CACHE_KEY + key);
    } else {
      // Server-side: Implement server-side storage logic
      data = DB.inMemoryCache[DB.CACHE_KEY + key];
    }

    if (data) {
      // Decompress data
      data = Compresser.decompress(data);

      // Decrypt data if requested
      if (crypt) {
        data = Encryption.decrypt(data);
      }

      return JSON.parse(data);
    }

    return null;
  }

  /**
   * Check if data exists in storage.
   *
   * @param key Storage key
   * @returns True if data exists, false otherwise
   */
  public static has(key: string): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Client-side: Use localStorage
      const data = localStorage.getItem(DB.CACHE_KEY + key);
      return data !== null;
    } else {
      // Server-side: Implement server-side storage logic
      return DB.inMemoryCache.hasOwnProperty(DB.CACHE_KEY + key);
    }
  }
}
