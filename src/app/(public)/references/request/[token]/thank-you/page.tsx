import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-7 h-7 text-green-400" />
        </div>
        <h1 className="text-2xl font-semibold text-white">Thank you!</h1>
        <p className="text-[#888] text-sm mt-3 leading-relaxed">
          Your reference has been submitted successfully. The requester will be notified and your response has been saved to their profile.
        </p>
        <div className="mt-8">
          <div className="inline-flex items-center gap-2">
            <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
              <span className="text-black text-[9px] font-bold">R</span>
            </div>
            <span className="text-[#555] text-xs">References</span>
          </div>
        </div>
      </div>
    </div>
  );
}
