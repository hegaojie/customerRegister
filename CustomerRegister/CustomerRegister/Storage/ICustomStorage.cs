using CustomerRegister.Base.Domain;
using System.Collections.Generic;

namespace CustomerRegister.Storage
{
    public interface ICustomerStorage
    {
        IList<Customer> GetAllCustomers();
        CustomerDetail GetCustomerDetail(long customerId);
        void InsertCustomer(CustomerDetail customer);
        void UpdateCustomer(CustomerDetail customer);
        void DeleteCustomer(long customerId);
    }
}
