// Class for getting/setting in local storage

class StorageHelper {
    private readonly key: string;
  
    constructor(key: string) {
      this.key = key;
    }
  
    public save(data: any) {
      localStorage.setItem(this.key, JSON.stringify(data));
    }
  
    public get(): any {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    }
  
    public clear() {
      localStorage.removeItem(this.key);
    }
  }
  
  export default StorageHelper;