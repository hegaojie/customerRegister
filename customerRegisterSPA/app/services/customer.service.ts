/// <reference path="../../node_modules/@types/angular/index.d.ts"/>

import { ICustomer, ICustomerService, ICustomerDetail } from '../interfaces/interfaces';
import { app } from '../app.module';

export class CustomerService implements ICustomerService {
    httpService: ng.IHttpService
    static $inject = ["$http"];
    constructor($http: ng.IHttpService) {
        this.httpService = $http;
    }

    public getCustomers(): Array<ICustomer> {
        var res: Array<ICustomer> = [
            { id: 1, name: "gaojie", address: "shanghai" },
            { id: 2, name: "peijen", address: "zhejiang" },
            { id: 3, name: "junhao", address: "zhoushan" }
        ];
        return res;
        //todo: access api
    }
    
    public deleteCustomer(customer: ICustomer) {
        //todo: access api 
    }

    public getCustomerDetail(customerId: number): ICustomerDetail {
        return {id: 9, name:"sample", address:"sample", comment:"sample"};
        //todo: access api
    }

    public updateCustomerDetail(customer: ICustomerDetail) {
        //todo: access api
    }
}

app.service("CustomerService", CustomerService);