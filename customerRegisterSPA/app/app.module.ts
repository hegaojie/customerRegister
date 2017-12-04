/// <reference path="../node_modules/@types/angular/index.d.ts"/>
import * as angular from "angular";

export let app = angular.module('angularWithTS', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when("/home", { controller: "CustomersController", templateUrl: "app/pages/customers/customers.html", controllerAs: "customersCtrl" });
    $routeProvider.when("/detail/:id", { controller: "CustomerDetailController", templateUrl: "app/pages/customerDetail/customerDetail.html", controllerAs: "detailCtrl" });
    $routeProvider.otherwise({ redirectTo: "/home" });
});