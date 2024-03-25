export const mapOrder = (apiResponse) => {
    const orderData = apiResponse.data;
    const {
        id,
        code,
        status,
        message,
        card_message,
        dates: { created, delivery_date, delivery_time, },
        billing_address,
        shipping_address,
        items,
    } = orderData[0];
    console.log("CARD INFOO", card_message)

    const mappedItems = items.map((item) => {
        const {
            base_price,
            quantity,
            name,
            image,
            discount_rate,
            attributes,
            current_price,
        } = item;

        const mappedAttributes = Object.entries(attributes).reduce(
            (acc, [key, value]) => {
                acc[key] = value.map((attr) => attr.value);
                return acc;
            },
            {}
        );

        return {
            base_price,
            quantity,
            name,
            image,
            discount_rate,
            attributes: mappedAttributes,
            current_price,
        };
    });

    console.log("CARD INFOO", card_message)
    return {
        id,
        code,
        status,
        message,
        card_message,
        created: created,
        delivery_date: delivery_date,
        delivery_time: delivery_time,
        billing_address,
        shipping_address,
        items: mappedItems,
    };
};

export const mapOrders = (apiResponse) => {
    const ordersData = apiResponse.data;
    const orders = ordersData.map((orderData) => {
        const {
            id,
            code,
            status,
            message,
            card_message,
            dates: { created, delivery_date, delivery_time, },
            billing_address,
            shipping_address,
            items,
        } = orderData;

        console.log("CARD INFOO", card_message)
        const mappedItems = items.map((item) => {
            const {
                base_price,
                quantity,
                name,
                image,
                discount_rate,
                attributes,
                current_price,
            } = item;

            const mappedAttributes = Object.entries(attributes).reduce(
                (acc, [key, value]) => {
                    acc[key] = value.map((attr) => attr.value);
                    return acc;
                },
                {}
            );

            return {
                base_price,
                quantity,
                name,
                image,
                discount_rate,
                attributes: mappedAttributes,
                current_price,
            };
        });

        console.log("CARD INFOO", card_message)
        return {
            id,
            code,
            status,
            message,
            card_message,
            created: created,
            delivery_date: delivery_date,
            delivery_time: delivery_time,
            billing_address,
            shipping_address,
            items: mappedItems,
        };
    });

    return orders
}