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
        'Sulfuras, Hand of Ragnaros'
    ]
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const currentItem = this.items[i]

            // First-stage quality changes
            if (!GildedRose.specialItemNames.includes(currentItem.name)) {
                this.decreaseQuality(currentItem)
            }

            if (currentItem.name == 'Aged Brie') {
                this.increaseQuality(currentItem)
            }

            if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
                this.increaseQuality(currentItem)

                if (currentItem.sellIn < 11) {
                    this.increaseQuality(currentItem)
                }

                if (currentItem.sellIn < 6) {
                    this.increaseQuality(currentItem)
                }
            }

            // 'sellIn' Value Decrease
            if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
                currentItem.sellIn -= 1;
            }

            // Handle extra quality changes if 'sellIn' value drops below zero
            if (currentItem.sellIn < 0) {
                this.handleNegativeSellIn(currentItem)
            }
        }

        return this.items;
    }

    /**
     * Regular quality decrease
     * @param item
     * @private
     */
    private decreaseQuality(item: Item) {
        item.quality = Math.max(0, item.quality - 1)
    }

    /**
     * Regular quality increase
     * @param item
     * @private
     */
    private increaseQuality(item: Item) {
        item.quality = Math.min(GildedRose.maxQuality, item.quality + 1)
    }

    /**
     * Returns updated quality based on item type once 'sellIn' value goes below zero
     * @param item
     * @private
     */
    private handleNegativeSellIn(item: Item) {
        if (item.name == 'Aged Brie') {
            this.increaseQuality(item)
        }

        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            item.quality = 0
        }

        if (item.name == 'Sulfuras, Hand of Ragnaros') {
            return
        }

        // Common item (regular behavior)
        this.decreaseQuality(item)
    }
}
