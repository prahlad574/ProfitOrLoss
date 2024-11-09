namespace ProfitOrLossBackend.Services.Interfaces
{
    public interface ISalesService
    {
        void UpdateSale(SaleChange sale);

        Task<List<SaleEntity>> GetSalesForFinancialYear(string financialYear);

        Task<List<SaleSummaryEntity>> GetSalesSummaryForFinancialYear(string financialYear);

    }
}
