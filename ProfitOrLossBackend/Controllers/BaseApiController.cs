using Microsoft.AspNetCore.Mvc;
using ProfitOrLossBackend.Services.Interfaces;

namespace ProfitOrLossBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private readonly IMetaDataService _metaDataService;

        public BaseApiController(IMetaDataService metaDataService)
        {
            _metaDataService = metaDataService;
        }

        [HttpGet]
        [Route("/GetShareCompany")]
        public async Task<ActionResult<List<ShareCompany>>> GetShareCompany()
        {
            return Ok(await _metaDataService.GetShareCompany());
        }

        [HttpGet]
        [Route("/GetFinancialYear")]
        public async Task<ActionResult<List<FinancialYear>>> GetFinancialYear()
        {
            return Ok(await _metaDataService.GetFinancialYear());
        }

        [HttpPost]
        [Route("/AddFinancialYear")]
        public async Task<ActionResult> AddFinancialYear([FromBody] FinancialYear request)
        {
            await _metaDataService.AddFinancialYear(request);
            return Ok();
        }

        [HttpPost]
        [Route("/AddShareCompany")]
        public async Task<ActionResult> AddShareCompany([FromBody] ShareCompany shareCompany)
        {
            await _metaDataService.AddShareCompany(shareCompany);
            return Ok();
        }

        [HttpPut]
        [Route("/UpdateFinancialYear")]
        public async Task<ActionResult> UpdateFinancialYear([FromBody] FinancialYear financialYear)
        {
            await _metaDataService.UpdateFinancialYear(financialYear);
            return Ok();
        }

        [HttpPut]
        [Route("/UpdateShareCompany")]
        public async Task<ActionResult> UpdateShareCompany([FromBody] ShareCompany shareCompany)
        {
            await _metaDataService.UpdateShareCompany(shareCompany);
            return Ok();
        }

        [HttpDelete]
        [Route("/DeleteFinancialYear/{financialYearId}")]
        public async Task<ActionResult> DeleteFinancialYear(string financialYearId)
        {
            await _metaDataService.DeleteFinancialYear(Guid.Parse(financialYearId));
            return Ok();
        }

        [HttpDelete]
        [Route("/DeleteShareCompany/{shareCompanyId}")]
        public async Task<ActionResult> DeleteShareCompany(string shareCompanyId)
        {
            await _metaDataService.DeleteShareCompany(Guid.Parse(shareCompanyId));
            return Ok();
        }
    }
}
