using Microsoft.AspNetCore.SignalR;
using ProfitOrLossBackend.Models;
using ProfitOrLossBackend.Services.Interfaces;
using ProfitOrLossBackend.SignalR;

namespace ProfitOrLossBackend.Services
{
    public class MetadataService : IMetaDataService
    {
        private readonly ProfitOrLossContext _profitOrLossContext;
        private readonly IHubContext<SaleHub> _saleHubContext;

        public MetadataService(ProfitOrLossContext profitOrLossContext, IHubContext<SaleHub> saleHubContext)
        {
            _profitOrLossContext = profitOrLossContext;
            _saleHubContext = saleHubContext;
        }

        public async Task AddFinancialYear(FinancialYear financialYear)
        {
            _profitOrLossContext.FinancialYear.Add(financialYear);
            await _profitOrLossContext.SaveChangesAsync();

            var metaDataChange = new MetaDataChange
            {
                Id = financialYear.FinancialYearId.ToString(),
                MetadataType = MetadataTypeEnum.FinancialYear,
                Name = financialYear.FinancialYearName,
                Operation = OperationEnum.Add,
            };
            await _saleHubContext.Clients.All.SendAsync("AddOrDeleteMetadata", metaDataChange);

        }

        public async Task<List<ShareCompany>> GetShareCompany()
        {
            return await _profitOrLossContext.ShareCompany.ToListAsync();
        }

        public async Task<List<FinancialYear>> GetFinancialYear()
        {
            return await _profitOrLossContext.FinancialYear.ToListAsync();
        }
        
        public async Task AddShareCompany(ShareCompany shareCompany)
        {
            _profitOrLossContext.ShareCompany.Add(shareCompany);
            await _profitOrLossContext.SaveChangesAsync();

            var metaDataChange = new MetaDataChange
            {
                Id = shareCompany.ShareCompanyId.ToString(),
                MetadataType = MetadataTypeEnum.ShareCompany,
                Name = shareCompany.ShareCompanyName,
                Operation = OperationEnum.Add,
            };
            await _saleHubContext.Clients.All.SendAsync("AddOrDeleteMetadata", metaDataChange);
        }

        public async Task UpdateFinancialYear(FinancialYear financialYear)
        {
            var year = await _profitOrLossContext.FinancialYear.FindAsync(financialYear.FinancialYearId);
            if (year != null)
               year.FinancialYearName = financialYear.FinancialYearName;
               await _profitOrLossContext.SaveChangesAsync();
        }

        public async Task UpdateShareCompany(ShareCompany shareCompany)
        {
            var company = await _profitOrLossContext.ShareCompany.FindAsync(shareCompany.ShareCompanyId);
            if (company != null)
                company.ShareCompanyName = company.ShareCompanyName;
                await _profitOrLossContext.SaveChangesAsync();
        }

        public async Task DeleteFinancialYear(Guid financialYearId)
        {
            var year = await _profitOrLossContext.FinancialYear.FindAsync(financialYearId);
            if (year != null)
            {
                _profitOrLossContext.FinancialYear.Remove(year);
                await _profitOrLossContext.SaveChangesAsync();
                var metaDataChange = new MetaDataChange
                {
                    Id = financialYearId.ToString(),
                    MetadataType = MetadataTypeEnum.FinancialYear,
                    Operation = OperationEnum.Delete,
                };
                await _saleHubContext.Clients.All.SendAsync("AddOrDeleteMetadata", metaDataChange);
            }
        }

        public async Task DeleteShareCompany(Guid shareCompanyId)
        {
            var company = await _profitOrLossContext.ShareCompany.FindAsync(shareCompanyId);
            if (company != null)
            {
                _profitOrLossContext.ShareCompany.Remove(company);
                await _profitOrLossContext.SaveChangesAsync();

                var metaDataChange = new MetaDataChange
                {
                    Id = shareCompanyId.ToString(),
                    MetadataType = MetadataTypeEnum.ShareCompany,
                    Operation = OperationEnum.Delete,
                };
                await _saleHubContext.Clients.All.SendAsync("AddOrDeleteMetadata", metaDataChange);
            }
        }
    }
}
