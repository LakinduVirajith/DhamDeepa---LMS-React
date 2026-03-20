import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactFormSchema,
  type ContactFormInput,
} from '@/schemas/contact.schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/api/contact.api';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormInput) => {
    setLoading(true);
    try {
      await submitContactForm(data);
      toast.success('Message sent successfully!');
      reset();
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-900 text-gray-200 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-gray-400 mb-8">
          Have questions or suggestions? Fill out the form below, and we'll get
          back to you soon.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <Input
              placeholder="Name"
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              {...register('name')}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Textarea
              placeholder="Message"
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              {...register('message')}
            />
            {errors.message && (
              <span className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="px-6 py-6 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  );
}
