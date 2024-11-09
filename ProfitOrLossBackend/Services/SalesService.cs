using ProfitOrLossBackend.Services.Interfaces;

namespace ProfitOrLossBackend.Services
{
    public class SalesService: ISalesService
    {
        private readonly ProfitOrLossContext _profitOrLossContext;

        public SalesService(ProfitOrLossContext profitOrLossContext)
        {
            _profitOrLossContext = profitOrLossContext;
        }

        public void UpdateSale(SaleChange sale) 
        {

            var saleId = sale.SaleId != null ? Guid.Parse(sale.SaleId) : Guid.NewGuid();
            var saleFromDb =  _profitOrLossContext.Sale.Find(saleId);
            var saleSummaryFromDb =  _profitOrLossContext.SaleSummary.FirstOrDefault(x => x.FinancialYear == sale.FinancialYear && x.ShareCompany == sale.ShareCompany);
            if (saleFromDb == null)
            {
                _profitOrLossContext.AddRange(new SaleEntity
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
                UpdateSaleSummary(sale, saleSummaryFromDb);
            }
            else
            {
                CreateSaleSummary(sale);
            }  

             _profitOrLossContext.SaveChanges();
            
        }

        public async Task<List<SaleEntity>> GetSalesForFinancialYear(string financialYear)
        {
            return await _profitOrLossContext.Sale.Where(x => x.FinancialYear == financialYear).ToListAsync();
        }

        public async Task<List<SaleSummaryEntity>> GetSalesSummaryForFinancialYear(string financialYear)
        {
            return await _profitOrLossContext.SaleSummary.Where(x => x.FinancialYear == financialYear).ToListAsync();
        }

        private void CreateSaleSummary(SaleChange sale) 
        {
            var saleSummary = new SaleSummaryEntity
            {
                SaleSummaryId = Guid.NewGuid(),
                CostPrice = sale.CostPrice,
                SellingPrice = sale.SellingPrice,
                FinancialYear = sale.FinancialYear,
                ProfitOrLoss = sale.ProfitOrLoss,
                ShareCompany = sale.ShareCompany,
            };
            _profitOrLossContext.AddRange(saleSummary);
        
        }

        private void UpdateSaleSummary(SaleChange sale, SaleSummaryEntity saleSummaryFromDb) 
        {
            var sales = _profitOrLossContext.Sale.Where(x => x.FinancialYear == sale.FinancialYear && x.ShareCompany == sale.ShareCompany).ToList();
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

       
    }
}
