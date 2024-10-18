namespace ProfitOrLossBackend.Models
{
    public class ProfitOrLossContext : DbContext 
    {
        public ProfitOrLossContext(DbContextOptions<ProfitOrLossContext> options) : base(options)
        {
        }
        public DbSet<FinancialYear> FinancialYear { get; set; }
        public DbSet<ShareCompany> ShareCompany { get; set; }
        public DbSet<SaleEntity> Sale { get; set; }
        public DbSet<SaleSummaryEntity> SaleSummary { get; set; }
    }
}
