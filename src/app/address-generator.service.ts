//==================================================================================================
// Generates a set of email addresses, with optional duplicate entries
//==================================================================================================
import { Injectable } from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class AddressGeneratorService {

	//--------------------------------------------------
	// Constants
	//--------------------------------------------------
	private firstNames: string[] = [
		"Anderson", "Angelo", "Anika", "Aron", "Bao", "Breann", "Bronwyn", "Coralee", "Crystle", "Damian", "Darby", "Deedra", "Delilah", "Delmy", "Dinah", "Drema", "Drew", "Earline", "Edmund", "Elise", "Ella", "Elwanda", "Fernande", "Fidel", "Francie", "Gaynelle", "Glenda", "Hassan", "Heidy", "Honey", "Ida", "Iluminada", "Inga", "Jacquelyn", "Janel", "Jeanett", "Jina", "Josephine", "Julieann", "Julius", "Keisha", "Keitha", "Khadijah", "Larhonda", "Lenny", "Leota", "Lonna", "Loree", "Lorina", "Lorrine", "Lu", "Marge", "Marjory", "Marlana", "Mica", "Miguelina", "Misty", "Mitsue", "Mitsuko", "Nannette", "Nick", "Nobuko", "Novella", "Ouida", "Pierre", "Pricilla", "Rana", "Rob", "Rosamond", "Rubye", "Sandy", "Sanjuana", "Shae", "Sharla", "Sherell", "Shyla", "Sigrid", "Siu", "Socorro", "Soraya", "Stephania", "Suzan", "Tama", "Tamekia", "Tessie", "Thad", "Timmy", "Tyler", "Ursula", "Vada", "Vanesa", "Veola", "Veronique", "Vicky", "Virgen", "Voncile", "Wayne", "Wesley", "Wynell", "Yvonne",
	];

	private lastNames: string[] = [
		"Albro", "Amarante", "Amerson", "Ayer", "Banvelos", "Brumett", "Burdick", "Coker", "Colpitts", "Dahms", "Daly", "Dantin", "Deyo", "Dibernardo", "Donelson", "Duchesne", "Dudding", "Eastin", "Eberly", "Egner", "Ellingwood", "Ellwood", "Fagg", "Fitzmaurice", "Fujii", "Godoy", "Granata", "Hieb", "Hottinger", "Hucks", "Imhoff", "Ingold", "Isakson", "Jacquez", "Jeon", "Jepsen", "Johnsrud", "Julius", "June", "Keown", "Kiel", "Kopacz", "Lai", "Lavelle", "Leaf", "Lear", "Leiva", "Lev", "Litman", "Lohman", "Manner", "Marcinek", "Mass", "Mazzariello", "Mealing", "Monarrez", "Montesino", "Morriss", "Munson", "Nair", "Nay", "Ng", "Nixon", "Ovalle", "Pascua", "Puglia", "Remley", "Rench", "Rosen", "Rubenstein", "Sapienza", "Schulman", "Scovil", "Sedor", "Six", "Skinner", "Southworth", "Stehlik", "Stevens", "Stiltner", "Strub", "Sunseri", "Taranto", "Teal", "Teeple", "Tetrault", "Tiller", "Toy", "Uhlig", "Valez", "Vanderveer", "Vandine", "Vensel", "Vetter", "Villavicencio", "Viveros", "Waldrip", "Walk", "Wehr", "Young",
	];

	// Email domain names. The list comes from here: https://github.com/mailcheck/mailcheck/wiki/List-of-Popular-Domains
	private domains: string[] = [
		/* Default domains included */
		"aol.com", "att.net", "comcast.net", "facebook.com", "gmail.com", "gmx.com", "googlemail.com",
		"google.com", "hotmail.com", "hotmail.co.uk", "mac.com", "me.com", "mail.com", "msn.com",
		"live.com", "sbcglobal.net", "verizon.net", "yahoo.com", "yahoo.co.uk",

		/* Other global domains */
		"email.com", "games.com" /* AOL */, "gmx.net", "hush.com", "hushmail.com", "icloud.com", "inbox.com",
		"lavabit.com", "love.com" /* AOL */, "outlook.com", "pobox.com", "rocketmail.com" /* Yahoo */,
		"safe-mail.net", "wow.com" /* AOL */, "ygm.com" /* AOL */, "ymail.com" /* Yahoo */, "zoho.com", "fastmail.fm",
		"yandex.com",

		/* United States ISP domains */
		"bellsouth.net", "charter.net", "comcast.net", "cox.net", "earthlink.net", "juno.com",

		/* British ISP domains */
		"btinternet.com", "virginmedia.com", "blueyonder.co.uk", "freeserve.co.uk", "live.co.uk",
		"ntlworld.com", "o2.co.uk", "orange.net", "sky.com", "talktalk.co.uk", "tiscali.co.uk",
		"virgin.net", "wanadoo.co.uk", "bt.com",

		/* Domains used in Asia */
		"sina.com", "qq.com", "naver.com", "hanmail.net", "daum.net", "nate.com", "yahoo.co.jp", "yahoo.co.kr", "yahoo.co.id", "yahoo.co.in", "yahoo.com.sg", "yahoo.com.ph",

		/* French ISP domains */
		"hotmail.fr", "live.fr", "laposte.net", "yahoo.fr", "wanadoo.fr", "orange.fr", "gmx.fr", "sfr.fr", "neuf.fr", "free.fr",

		/* German ISP domains */
		"gmx.de", "hotmail.de", "live.de", "online.de", "t-online.de" /* T-Mobile */, "web.de", "yahoo.de",

		/* Russian ISP domains */
		"mail.ru", "rambler.ru", "yandex.ru", "ya.ru", "list.ru",

		/* Belgian ISP domains */
		"hotmail.be", "live.be", "skynet.be", "voo.be", "tvcablenet.be", "telenet.be",

		/* Argentinian ISP domains */
		"hotmail.com.ar", "live.com.ar", "yahoo.com.ar", "fibertel.com.ar", "speedy.com.ar", "arnet.com.ar",

		/* Domains used in Mexico */
		"hotmail.com", "gmail.com", "yahoo.com.mx", "live.com.mx", "yahoo.com", "hotmail.es", "live.com", "hotmail.com.mx", "prodigy.net.mx", "msn.com",

		/* Domains used in Brazil */
		"yahoo.com.br", "hotmail.com.br", "outlook.com.br", "uol.com.br", "bol.com.br", "terra.com.br", "ig.com.br", "itelefonica.com.br", "r7.com", "zipmail.com.br", "globo.com", "globomail.com", "oi.com.br"
	];

	//--------------------------------------------------
	// Generates a single random email address
	//--------------------------------------------------
	private createAddress(): string {
		var first = _.sample(this.firstNames);
		var last = _.sample(this.lastNames);
		var domain = _.sample(this.domains);

		return first + last + '@' + domain;
	}

	//--------------------------------------------------
	// Generates a list of unique email addresses
	//
	// NOTE: If the routine can't find a unique name
	// in a given number of tries, it will skip that
	// entry. Thus, the list will always be guaranteed
	// to contain unique entries. However, in certain
	// circumstances it's possible that the list will
	// be shorter than requested.
	//--------------------------------------------------
	private generateUnique(count: number): string[] {
		let used = {};
		let output: string[] = [];
		let max_tries = 500;

		// Generation loop
		for (let i = 0; i < count; i++) {

			// Attempt to pick a unique name. Give up if it takes too long.
			for (let tries = 0; tries < max_tries; tries++) {
				let addr = this.createAddress();
	
				if (!used[addr]) {
					used[addr] = true;
					output.push(addr);
					break;
				}
			}

		}
		return output;
	}

	//--------------------------------------------------
	//--------------------------------------------------
	private addDupes(count: number, list: string[]): string[] {
		let lastUnique = list.length - 1;

		for (let i = 0; i < count; i++) {
			let src = _.random(0, lastUnique);
			list.push(list[src]);
		}

		return _.shuffle(list);
	}

	//--------------------------------------------------
	// GETTER: Returns a list of email addresses with
	// the requested number of unique and duplicate
	// entries.
	//--------------------------------------------------
	public getAddresses(uniqueCnt: number, dupeCnt: number): string[] {
		let uniqueList = this.generateUnique(uniqueCnt);
		let fullList = this.addDupes(dupeCnt, uniqueList);

		return fullList;
	}

}