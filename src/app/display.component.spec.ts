/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DisplayComponent } from './display.component';

describe('DisplayComponent', () => {
    let dispComp: DisplayComponent;

    beforeEach(() => {
        dispComp = new DisplayComponent();
    });

    //--------------------------------------------------
    //--------------------------------------------------
    it('should filter a simple list', () => {
        dispComp.initListData(['a', 'b']);

        expect(dispComp.totalCnt).toEqual(2);
        expect(dispComp.totalList).toEqual(['a', 'b']);

        expect(dispComp.uniqueList).toEqual(['a', 'b']);
        expect(dispComp.uniqueCnt).toEqual(2);
    });

    //--------------------------------------------------
    //--------------------------------------------------
    it('should eliminate duplicates', () => {

        dispComp.initListData(['a', 'b', 'a', 'c']);

        expect(dispComp.totalCnt).toEqual(4);
        expect(dispComp.totalList).toEqual(['a', 'b', 'a', 'c']);

        expect(dispComp.uniqueList).toEqual(['a', 'b', 'c']);
        expect(dispComp.uniqueCnt).toEqual(3);
    });

    //--------------------------------------------------
    //--------------------------------------------------
    it('should maintain the original list order', () => {

        dispComp.initListData(['a', 'z', 'a', 'b', 'z', 'y', 'a', 'y', 'z', 'b', 'a', 'z', 'y']);

        expect(dispComp.uniqueList).toEqual(['a', 'z', 'b', 'y']);
        expect(dispComp.uniqueCnt).toEqual(4);
    });

    //--------------------------------------------------
    //--------------------------------------------------
    it('should keep an accurate occurrence count', () => {

        dispComp.initListData(['a', 'b', 'a', 'a', 'z', 'y', 'z', 'y', 'x']);

        expect(dispComp.addrCounts).toEqual({a:3, b: 1, z: 2, y: 2, x: 1});
    });


});
