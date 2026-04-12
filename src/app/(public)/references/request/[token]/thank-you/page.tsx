import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold text-[#111]">Thank you!</h1>
        <p className="text-[#666] text-sm mt-3 leading-relaxed">
          Your reference has been submitted successfully. The requester will be notified and your response has been saved to their profile.
        </p>
        <div className="mt-8">
          <div className="inline-flex items-center gap-2">
            <div className="w-4 h-4 bg-[#111] rounded flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">V</span>
            </div>
            <span className="text-[#999] text-xs">Vouch</span>
          </div>
        </div>
      </div>
    </div>
  );
}
