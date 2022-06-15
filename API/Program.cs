using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        /*
        
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        Basically we replace the above main method by below main method
        
        Because it does a lot of things:
        1) Applies the migrations and creating the Database at app startup
        
         */

        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            try
            {
                // Applies the migrations and creating the Database at app startup
                var context = services.GetRequiredService<StoreContext>();
                await context.Database.MigrateAsync();
                // Adds data from the JSON files to our database
                //await StoreContextSeed.SeedAsync(context, loggerFactory);

                /*var userManager = services.GetRequiredService<UserManager<AppUser>>();
                var identityContext = services.GetRequiredService<AppIdentityDbContext>();
                await identityContext.Database.MigrateAsync();
                await AppIdentityDbContextSeed.SeedUsersAsync(userManager);*/
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<Program>();
                logger.LogError(ex, "An error occurred during migration");
            }

            host.Run();
        }



        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
