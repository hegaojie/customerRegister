using System;
using Microsoft.Owin.Hosting;
using System.Configuration;
using static System.Console;

namespace CustomerRegister
{
    class Program
    {
        private static IDisposable _webApp;

        static void Main(string[] args)
        {
            var port = ConfigurationManager.AppSettings["port"];
            var ip = ConfigurationManager.AppSettings["ip"];
            var repoPath = ConfigurationManager.AppSettings["jsonFile"];

            var options = new StartOptions
            {
                Urls = { $"http://{ip}:{port}"},
            };
            
            _webApp = WebApp.Start(options, (builder) => {
                new Startup(new StartupConfig { JsonFile = repoPath }).Configuration(builder);
            });
            WriteLine("Customer Register Service is running...");
            WriteLine("Press Any Key To Exit...");

            var key = ReadKey();
            _webApp.Dispose();
        }
    }
}
