namespace ProfitOrLossBackend.Services.Interfaces
{
    public interface ISalesService
    {
        Task UpdateSale(SaleChange sale);

        Task<List<SaleEntity>> GetSalesForFinancialYear(string financialYear);

        Task<List<SaleSummaryEntity>> GetSalesSummaryForFinancialYear(string financialYear);

    }
}
