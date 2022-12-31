using Microsoft.AspNetCore.SignalR;
using WebApi.Model;

namespace WebApi.Hubs;

public interface ISamplesHub
{
    Task Update(Sample data);
}

public class RandomSamplesHub : Hub<ISamplesHub>
{
    public async Task Update(Sample data)
    {
        await Clients.All.Update(data);
    }

    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        return base.OnDisconnectedAsync(exception);
    }
}
