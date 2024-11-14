namespace ProfitOrLossBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class FinancialYear
    {
        [Column("FinancialYearId")]
        [Required]
        [Key]
        public Guid FinancialYearId { get; set; }

        [Column("FinancialYearName")]
        [MaxLength(100)]
        public string? FinancialYearName { get; set; }
        
    }
}
