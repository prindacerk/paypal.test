import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Package} from "./package.model";

@Component({
	templateUrl: "./list.component.html",
})
export class PackageListComponent implements OnInit {
	basicPackage: Package;
	recommendedPackage: Package;
	premiumPackage: Package;

	constructor(private router: Router) {

	}

	ngOnInit() {

	}

	redirectToDetails(success: boolean) {
		this.router.navigate(["/package/details"]);
	}
}
