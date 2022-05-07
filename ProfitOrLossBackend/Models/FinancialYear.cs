namespace ProfitOrLossBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    public class FinancialYear
    {
        [Key]
        public int FinancialYearId { get; set; }
        public string? FinancialYearName { get; set; }
        
    }
}
