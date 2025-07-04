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
            const maxQualityCondition = (this.items[i].quality < 50)
            const positiveQualityCondition = (this.items[i].quality > 0)

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
                if (this.items[i].name == 'Aged Brie' && maxQualityCondition) {
                    this.items[i].quality = this.items[i].quality + 1
                    continue
                }

                if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                    this.items[i].quality = 0
                    continue
                }

                if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
                    continue
                }

                // Common item (regular behavior)
                this.items[i].quality = positiveQualityCondition ? this.items[i].quality - 1 : 0
            }
        }

        return this.items;
    }
}
