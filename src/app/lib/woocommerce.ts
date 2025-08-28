
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Esta función inicializa la API con las credenciales de tu archivo .env.local
export const getWooCommerceApi = () => {
  const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WC_STORE_URL_USER1 as string,
    consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY_USER1 as string,
    consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET_USER1 as string,
    version: "wc/v3",
  });

  return api;
};