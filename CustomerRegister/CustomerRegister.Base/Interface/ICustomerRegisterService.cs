using CustomerRegister.Base.Domain;
using System.Collections.Generic;

namespace CustomerRegister.Base.Interface
{
    public interface ICustomerRegisterService
    {
        IList<Customer> GetAllCustomers();
        CustomerDetail GetCustomerDetail(long customerId);
        void DeleteCustomer(long customerId);
        void UpdateCustomer(CustomerDetail customerDetail);
        void InsertCustomer(CustomerDetail customerDetail);
    }
}
