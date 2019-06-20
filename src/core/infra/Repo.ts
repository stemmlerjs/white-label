
export interface Repo<T> {
  exists (t: T): Promise<boolean>;
  getById (id: string): Promise<T>;
  save (t: T): Promise<any>;
}

// interface IJobRepo extends Repo<Job> {

// }

// class JobRepo implements IJobRepo {

// }