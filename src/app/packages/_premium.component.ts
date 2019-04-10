import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import { untilDestroyed } from "ngx-take-until-destroy";

import {Package} from "./package.model";
import {PackageService} from "./package.service";

declare let paypal: any;

@Component({
	selector: "app-premium-package",
	templateUrl: "./_premium.component.html",
})
export class PremiumPackageComponent implements OnInit, AfterViewInit, OnDestroy {
	package: Package;
	@Output() onSuccess: EventEmitter<boolean>;

	paypalConfig: any;

	constructor(private readonly service: PackageService) {
		this.onSuccess = new EventEmitter<boolean>();
	}

	ngOnInit() {
		this.service.get(3)
			.pipe(untilDestroyed(this))
			.subscribe((pack: Package) => {
			this.package = pack;
		});
	}

	paypalInit() {
		this.paypalConfig = {
			style: {
				label: "pay",  // checkout | credit | pay | buynow | generic
				size:  "responsive", // small | medium | large | responsive
				shape: "pill",   // pill | rect
				color: "gold",   // gold | blue | silver | black
				layout: "horizontal",
			},
			createOrder: (data, actions) => {
				return actions.order.create({
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
				});
			},
			advanced: {
				updateOrderDetails: {
					commit: true
				}
			},
			onApprove: (data, actions) => {
				console.debug("onApprove - transaction was approved, but not authorized", data, actions);
				actions.order.get().then(details => {
					console.debug("onApprove - you can get full order details inside onApprove: ", details);

					this.onSuccess.emit(true);
				});
			},
			onClientAuthorization: (data) => {
				console.debug("onClientAuthorization - you should probably inform your server about completed transaction at this point", data);
			},
			onCancel: (data, actions) => {
				console.debug("OnCancel");
			},
			onError: (err) => {
				console.debug("OnError", err);

			},
			onClick: (data, actions) => {
				console.debug("onClick");

				console.log("Can do validation");
				if (1 !== 1) {
					return actions.reject();
				}

				return actions.resolve();
			},
		};

		paypal.Buttons(this.paypalConfig).render("#premium-paypal-button");
	}

	ngAfterViewInit() {
		this.paypalInit();
	}

	// This method must be present, even if empty.
	ngOnDestroy() {
		// To protect you, we'll throw an error if it doesn't exist.
	}
}
