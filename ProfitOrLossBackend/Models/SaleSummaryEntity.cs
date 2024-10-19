using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfitOrLossBackend.Models
{
    [Table("SaleSummary")]
    public class SaleSummaryEntity
    {
        [Column("SaleSummaryId")]
        [Required]
        [Key]
        public Guid SaleSummaryId { get; set; }

        [Column("ShareCompany")]
        [MaxLength(100)]
        public string? ShareCompany { get; set; }

        [Column("CostPrice")]
        public int? CostPrice { get; set; }

        [Column("SellingPrice")]
        public int? SellingPrice { get; set; }

        [Column("ProfitOrLoss")]
        public int? ProfitOrLoss { get; set; }

        [Column("FinancialYear")]
        [Required]
        public required string FinancialYear { get; set; }
    }
}
