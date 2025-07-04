import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('the quality of a common item should not increase over 50', function() {
        const gildedRose = new GildedRose([
            new Item('foo', 5, 50),
            new Item('Aged Brie', 4, 50),
            new Item('Backstage passes to a TAFKAL80ETC concert', 4, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items.map((item) => item.quality)).to.deep.equal([49, 50, 50])
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

    it('the sellIn value of "Sulfuras, Hand of Ragnaros" should not change', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 5, 80) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(5);
    });

    it('the quality of "Aged Brie" should always increase only by 1', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 5, 4) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5);
    });
});
