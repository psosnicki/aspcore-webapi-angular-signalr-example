using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using WebApi.Hubs;

namespace WebApi;

public record Sample(string Id, string Name, int Value);
public class SamplesGeneratorConfiguration {public int Interval { get; init; }}

public class SamplesGenerator : BackgroundService
{
    private readonly IHubContext<RandomSamplesHub, ISamplesHub> _hubContext;
    private readonly SamplesGeneratorConfiguration _samplesDataConfiguration;

    public SamplesGenerator(IHubContext<RandomSamplesHub, ISamplesHub> hubContext, IOptions<SamplesGeneratorConfiguration> samplesDataConfigurationOptions)
    {
        _hubContext = hubContext;
        _samplesDataConfiguration = samplesDataConfigurationOptions.Value
            ?? throw new ArgumentNullException(nameof(SamplesGeneratorConfiguration));
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var counter = 0;
        while (!stoppingToken.IsCancellationRequested)
        {
            await _hubContext.Clients.All.Update(new Sample("samples", counter++.ToString(), RandomNumberGenerator.GetInt32(0, 20)));
            await Task.Delay(_samplesDataConfiguration.Interval, stoppingToken);
        }
    }
}
