export class InventoryDetails{
    constructor(name, description, price, imageSrc) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageSrc = imageSrc;
    }
    getName() { 
        return this.name; 
    }
    setName(name) { 
        this.name = name; 
    }
    getDescription() {
         return this.description; 
    }
    setDescription(description) { 
        this.description = description; 
    }
    getPrice() { 
        return this.price; 
    }
    setPrice(price) { 
        this.price = price;   
    }
    getImageSrc() { 
        return this.imageSrc; 
    }
    setImageSrc(imageSrc) { 
        this.imageSrc = imageSrc; 
    }
}
module.exports = InventoryDetails;