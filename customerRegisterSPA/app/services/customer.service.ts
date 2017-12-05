/// <reference path="../../node_modules/@types/angular/index.d.ts"/>

import { ICustomer, ICustomerService, ICustomerDetail } from '../interfaces/interfaces';
import { app } from '../app.module';

export class CustomerService implements ICustomerService {
    httpService: ng.IHttpService
    static $inject = ["$http"];
    constructor($http: ng.IHttpService) {
        this.httpService = $http;
    }

    public getCustomers(): angular.IPromise<angular.IHttpResponse<{}>> {
        return this.httpService.get('http://127.0.0.1:9292/api/customers');
    }
    
    public deleteCustomer(customer: ICustomer) {
        this.httpService.post('http://127.0.0.1:9292/api/delete', customer.Id);
    }

    public getCustomerDetail(customerId: number): angular.IPromise<angular.IHttpResponse<{}>> {
        return this.httpService.get('http://127.0.0.1:9292/api/customer/'+customerId);
    }

    public updateCustomerDetail(customer: ICustomerDetail): angular.IPromise<angular.IHttpResponse<{}>> {
        return this.httpService.post('http://127.0.0.1:9292/api/update', customer);
    }
}

app.service("CustomerService", CustomerService);