import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {PackageService} from "./packages/package.service";
import {AppComponent} from "./app.component";
import {PackageDetailsComponent} from "./packages/details.component";
import {PackageListComponent} from "./packages/list.component";
import {BasicPackageComponent} from "./packages/_basic.component";
import {RecommendPackageComponent} from "./packages/_recommended.component";
import {PremiumPackageComponent} from "./packages/_premium.component";
import {AppRoutingModule} from "./app-routing.module";
import {DirectoryComponent} from "./directory/directory.component";

@NgModule({
	declarations: [
		AppComponent,
		PackageListComponent, PackageDetailsComponent,
		BasicPackageComponent, RecommendPackageComponent, PremiumPackageComponent,
		DirectoryComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
	],
	providers: [
		PackageService,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
