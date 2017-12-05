/// <reference path="../../node_modules/@types/angular/index.d.ts"/>

export interface ICustomerService {
    getCustomers(): angular.IPromise<angular.IHttpResponse<{}>>;
    deleteCustomer(customer: ICustomer);
    getCustomerDetail(customerId: number): angular.IPromise<angular.IHttpResponse<{}>>;
    updateCustomerDetail(customer: ICustomerDetail): angular.IPromise<angular.IHttpResponse<{}>>;
}

export interface ICustomer {
    Id: number;
    Name: string;
    Address: string;
}

export interface ICustomerDetail {
    Id: number;
    Name: string;
    Address: string;
    Comment: string;
}

export interface IRouteParamsCustomer extends ng.route.IRouteParamsService {
    id: number;
}
