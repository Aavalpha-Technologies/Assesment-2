var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add OpenAPI/Swagger
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

// ----- ENABLE CORS FOR FRONTEND -----
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:5173") // तुझा frontend address
            .AllowAnyHeader()
            .AllowAnyMethod());
});
// ------------------------------------

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS policy
app.UseCors("AllowFrontend");

app.UseHttpsRedirection(); // optional, HTTP frontend साठी redirect करेल तर fetch fetch://error येऊ शकते

app.UseAuthorization();

app.MapControllers();

app.Run();
