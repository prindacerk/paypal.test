import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import {PackageListComponent} from "./packages/list.component";
import {PackageDetailsComponent} from "./packages/details.component";
import {DirectoryComponent} from './directory/directory.component';

const routes: Routes = [
	{
		path: "packages",
		component: PackageListComponent,
	},
	{
		path: "packages/details",
		component: PackageDetailsComponent,
	},
	{
		path: "directory",
		component: DirectoryComponent,
	},
	{
		path: "**",
		redirectTo: "",
	},
];


@NgModule({
	imports: [RouterModule.forRoot(routes, {
		// preload all modules; optionally we could
		// implement a custom preloading strategy for just some
		// of the modules (PRs welcome 😉)
		preloadingStrategy: PreloadAllModules,
		// enableTracing: true, // <-- debugging purposes only
		onSameUrlNavigation: "reload",
		scrollPositionRestoration: "top", // Add options right here
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
