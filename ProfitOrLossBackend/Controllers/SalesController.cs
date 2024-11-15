using Microsoft.AspNetCore.Mvc;
using ProfitOrLossBackend.Services.Interfaces;

namespace ProfitOrLossBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISalesService _salesService;

        public SalesController(ISalesService salesService)
        {
            _salesService = salesService;
        }

        [HttpPost]
        [Route("/UpdateSale")]
        public async Task<ActionResult> UpdateSale([FromBody] SaleChange saleChange)
        {
           await _salesService.UpdateSale(saleChange);
            return Ok();
        }

        [HttpGet]
        [Route("/getSalesForFinancialYear/{financialYear}")]
        public async Task<ActionResult<List<Sale>>> GetSalesForFinancialYear(string financialYear)
        {
            return Ok( await _salesService.GetSalesForFinancialYear(financialYear));
        }

        [HttpGet]
        [Route("/getSalesSummaryForFinacialYear/{financialYear}")]
        public async Task<ActionResult<List<SaleSummaryEntity>>> GetSalesSummaryForFinancialYear(string financialYear)
        {
            return Ok(await _salesService.GetSalesSummaryForFinancialYear(financialYear));
        }
    }
}
