/// <reference path="../../../node_modules/@types/angular/index.d.ts"/>

import {app} from '../../app.module';
import {IRouteParamsCustomer, ICustomerService, ICustomerDetail} from '../../interfaces/interfaces';

export class CustomerDetailController {
    private customerId: number;
    private customer: ICustomerDetail;
    customerService: ICustomerService;
    locationService: ng.ILocationService;

    static $inject = ["$routeParams", "CustomerService", "$location"];
    constructor($routeParams: IRouteParamsCustomer, customerService: ICustomerService, $location: ng.ILocationService) {
        this.customerService = customerService;
        this.locationService = $location;

        this.customerId = $routeParams.id;
        this.customerService.getCustomerDetail(this.customerId).then((response)=>{
            this.customer = response.data as ICustomerDetail;
        });
    }

    save(): void {
        this.customerService.updateCustomerDetail(this.customer).then((response)=>{
            this.locationService.path('/home');
        });
    }

    cancel(): void {
        this.locationService.path('/home');
    }
}

app.controller("CustomerDetailController",["$routeParams", "CustomerService", "$location", CustomerDetailController]);