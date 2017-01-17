//==================================================================================================
// Random data generator UI component
//==================================================================================================
import { Component, Output, EventEmitter } from '@angular/core';
import { AddressGeneratorService } from './address-generator.service';

//=================================================
// Component Meta-Data
//=================================================
@Component({
	moduleId: module.id,

	selector: 'generate-random',
	templateUrl: 'random.component.html',
	styleUrls: ['random.component.css'],
})

//=================================================
// Component Definition
//=================================================
export class RandomComponent {

	//--------------------------------------------------
	// Constants
	//--------------------------------------------------
	DEFAULT_UNIQUE: number = 500;
	DEFAULT_DUPES: number = 100;
	MAX_UNIQUE: number = 1000000;
	MAX_DUPES: number =  1000000;

	//--------------------------------------------------
	// Vars
	//--------------------------------------------------
	unique: number;
	dupes: number;

	@Output() generate = new EventEmitter<string[]>();

	//--------------------------------------------------
	// Constructor
	//--------------------------------------------------
	constructor(private generatorService: AddressGeneratorService) {
		this.unique = this.DEFAULT_UNIQUE;
		this.dupes = this.DEFAULT_DUPES;
	};

	//--------------------------------------------------
	// Generates the requested number of addresses
	//--------------------------------------------------
	doGenerate(): void {
		let data = this.generatorService.getAddresses(this.unique, this.dupes);
		this.generate.emit(data);
	}

	//--------------------------------------------------
	// Validates the Generate Random input fields
	//
	// It would be cleaner to do individual validation
	// using Angular, but we'll take the easy way out
	// this time.
	//--------------------------------------------------
	validateFields(): void {
		this.unique = parseInt(this.unique + '', 10);
		if (isNaN(this.unique))
			this.unique = this.DEFAULT_UNIQUE;
		else if (this.unique < 1)
			this.unique = 1;
		else if (this.unique > this.MAX_UNIQUE)
			this.unique = this.MAX_UNIQUE;

		this.dupes = parseInt(this.dupes + '', 10);
		if (isNaN(this.dupes))
			this.dupes = this.DEFAULT_DUPES;
		if (this.dupes < 0)
			this.dupes = 0;
		else if (this.dupes > this.MAX_DUPES)
			this.dupes = this.MAX_DUPES;
	}

}
