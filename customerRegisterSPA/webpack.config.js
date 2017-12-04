module.exports ={
    entry: [
        './app/pages/customers/customersController.js', 
        './app/pages/customerDetail/customerDetailController.js', 
        './app/interfaces/interfaces.js', 
        './app/services/customer.service.js', 
        './app/app.module.js'],
    output: {
        filename: './dist/bundle.js'
    }
};