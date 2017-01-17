//==================================================================================================
// List Display component
//==================================================================================================
import { Component, Input } from '@angular/core';

//=================================================
// Component Meta-Data
//=================================================
@Component({
	moduleId: module.id,

	selector: 'results',
	templateUrl: 'display.component.html',
	styleUrls: ['display.component.css'],
})

//=================================================
// Component Definition
//=================================================
export class DisplayComponent {

	//--------------------------------------------------
	// Vars
	//--------------------------------------------------
	totalCnt: number = 0;			// All addresses
	totalList: string[] = [];
	uniqueCnt: number = 0;			// Unique addresses
	uniqueList: string[] = [];
	addrCounts = {};				// Occurrence count for each address
	sourceList: string[];			// The list we're currently displaying (all or unique)

	page: number;					// Current page for the pagination system
	speed: string = '0';			// Execution time of filtering operation

	// Display data for the filter toggle
	filterState: string = "unique";
	filterSettings = {
		all: {
			title: 'All Addresses',
			buttonText: 'Show Unique',
			buttonIcon: 'glyphicon-eye-close',
			sourceList: 'totalList',
		},

		unique: {
			title: 'Unique Addresses',
			buttonText: 'Show All',
			buttonIcon: 'glyphicon-eye-open',
			sourceList: 'uniqueList',
		}
	};

	// List data is passed in from the parent component
	@Input() 
	set list(addressList: string[]) {
		if (addressList && addressList.length)
			this.initListData(addressList);

		this.page = 0;
		this.setSourceList();
	}

	//--------------------------------------------------
	// This is the duplicate filter. It does a bit of extra
	// work to maintain data used by the UI.
	//
	// Filter out duplicate entries in a list without 
	// disturbing the list order.
	//--------------------------------------------------
	initListData(list: string[]): void {
		let start = performance.now();

		this.totalCnt = list.length;
		this.totalList = list;
		this.uniqueList = [];
		this.addrCounts = {};

		// Step through entire input list
		for (let addr of list) {

			// Check for uniqueness
			if (!this.addrCounts[addr])
			{
				this.addrCounts[addr] = 1;
				this.uniqueList.push(addr);
			}
			else
				this.addrCounts[addr]++;		// Update our occurrence count. This isn't needed for filtering, but we use it later to display dupes
		}

		this.uniqueCnt = this.uniqueList.length;

		this.speed = (performance.now() - start).toFixed(2);
	}

	//--------------------------------------------------
	// Toggle the filter between all and unique
	//--------------------------------------------------
	toggleFilter(): void {
		this.page = 0;

		if (this.filterState === 'all')
			this.filterState = 'unique';
		else
			this.filterState = 'all';

		this.setSourceList();
	}

	//--------------------------------------------------
	//--------------------------------------------------
	setSourceList(): void {
		this.sourceList = this[this.filterSettings[this.filterState].sourceList];
	}

	//--------------------------------------------------
	// Display the list title based on the toggle state
	//--------------------------------------------------
	listTitle(): string {
		return this.filterSettings[this.filterState].title;
	}

	//--------------------------------------------------
	// Display the correct text on the toggle button
	//--------------------------------------------------
	buttonText(): string {
		return this.filterSettings[this.filterState].buttonText;
	}

	//--------------------------------------------------
	// Display the correct icon on the toggle button
	//--------------------------------------------------
	buttonIcon(): string {
		return this.filterSettings[this.filterState].buttonIcon;
	}

	//--------------------------------------------------
	// Display the list size string 
	//--------------------------------------------------
	listCount(): string {
		if (this.filterState === 'all')
			return `(${this.totalCnt})`;
		else
			return `(${this.uniqueCnt} / ${this.totalCnt})`;
	}

	//--------------------------------------------------
	// Style helper for list entries
	//--------------------------------------------------
	getEntryClass(entry: string): string {
		if (this.addrCounts[entry] > 1 && this.filterState === 'all')
			return 'bg-danger';	// Bootstrap coloring
		else
			return '';
	}
}
