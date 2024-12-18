﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MoedaEstudantil.Data;
using MoedaEstudantil.Interfaces.Services;
using MoedaEstudantil.Models;
using MoedaEstudantil.Services;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    // Configura os serviços
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<MeritSystemContext>(options =>
            options.UseMySQL(Configuration.GetConnectionString("DefaultConnection")));

        // Configuração do CORS para permitir requisições do frontend
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigins",
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000") // URL do seu frontend
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
        });

        // Registra as configurações de Email
        services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));

        // Configura o EmailService para injetar as configurações do appsettings.json
        services.AddScoped<EmailService>(sp =>
        {
            var emailSettings = sp.GetRequiredService<IOptions<EmailSettings>>().Value;
            return new EmailService(emailSettings.SmtpHost, emailSettings.SmtpPort, emailSettings.SmtpUsername, emailSettings.SmtpPassword);
        });

        services.AddScoped<AlunoService>();
        services.AddScoped<EmpresaService>();
        services.AddScoped<ProfessorService>();
        services.AddScoped<IPessoaService, PessoaService>();
         services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }

    // Configura o pipeline HTTP
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseRouting();

        // Middleware de CORS
        app.UseCors("AllowAllOrigins");
        app.UseCors(build => build.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
