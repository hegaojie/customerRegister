using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CustomerRegister.Base.Domain;
using Newtonsoft.Json;
using System.IO;

namespace CustomerRegister.Storage
{
    public class CustomerJsonFileStorage : ICustomerStorage
    {
        private readonly string _jsonFile;

        private List<CustomerDetail> _cachedCustomers;

        private long _lastId;

        private bool _cacheInitialized;

        public CustomerJsonFileStorage(string jsonFile)
        {
            _jsonFile = jsonFile;
            _cacheInitialized = false;
            _cachedCustomers = new List<CustomerDetail>();
        }

        public IList<Customer> GetAllCustomers()
        {
            InitializeCache();
            return (from c in _cachedCustomers select new Customer() { Id = c.Id, Name = c.Name, Address = c.Address }).ToList();
        }

        public CustomerDetail GetCustomerDetail(long customerId)
        {
            InitializeCache();
            var customer = _cachedCustomers.FirstOrDefault<CustomerDetail>(c => c.Id == customerId);
            return customer ?? new CustomerDetail();
        }

        public void InsertCustomer(CustomerDetail customer)
        {
            InitializeCache();
            customer.Id = _cachedCustomers.Count + 1;
            _cachedCustomers.Add(customer);
            PersistCustomers(_cachedCustomers);
        }

        public void UpdateCustomer(CustomerDetail customer)
        {
            InitializeCache();
            var index = _cachedCustomers.FindIndex(c => c.Id == customer.Id);
            if (index < 0)
            {//todo: error handling
            }
            _cachedCustomers[index] = customer;
            PersistCustomers(_cachedCustomers);
        }

        public void DeleteCustomer(long customerId)
        {
            InitializeCache();
            var index = _cachedCustomers.FindIndex(c => c.Id == customerId);
            if (index < 0)
            {//todo: error handling
            }
            _cachedCustomers.RemoveAt(index);
            PersistCustomers(_cachedCustomers);
        }

        private void PersistCustomers(IList<CustomerDetail> customers)
        {
            var json = JsonConvert.SerializeObject(_cachedCustomers, Formatting.Indented);
            File.WriteAllText(_jsonFile, json);
        }

        private void InitializeCache()
        {
            if (!_cacheInitialized && File.Exists(_jsonFile))
            {
                var json = File.ReadAllText(_jsonFile);
                _cachedCustomers.AddRange(JsonConvert.DeserializeObject<IList<CustomerDetail>>(json));
                _cacheInitialized = true;
            }
        }
    }
}
