import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Common Items Tests', function () {
    it('the quality of a common item should decrease by 1 for positive sellIn values and by 2 for negative ones', function() {
        const gildedRose = new GildedRose([
            new Item('foo', 2, 49),
            new Item('foo', -1, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items.map((item) => item.quality)).to.deep.equal([48, 48]);
    });

    it('the sellIn value of common items should always decrease by 1', function() {
        const gildedRose = new GildedRose([ new Item('foo', 5, 9) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
    });
});

describe('Backstage Passes Tests', function () {
    it('the quality of "Backstage Passes" should increase by 1 for sellIn values above 10', function() {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 20, 4)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5);
    });

    it('the quality of "Backstage Passes" should increase by 2 for sellIn values smaller or equal to 10', function() {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 4)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(6);
    });

    it('the quality of "Backstage Passes" should increase by 3 for sellIn values smaller or equal to 5', function() {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 2, 4)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(7);
    });

    it('the quality of "Backstage Passes" should drop to 0 if sellIn value becomes negative', function() {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 0, 4)
        ]);
        let items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(0);

        // Extra update stage
        items = gildedRose.updateQuality()

        expect(items[0].quality).to.equal(0);
    });
})

describe('Aged Brie Tests', function () {
    it('the quality of "Aged Brie" should increase by 1 for positive sellIn values', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 5, 4) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5);
    });

    it('the quality of "Aged Brie" should increase by 2 for negative sellIn values', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', -5, 4) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(6);
    });
})

describe('Sulfuras Item Tests', function () {
    it('the sellIn value of "Sulfuras, Hand of Ragnaros" should not change', function() {
        const gildedRose = new GildedRose([
            new Item('Sulfuras, Hand of Ragnaros', 5, 80),
            new Item('Sulfuras, Hand of Ragnaros', -1, 80)
        ]);
        const items = gildedRose.updateQuality();

        expect(items.map((item) => item.sellIn)).to.deep.equal([5, -1]);
    });

    it('the quality of "Sulfuras, Hand of Ragnaros" should always remain 80 (positive sellIn value)', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 5, 80) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
    });

    it('the quality of "Sulfuras, Hand of Ragnaros" should always remain 80 (negative sellIn value)', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', -1, 80) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
    });
})
