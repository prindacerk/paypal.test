import { Component } from "@angular/core";
import {
	PayPalScriptService
} from "ngx-paypal";
import {PackageService} from "./packages/package.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "PaypalTest";

	constructor(private paypalService: PayPalScriptService, private packageService: PackageService) {
		this.paypalService.registerPayPalScript({clientId: "sb", currency: "AUD"}, (payPalApi) => {
			this.packageService.setPaypalApi(payPalApi);
		});
	}
}
