export interface IBaseRepository<T> {
  create(item: T): Promise<T>;
  findOne(...args: any): Promise<T>;
}
