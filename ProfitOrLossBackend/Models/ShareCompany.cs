namespace ProfitOrLossBackend.Models
{
    using System.ComponentModel.DataAnnotations;
    public class ShareCompany
    {
        [Key]
        public int ShareCompanyId { get; set; }
        public string? ShareCompanyName { get; set; }

    }
}
