using GameCurationFrameworkReact.Server.Helpers;
using Microsoft.Azure.Cosmos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddMemoryCache();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSingleton(sp => {
    var configuration = sp.GetRequiredService<IConfiguration>();

    var endpoint = configuration["CosmosDb:AccountEndpoint"];
    var key = configuration["CosmosDb:AccountKey"];

    return new CosmosClient(endpoint, key);
});

builder.Services.AddScoped<GameDataService>();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if(app.Environment.IsDevelopment()) {
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();