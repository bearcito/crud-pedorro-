
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const getWooCommerceApi = () => {
  const url = process.env.NEXT_PUBLIC_WC_STORE_URL_USER1;
  const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY_USER1;
  const consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET_USER1;

  if (!url || !consumerKey || !consumerSecret) {
    throw new Error('WooCommerce credentials are not properly configured');
  }

  const api = new WooCommerceRestApi({
    url,
    consumerKey,
    consumerSecret,
    version: "wc/v3",
  });

  return api;
};

export const handleWooCommerceError = (error: any) => {
  console.error('WooCommerce API Error:', error);
  
  if (error.response?.data) {
    return {
      error: true,
      message: error.response.data.message || 'An error occurred',
      code: error.response.data.code
    };
  }
  
  return {
    error: true,
    message: error.message || 'An error occurred',
    code: 'UNKNOWN_ERROR'
  };
};