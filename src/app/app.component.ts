//==================================================================================================
// Top-level Component
//==================================================================================================
import { Component } from '@angular/core';

//=================================================
// Component Meta-Data
//=================================================
@Component({
	moduleId: module.id,
	selector: 'app-root',

	template: `
		<div class="col-lg-5 col-sm-7 col-xs-12">
			<h2>{{title}}</h2>
			<div>&nbsp;</div>

			<generate-random (generate)="updateData($event)"></generate-random>
			<results [list]=listData></results>
		</div>
	`,
})

//=================================================
// Component Definition
//=================================================
export class AppComponent  { 

	//--------------------------------------------------
	// Vars
	//--------------------------------------------------
	title = 'Duplicate Entry Filter';
	
	listData: string[];

	//--------------------------------------------------
	// Pass data between components
	//--------------------------------------------------
	updateData(data: string[]): void {
		this.listData = data;
	}
}
