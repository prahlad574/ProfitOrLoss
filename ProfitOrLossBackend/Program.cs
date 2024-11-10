global using ProfitOrLossBackend.Models;
global using Microsoft.EntityFrameworkCore;
using ProfitOrLossBackend.Services.Interfaces;
using ProfitOrLossBackend.Services;
using ProfitOrLossBackend.SignalR;
var myAllowSpeificOrigin = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpeificOrigin,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200").AllowAnyHeader()
                                                  .AllowAnyMethod(); ;
                      });
});
// Add services to the container.
builder.Services.AddScoped<ISalesService, SalesService>();

builder.Services.AddControllers();
builder.Services.AddDbContext<ProfitOrLossContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(myAllowSpeificOrigin);
app.UseAuthorization();

app.MapControllers();
app.MapHub<SaleHub>("/saleHub");

app.Run();
