import { apiRequest } from './client';
import { API_CONFIG } from '@/lib/constants/api';

export interface CreateOrderRequest {
  student_id: string;
  product_id: string;
}

export interface CreateOrderResponse {
  checkout_url: string;
}

export interface BankPaymentOrderRequest {
  product_id: string;
  transfer_type: 'one-time' | 'subscription';
}

export interface BankPaymentOrderResponse {
  payment_reference: string;
}

export const purchasesApi = {
  createOrder: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    return apiRequest<CreateOrderResponse>(API_CONFIG.ENDPOINTS.CREATE_ORDER, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  createBankPaymentOrder: async (data: BankPaymentOrderRequest): Promise<BankPaymentOrderResponse> => {
    return apiRequest<BankPaymentOrderResponse>(API_CONFIG.ENDPOINTS.BANK_PAYMENT_ORDER, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
