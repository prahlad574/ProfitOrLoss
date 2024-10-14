using Microsoft.AspNetCore.Mvc;

namespace ProfitOrLossBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ProfitOrLossContext _profitOrLossContext;
        public SalesController(ProfitOrLossContext profitOrLossContext)
        {
            _profitOrLossContext = profitOrLossContext;
        }

        [HttpPost]
        [Route("/UpdateSale")]
        public async Task<ActionResult> UpdateSale([FromBody] Sale sale)
        {
            var saleId = sale.SaleId != null ? Guid.Parse(sale.SaleId) : Guid.NewGuid();
            var result = await _profitOrLossContext.Sale.FindAsync(saleId);
            if (result == null)
            {
                _profitOrLossContext.Add(new SaleEntity
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
                result.CostPrice = sale.CostPrice;
                result.SellingPrice = sale.SellingPrice;
                result.ProfitOrLoss = sale.ProfitOrLoss;
            }
            await _profitOrLossContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        [Route("/getSalesForFinancialYear/{financialYear}")]
        public async Task<ActionResult<List<Sale>>> GetSalesForFinancialYear(string financialYear)
        {
            return Ok( await _profitOrLossContext.Sale.Where(x => x.FinancialYear == financialYear).ToListAsync());
        }
    }
}
