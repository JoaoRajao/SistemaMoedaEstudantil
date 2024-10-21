using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MoedaEstudantil.Data;
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
        services.AddScoped<VantagemService>();
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
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}