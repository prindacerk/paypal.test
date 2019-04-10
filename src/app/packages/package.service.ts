import {Package} from "./package.model";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable()
export class PackageService {
	get(id: number): Observable<Package> {
		switch (id) {
			case 1:
				return of({
					id: 1,
					code: "basic",
					name: "Basic Package",
					description: "This is the basic package",
					price: 2.99,
				} as Package);
			case 2:
				return of({
					id: 2,
					code: "recommend",
					name: "Recommended Package",
					description: "This is the recommended package",
					price: 5.99,
				} as Package);
			case 3:
				return of({
					id: 1,
					code: "premium",
					name: "Premium Package",
					description: "This is the premium package",
					price: 9.99,
				} as Package);
			default:
				return of(null);
		}
	}
}
