export enum BookStatus {
  ON_SHELF = 1,  // 上架
  OFF_SHELF = 2  // 下架
}

export enum BorrowStatus {
  BORROWED = 1,  // 借出中
  RETURNED = 2,  // 已归还
  OVERDUE = 3    // 已超期
}