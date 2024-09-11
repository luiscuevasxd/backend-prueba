import { StatusCodes } from '../enum';

export type IFilter<Type = { [Key: string]: number | string | boolean | Date | null }> = {
  [Key in keyof Type]?: Type[Key];
} & {
  search?: string;
  page?: number;
  perPage?: number;
  sortOrder?: 'DESC' | 'ASC';
  sortField?: keyof Type;
};

export type IListReturn<Type = any> = {
  data: Type[];
  metaData: {
    page: number;
    perPage: number;
    totalCount: number;
  };
};

export type IError = {
  error?: {
    message?: string;
    errorCode?: string;
    statusCode: StatusCodes;
    errorDetails?: unknown;
  };
};
