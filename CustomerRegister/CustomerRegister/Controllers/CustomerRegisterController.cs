using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using CustomerRegister.Base.Interface;
using CustomerRegister.Base.Domain;
using CustomerRegister.Storage;

namespace CustomerRegister.Controllers
{
    [EnableCors(origins:"*", headers:"*", methods:"*")]
    public class CustomerRegisterController : ApiController, ICustomerRegisterService
    {
        private readonly ICustomerStorage _storage;

        public CustomerRegisterController(ICustomerStorage storage)
        {
            _storage = storage;
        }

        [Route("api/customers")]
        [HttpGet]
        public IList<Customer> GetAllCustomers()
        {
            return _storage.GetAllCustomers();
        }

        [Route("api/customer/{id}")]
        [HttpGet]
        public CustomerDetail GetCustomerDetail(long id)
        {
            return _storage.GetCustomerDetail(id);
        }

        [Route("api/delete")]
        [HttpPost]
        public void DeleteCustomer([FromBody] long customerId)
        {
            _storage.DeleteCustomer(customerId);
        }

        [Route("api/update")]
        [HttpPost]
        public void UpdateCustomer([FromBody] CustomerDetail customer)
        {
            if (customer.Id > 0)
                _storage.UpdateCustomer(customer);
            else
                _storage.InsertCustomer(customer);
        }

        [Route("api/insert")]
        [HttpPost]
        public void InsertCustomer([FromBody] CustomerDetail customer)
        {//todo: can be removed
            _storage.InsertCustomer(customer);
        }
    }
}