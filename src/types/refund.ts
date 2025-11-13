import type { Receipt } from '@/types/receipt';

interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface BaseResponse<T> {
  meta: Meta;
  data: T[];
}

export interface Refund {
  id: string;
  title: string;
  category: string;
  value: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  receipt: Receipt;
}
