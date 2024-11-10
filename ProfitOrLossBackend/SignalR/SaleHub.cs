using Microsoft.AspNetCore.SignalR;

namespace ProfitOrLossBackend.SignalR
{
    public class SaleHub : Hub
    {
        public async Task SendAsync(string key, object message)
        {
            await Clients.All.SendAsync(key, message);
        }
    }
}
