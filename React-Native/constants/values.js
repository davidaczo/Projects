export const BASE_URL = "https://bloomexpress.ro/api"
export const DEV_URL = "http://3.121.10.45/api"
//‘registered’, ‘canceled’, ‘processing’, ‘inDelivery’, ‘delivered’, ‘refused’, ‘underPayment’
const OrderStatus = {
    REGISTERED: 'registered',
    CANCELED: 'canceled',
    PROCESSING: 'processing',
    IN_DELIVERY: 'inDelivery',
    DELIVERED: 'delivered',
    REFUSED: 'refused',
    UNDER_PAYMENT: 'underPayment',
};

export default OrderStatus;