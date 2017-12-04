/// <reference path="../../node_modules/@types/angular/index.d.ts"/>

export interface ICustomerService {
    getCustomers: () => Array<ICustomer>;
    deleteCustomer(customer: ICustomer);
    getCustomerDetail(customerId: number): ICustomerDetail;
    updateCustomerDetail(customer: ICustomerDetail);
}

export interface ICustomer {
    id: number;
    name: string;
    address: string;
}

export interface ICustomerDetail {
    id: number;
    name: string;
    address: string;
    comment: string;
}

export interface IRouteParamsCustomer extends ng.route.IRouteParamsService {
    id: number;
}
