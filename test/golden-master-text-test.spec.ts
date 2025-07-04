import { Item, GildedRose } from '../app/gilded-rose';
import {expect} from "chai";

// Add a master test here
describe("Golden Master Test", () => {
    it("", () => {
        // Initial Item Declarations
        const items: Item[] = [
            { name: "Aged Brie", sellIn: 10, quality: 20 },
            { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
            { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20 },
            { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 35 },
            { name: "Elixir of the Mongoose", sellIn: 5, quality: 7 },
            { name: "Dexterity Vest", sellIn: 10, quality: 20 },
            { name: "Conjured Mana Cake", sellIn: 3, quality: 6 },
            { name: "Aged Brie", "sellIn": 2, quality: 0 },
            { name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80 }
        ]

        const expectedUpdatedItems: Item[] = [
            { name: "Aged Brie", sellIn: 9, quality: 21 },
            { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
            { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 14, quality: 21 },
            { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 4, quality: 38 },
            { name: "Elixir of the Mongoose", sellIn: 4, quality: 6 },
            { name: "Dexterity Vest", sellIn: 9, quality: 19 },
            { name: "Conjured Mana Cake", sellIn: 2, quality: 5 },
            { name: "Aged Brie", sellIn: 1, quality: 1 },
            { name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80 }
        ]


        const gildedRose = new GildedRose(items)

        // Assert equality for each updated item
        expect(gildedRose.updateQuality()).to.deep.equal(expectedUpdatedItems)
    })
})