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
    static maxQuality: number = 50;
    static specialItemNames: string[] = [
        'Aged Brie',
        'Backstage passes to a TAFKAL80ETC concert',
        'Sulfuras, Hand of Ragnaros',
        'Conjured Mana Cake'
    ]
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const currentItem = this.items[i]

            this.decreaseSellIn(currentItem)

            // Handle quality changes if 'sellIn' value has dropped below zero
            if (currentItem.sellIn < 0) {
                this.handleNegativeSellIn(currentItem)
                continue
            }

            // Quality changes for positive 'sellIn' values
            if (!GildedRose.specialItemNames.includes(currentItem.name)) {
                this.decreaseQuality(currentItem)
            }

            if (currentItem.name == 'Conjured Mana Cake') {
                this.decreaseQuality(currentItem, 2)
            }

            if (currentItem.name == 'Aged Brie') {
                this.increaseQuality(currentItem)
            }

            if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
                if (currentItem.sellIn < 6) {
                    this.increaseQuality(currentItem, 3)
                } else if (currentItem.sellIn < 11) {
                    this.increaseQuality(currentItem, 2)
                } else {
                    this.increaseQuality(currentItem)
                }
            }
        }

        return this.items;
    }

    /**
     * Regular quality decrease by value
     * @param item
     * @param value
     * @private
     */
    private decreaseQuality(item: Item, value: number = 1) {
        item.quality = Math.max(0, item.quality - value)
    }

    /**
     * Regular quality increase by value
     * @param item
     * @param value
     * @private
     */
    private increaseQuality(item: Item, value: number = 1) {
        item.quality = Math.min(GildedRose.maxQuality, item.quality + value)
    }

    /**
     * Returns updated quality based on item type once 'sellIn' value goes below zero
     * @param item
     * @private
     */
    private handleNegativeSellIn(item: Item) {
        if (item.name == 'Aged Brie') {
            this.increaseQuality(item, 2)
            return
        }

        if (item.name == 'Conjured Mana Cake') {
            this.decreaseQuality(item, 4)
            return
        }

        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            item.quality = 0
            return
        }

        if (item.name == 'Sulfuras, Hand of Ragnaros') {
            return
        }

        // Common item (regular behavior)
        this.decreaseQuality(item, 2)
    }

    /**
     * Decreases 'sellIn' value for common items
     * @param item
     * @private
     */
    private decreaseSellIn(item: Item) {
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.sellIn -= 1;
        }
    }
}
