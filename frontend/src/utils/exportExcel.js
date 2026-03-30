import * as XLSX from 'xlsx';

export const exportTransactionsToExcel = (transactions, filename = "Transactions.xlsx") => {
  const data = transactions.map(t => ({
    Date: new Date(Number(t.date)).toLocaleDateString(),
    Amount: t.amount,
    Account: t.account ? t.account.name : (t.fromAccount && t.toAccount ? `${t.fromAccount.name} -> ${t.toAccount.name}` : ""),
    Type: t.type,
    Category: t.category ? t.category.name : "",
    "Transaction Description": t.description || ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Custom column widths
  const columnWidths = [
    { wch: 15 }, // Date
    { wch: 12 }, // Amount
    { wch: 20 }, // Account
    { wch: 10 }, // Type
    { wch: 15 }, // Category
    { wch: 30 }  // Description
  ];
  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
  
  XLSX.writeFile(workbook, filename);
};

export const exportReportsToExcel = (reportData, filename = "Reports.xlsx") => {
  const worksheet = XLSX.utils.json_to_sheet(reportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
  
  XLSX.writeFile(workbook, filename);
};
