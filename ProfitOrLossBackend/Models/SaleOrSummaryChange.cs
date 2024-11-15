namespace ProfitOrLossBackend.Models
{
    public class SaleOrSummaryChange
    {
        public required SaleEntity Sale {  get; set; }

        public required SaleSummaryEntity SaleSummary { get; set; }
    }
}
