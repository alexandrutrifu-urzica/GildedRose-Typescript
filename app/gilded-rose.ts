export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            // Quality changes
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        this.items[i].quality = this.items[i].quality - 1
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }

            // SellIn Value Changes
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn -= 1;
            }

            // Handle negative sellIn values
            if (this.items[i].sellIn < 0) {
                this.items[i].quality = this.handleNegativeSellIn(this.items[i])
            }
        }

        return this.items;
    }

    /**
     * Returns updated quality based on item type
     * @param item
     * @private
     */
    private handleNegativeSellIn(item: Item): number {
        if (item.name == 'Aged Brie' && item.quality < 50) {
            return item.quality + 1
        }

        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            return 0
        }

        if (item.name == 'Sulfuras, Hand of Ragnaros') {
            return item.quality
        }

        // Common item (regular behavior)
        return (item.quality > 0) ? item.quality - 1 : 0
    }
}
