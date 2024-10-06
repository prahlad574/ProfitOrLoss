using Microsoft.AspNetCore.Mvc;

namespace ProfitOrLossBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private readonly ProfitOrLossContext _profitOrLossContext;
        public BaseApiController(ProfitOrLossContext profitOrLossContext)
        {
            _profitOrLossContext = profitOrLossContext;
        }

        [HttpGet]
        [Route("/GetShareCompany")]
        public async Task<ActionResult<List<ShareCompany>>> GetShareCompany()
        {
            return Ok(await _profitOrLossContext.ShareCompany.ToListAsync());
        }

        [HttpGet]
        [Route("/GetFinancialYear")]
        public async Task<ActionResult<List<FinancialYear>>> GetFinancialYear()
        {
            return Ok(await _profitOrLossContext.FinancialYear.ToListAsync());
        }

        [HttpPost]
        [Route("/AddFinancialYear")]
        public async Task<ActionResult> AddFinancialYear([FromBody] FinancialYear request)
        {
            _profitOrLossContext.FinancialYear.Add(request);
            await _profitOrLossContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("/AddShareCompany")]
        public async Task<ActionResult> AddShareCompany([FromBody] ShareCompany shareCompany)
        {
            _profitOrLossContext.ShareCompany.Add(shareCompany);
            await _profitOrLossContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("/UpdateFinancialYear")]
        public async Task<ActionResult> UpdateFinancialYear([FromBody] FinancialYear financialYear)
        {
            var year = await _profitOrLossContext.FinancialYear.FindAsync(financialYear.FinancialYearId);
            if (year == null)
                return BadRequest();
            year.FinancialYearName =  financialYear.FinancialYearName;        

            return Ok();
        }

        [HttpPut]
        [Route("/UpdateShareCompany")]
        public async Task<ActionResult> UpdateShareCompany([FromBody] ShareCompany shareCompany)
        {
            var company = await _profitOrLossContext.ShareCompany.FindAsync(shareCompany.ShareCompanyId);
            if (company == null)
                return BadRequest();
            company.ShareCompanyName = company.ShareCompanyName;
            await _profitOrLossContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("/DeleteFinancialYear/{financialYearId}")]
        public async Task<ActionResult> DeleteFinancialYear(int financialYearId)
        {
            var year = await _profitOrLossContext.FinancialYear.FindAsync(financialYearId);
            if (year == null)
                return BadRequest();
            _profitOrLossContext.FinancialYear.Remove(year);
            await _profitOrLossContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("/DeleteShareCompany/{shareCompanyId}")]
        public async Task<ActionResult> DeleteShareCompany(int shareCompanyId)
        {
            var company = await _profitOrLossContext.ShareCompany.FindAsync(shareCompanyId);
            if (company == null)
                return BadRequest();
            _profitOrLossContext.ShareCompany.Remove(company); 
            await _profitOrLossContext.SaveChangesAsync();
            return Ok();
        }
    }
}
