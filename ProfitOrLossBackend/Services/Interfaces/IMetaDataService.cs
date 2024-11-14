using Microsoft.AspNetCore.Mvc;

namespace ProfitOrLossBackend.Services.Interfaces
{
    public interface IMetaDataService
    {
        Task AddFinancialYear(FinancialYear financialYear);

        Task<List<ShareCompany>> GetShareCompany();

        Task<List<FinancialYear>> GetFinancialYear();

        Task AddShareCompany(ShareCompany shareCompany);

        Task UpdateFinancialYear( FinancialYear financialYear);

        Task UpdateShareCompany(ShareCompany shareCompany);

        Task DeleteFinancialYear(Guid financialYearId);

        Task DeleteShareCompany(Guid shareCompanyId);
    }
}
