using WebApi;
using WebApi.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<SamplesGeneratorConfiguration>(builder.Configuration.GetSection("SamplesGenerator"));
builder.Services.AddHostedService<SamplesGenerator>();
builder.Services.AddSignalR();
builder.Services.AddCors(c => c.AddDefaultPolicy(b => b.WithOrigins(origins: builder.Configuration.GetSection("AllowedOrigins").Get<string[]>())
                .AllowAnyHeader()
                .WithMethods("GET", "POST")
                .AllowCredentials()));

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.MapHub<RandomSamplesHub>("/samples");
app.Run("http://+:5001");
