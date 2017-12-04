using System;
using System.Net.Http.Headers;
using System.Web.Http;
using Microsoft.Owin;
using Newtonsoft.Json;
using Ninject;
using Owin;
using CustomerRegister;
using CustomerRegister.Storage;

[assembly:OwinStartup(typeof(Startup))]
namespace CustomerRegister
{
    public class Startup
    {
        private readonly StartupConfig _config;

        public Startup(StartupConfig config)
        {
            _config = config;
        }

        public void Configuration(IAppBuilder app)
        {
            ConfigureWebApi(app);
        }
        
        private void ConfigureWebApi(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            config.EnableCors();
            config.DependencyResolver = new NinjectDependencyResolver(ConfigureResolver(new StandardKernel()));
            config.MapHttpAttributeRoutes();
            config.Formatters.JsonFormatter.SerializerSettings = new JsonSerializerSettings();
            app.UseWebApi(config);
        }

        private IKernel ConfigureResolver(IKernel kernel)
        {
            kernel.Bind<ICustomerStorage>().To<CustomerJsonFileStorage>().InSingletonScope().WithConstructorArgument("jsonFile", _config.JsonFile);
            return kernel;
        }
    }
}