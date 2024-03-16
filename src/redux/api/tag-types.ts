export enum tagTypes {
  user = "user",
  cheque = "cheque",
  expenses = "expenses",
  expenseFilter = "expenseFilter",
  draftBill = "draftBill",
  draftSingleBill = "draftSingleBill",
  deleteSingleBill = "deleteSingleBill",
  updateSingleBill = "updateSingleBill",
  fiscalYear = "fiscalYear",
}

export const tagTypesList = [
  tagTypes.expenseFilter,
  tagTypes.expenses,
  tagTypes.user,
  tagTypes.cheque,
  tagTypes.draftBill,
  tagTypes.draftSingleBill,
  tagTypes.deleteSingleBill,
  tagTypes.updateSingleBill,
  tagTypes.fiscalYear,
];
