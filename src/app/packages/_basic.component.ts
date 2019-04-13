import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import { untilDestroyed } from "ngx-take-until-destroy";
import {ICreateOrderRequest, IPayPalConfig, NgxPaypalComponent} from "ngx-paypal";

import {Package} from "./package.model";
import {PackageService} from "./package.service";

declare let paypal: any;

@Component({
	selector: "app-basic-package",
	templateUrl: "./_basic.component.html",
})
export class BasicPackageComponent implements OnInit, AfterViewInit, OnDestroy {
	package: Package;
	@Output() onSuccess: EventEmitter<boolean>;
	@ViewChild("paypal") paypalComponent?:  NgxPaypalComponent;

	paypalConfig: IPayPalConfig;

	constructor(private readonly service: PackageService) {
		this.onSuccess = new EventEmitter<boolean>();
	}

	ngOnInit() {
		this.service.get(1)
			.pipe(untilDestroyed(this))
			.subscribe((pack: Package) => {
			this.package = pack;
		});

		this.paypalInit();
	}

	paypalInit() {
		this.paypalConfig = {
			currency: "EUR",
			clientId: "sb",
			createOrderOnClient: (data) => < ICreateOrderRequest > {
				intent: "CAPTURE",
				purchase_units: [{
					amount: {
						currency_code: "AUD",
						value: `${this.package.price}`,
						breakdown: {
							item_total: {
								currency_code: "AUD",
								value: `${this.package.price}`
							}
						}
					},
					items: [{
						name: this.package.name,
						quantity: "1",
						unit_amount: {
							currency_code: "AUD",
							value: `${this.package.price}`,
						},
					}],
				}],
				application_context: {
					shipping_preference: "NO_SHIPPING",
				},
			},
			style: {
				label: "pay",  // checkout | credit | pay | buynow | generic
				size:  "responsive", // small | medium | large | responsive
				shape: "pill",   // pill | rect
				color: "gold",   // gold | blue | silver | black
				layout: "horizontal",
			},
			onApprove: (data, actions) => {
				console.debug("onApprove - transaction was approved, but not authorized", data, actions);
				actions.order.get().then(details => {
					console.debug("onApprove - you can get full order details inside onApprove: ", details);

					this.onSuccess.emit(true);
				});
			},
			onClientAuthorization: (data) => {
				console.log("onClientAuthorization - you should probably inform your server about completed transaction at this point", data);
			},
			onCancel: (data, actions) => {
				console.log("OnCancel", data, actions);

			},
			onError: err => {
				console.log("OnError", err);
			},
			onClick: () => {
				console.log("onClick");
			},
		};

		this.paypalComponent.customInit(this.service.getPaypalApi());

		// paypal.Buttons(this.paypalConfig).render("#basic-paypal-button");
	}

	ngAfterViewInit() {
		// this.paypalInit();
	}

	// This method must be present, even if empty.
	ngOnDestroy() {
		// To protect you, we'll throw an error if it doesn't exist.
	}
}
