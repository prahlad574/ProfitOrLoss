namespace ProfitOrLossBackend.Models
{
    public class Sale
    {
        public required string SaleId { get; set; }

        public string? ShareCompany { get; set; }

        public int? CostPrice { get; set; }

        public int? SellingPrice { get; set; }

        public int? ProfitOrLoss { get; set; }

        public required string FinancialYear { get; set; }
    }
}
