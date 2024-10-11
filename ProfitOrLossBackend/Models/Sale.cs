using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfitOrLossBackend.Models
{
    public class Sale
    {
        [Column("SaleId")]
        [Required]
        [Key]
        public Guid SaleId { get; set; }

        [Column("ShareCompany")]
        [MaxLength(100)]
        public string? ShareCompany { get; set; }

        [Column("CostPrice")]
        public int? CostPrice { get; set; }

        [Column("SellingPrice")]
        public int? SellingPrice { get; set; }

        [Column("ProfitOrLoss")]
        public int? ProfitOrLoss { get; set; }

    }
}
