/* eslint-disable @typescript-eslint/no-explicit-any */
export {};
// Khai báo kiểu dữ liệu từ backend trả về

declare global {
  interface IBackendRes<T> {
    isSuccess: boolean;
    message: string;
    data: T;
  }

  interface IBackendErrorRes {
    isSuccess: false;
    message: string;
  }

  interface IModelPaginate<T> {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    items: T[];
  }
}
