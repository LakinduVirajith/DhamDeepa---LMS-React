import { fetchPublic } from './client';
import type { ContactForm } from '@/constants/types';

export const submitContactForm = async (data: ContactForm) => {
  const res = await fetchPublic('/api/v1/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res.json();
};
