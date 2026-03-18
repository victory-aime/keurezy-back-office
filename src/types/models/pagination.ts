interface IPaginatedResponse<T, K = T[]> {
  content: K;
  totalDataPerPages: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export type { IPaginatedResponse };
