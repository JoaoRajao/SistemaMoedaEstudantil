using Microsoft.EntityFrameworkCore;
using MoedaEstudantil;
using MoedaEstudantil.Data;

namespace MoedaEstudantil
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Instância da classe Startup
            var startup = new Startup(builder.Configuration);

            // Chama o método ConfigureServices do Startup
            startup.ConfigureServices(builder.Services);

            var app = builder.Build();

            // Chama o método Configure do Startup
            startup.Configure(app, app.Environment);

            // Executa o app
            app.Run();
        }
    }
}
