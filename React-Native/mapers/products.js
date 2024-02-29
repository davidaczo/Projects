export const mapProductData = (data) => {
    return data.map((partner) => {
        const { id, name, product_variants, categories } = partner
        return {
            id,
            name,
            categories: categories.map((category) => {
                const { id, name } = category
                return {
                    id,
                    name
                }
            }),
            product_variants: product_variants.map((variant) => {
                const { id, img, base_price, current_price, attributes } = variant
                return {
                    id,
                    img,
                    base_price,
                    current_price,
                    attributes: {
                        colors: attributes.colour.map((color) => {
                            return color.value;
                        }),
                        occasion: attributes.occasion.map((occasion) => {
                            return occasion.value
                        }),
                        size: attributes.size.map((size) => {
                            return size.value
                        }),
                        style: attributes.style.map((style) => {
                            return style.value
                        }),
                        type: attributes.type.map((type) => {
                            return type.value
                        }),
                    }
                }
            })
        }
    });
};

export const mapProductMainData = (data) => {
    return data.map((partner) => {
        const { id, name, product_variants, categories } = partner
        return {
            id,
            name,
            product_variants: product_variants.map((variant) => {
                const { id, img, base_price, current_price, attributes } = variant
                return {
                    id,
                    img,
                    base_price,
                    current_price,
                    attributes: {
                        size: attributes.size.map((size) => {
                            return size.value
                        }),
                    }
                }
            })
        }
    });
};