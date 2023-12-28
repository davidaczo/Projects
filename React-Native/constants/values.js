BASE_URL = "http://127.0.0.1:8000/api/"

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