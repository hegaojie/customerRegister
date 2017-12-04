/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

import {app} from '../../app.module';
import {ICustomerService, ICustomer} from '../../interfaces/interfaces';

export class CustomersController {
    customerService: ICustomerService;
    locationService: ng.ILocationService;

    customers: Array<ICustomer>;

    static $inject = ["CustomerService", "$location"];
    constructor(customerService: ICustomerService, $location: ng.ILocationService) {
        this.customerService = customerService;
        this.locationService = $location;

        this.customers = this.customerService.getCustomers();
    }

    private create(): void {
        this.locationService.path('/detail/-1');
    }

    private edit(customer: ICustomer): void {
        this.locationService.path('/detail/'+customer.id);
    }

    private delete(customer: ICustomer): void {
        let index = this.customers.indexOf(customer);
        if (index > -1) {
            this.customers.splice(index, 1);
            this.customerService.deleteCustomer(customer);
        }
    }
}

app.controller("CustomersController", CustomersController);