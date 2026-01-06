using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
// Backend configured and verified by Aditya Daphal



// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
 
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
      policy =>
      {
          policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod(); 
      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
     
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => "Backend is running. Open /swagger for API documentation.");

app.Run();
