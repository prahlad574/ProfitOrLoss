using Microsoft.AspNetCore.SignalR;
using ProfitOrLossBackend.Services.Interfaces;
using ProfitOrLossBackend.SignalR;

namespace ProfitOrLossBackend.Services
{
    public class SalesService: ISalesService
    {
        private readonly ProfitOrLossContext _profitOrLossContext;
        private readonly IHubContext<SaleHub> _saleHubContext;

        public SalesService(ProfitOrLossContext profitOrLossContext, IHubContext<SaleHub> saleHubContext)
        {
            _profitOrLossContext = profitOrLossContext;
            _saleHubContext = saleHubContext;
        }

        public async Task UpdateSale(SaleChange sale) 
        {
            var saleId = sale.SaleId != null ? Guid.Parse(sale.SaleId) : Guid.NewGuid();
            var saleFromDb =  await _profitOrLossContext.Sale.FindAsync(saleId);
            var saleSummaryFromDb =  await _profitOrLossContext.SaleSummary.FirstOrDefaultAsync(x => x.FinancialYear == sale.FinancialYear && x.ShareCompany == sale.ShareCompany);
            var saleSummaryId = saleSummaryFromDb != null ? saleSummaryFromDb.SaleSummaryId: Guid.NewGuid();
            if (saleFromDb == null)
            {
                await _profitOrLossContext.AddRangeAsync(new SaleEntity
                {
                    SaleId = saleId,
                    CostPrice = sale.CostPrice,
                    SellingPrice = sale.SellingPrice,
                    FinancialYear = sale.FinancialYear,
                    ProfitOrLoss = sale.ProfitOrLoss,
                    ShareCompany = sale.ShareCompany
                });
               
            }
            else
            {
                saleFromDb.ShareCompany = sale.ShareCompany;
                saleFromDb.CostPrice = sale.CostPrice;
                saleFromDb.SellingPrice = sale.SellingPrice;
                saleFromDb.ProfitOrLoss = sale.ProfitOrLoss;
            }

            if(saleSummaryFromDb != null)
            {
                await UpdateSaleSummary(sale, saleSummaryFromDb);
            }
            else
            {
                await CreateSaleSummary(sale, saleSummaryId);
            }  

            await _profitOrLossContext.SaveChangesAsync();
            await PublishMessage(saleId, saleSummaryId, sale.FinancialYear);
        }

        public async Task<List<SaleEntity>> GetSalesForFinancialYear(string financialYear)
        {
            return await _profitOrLossContext.Sale.Where(x => x.FinancialYear == financialYear).ToListAsync();
        }

        public async Task<List<SaleSummaryEntity>> GetSalesSummaryForFinancialYear(string financialYear)
        {
            return await _profitOrLossContext.SaleSummary.Where(x => x.FinancialYear == financialYear).ToListAsync();
        }

        private async Task CreateSaleSummary(SaleChange sale, Guid saleSummaryId) 
        {
            var saleSummary = new SaleSummaryEntity
            {
                SaleSummaryId = saleSummaryId,
                CostPrice = sale.CostPrice,
                SellingPrice = sale.SellingPrice,
                FinancialYear = sale.FinancialYear,
                ProfitOrLoss = sale.ProfitOrLoss,
                ShareCompany = sale.ShareCompany,
            };
            await _profitOrLossContext.AddRangeAsync(saleSummary);
            
        }

        private  async Task UpdateSaleSummary(SaleChange sale, SaleSummaryEntity saleSummaryFromDb) 
        {
            var sales = await _profitOrLossContext.Sale.Where(x => x.FinancialYear == sale.FinancialYear && x.ShareCompany == sale.ShareCompany).ToListAsync();
            switch (sale.ColumnChanged)
            {
            case "costPrice":
                    saleSummaryFromDb.CostPrice = sales.Sum(x=> x.CostPrice);
                    saleSummaryFromDb.ProfitOrLoss = sales.Sum(x=> x.ProfitOrLoss);
                    break;
            case "sellingPrice":
                    saleSummaryFromDb.SellingPrice = sales.Sum(x => x.SellingPrice);
                    saleSummaryFromDb.ProfitOrLoss = sales.Sum(x => x.ProfitOrLoss);
                    break;
            }

        }

        private async Task PublishMessage(Guid saleId, Guid saleSummaryId, string financialYear)
        {
            var sale = await _profitOrLossContext.Sale.FindAsync(saleId);
            var saleSummary = await _profitOrLossContext.SaleSummary.FindAsync(saleSummaryId);
            if(sale != null && saleSummary != null) {
                var message = new SaleOrSummaryChange
                {
                    Sale = sale,
                    SaleSummary = saleSummary
                };
                await _saleHubContext.Clients.All.SendAsync("SaleAndSummaryUpdated-" + financialYear, message);
            }
        }
    }
}
