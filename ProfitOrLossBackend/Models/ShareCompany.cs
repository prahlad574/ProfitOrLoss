namespace ProfitOrLossBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class ShareCompany
    {
        [Column("ShareCompanyId")]
        [Required]
        [Key]
        public Guid ShareCompanyId { get; set; }

        [Column("ShareCompanyName")]
        [MaxLength(100)]
        public string? ShareCompanyName { get; set; }

    }
}
