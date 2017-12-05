/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

import {app} from '../../app.module';
import {ICustomerService, ICustomer} from '../../interfaces/interfaces';

export class CustomersController {
    customerService: ICustomerService;
    locationService: ng.ILocationService;
    rootScope: ng.IScope;
    customers: ICustomer[];

    static $inject = ["CustomerService", "$location", "$scope"];
    constructor(customerService: ICustomerService, $location: ng.ILocationService, $scope: ng.IScope) {
        this.customerService = customerService;
        this.locationService = $location;
        this.rootScope = $scope;

        this.rootScope.$on('$viewContentLoaded', ()=>{
            this.customerService.getCustomers().then((response)=>{
                this.customers =[];
                this.customers = response.data as ICustomer[];
            });
        });
    }

    private create(): void {
        this.locationService.path('/detail/-1');
    }

    private edit(customer: ICustomer): void {
        this.locationService.path('/detail/'+customer.Id);
    }

    private delete(customer: ICustomer): void {
        let index = this.customers.indexOf(customer);
        if (index > -1) {
            this.customers.splice(index, 1);
            this.customerService.deleteCustomer(customer);
        }
    }
}

app.controller("CustomersController", ["CustomerService", "$location", "$scope", CustomersController]);