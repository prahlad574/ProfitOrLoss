using Microsoft.AspNetCore.Http;
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

        //[HttpPost]
        //[Route("/AddFinancialYear")]
        //public async Task<ActionResult> AddFinancialYear(FinancialYear financialYear)
        //{
        //    return;
        //}

        //[HttpPost]
        //[Route("/AddShareCompany")]
        //public async Task<ActionResult> AddShareCompany(ShareCompany shareCompany)
        //{
        //    return;
        //}

        //[HttpPut]
        //[Route("/UpdateFinancialYear")]
        //public async Task<ActionResult> UpdateFinancialYear(FinancialYear financialYear)
        //{
        //    return;
        //}

        //[HttpPut]
        //[Route("/UpdateShareCompany")]
        //public async Task<ActionResult> UpdateShareCompany(ShareCompany shareCompany)
        //{
        //    return;
        //}

        //[HttpDelete]
        //[Route("/UpdateShareCompany")]
        //public async Task<DeleteFinancialYear> DeleteFinancialYear(int id)
        //{
        //    return;
        //}

        //[HttpDelete]
        //[Route("/DeleteShareCompany")]
        //public async Task<ActionResult> DeleteShareCompany(int id)
        //{
        //    return;
        //}
    }
}
