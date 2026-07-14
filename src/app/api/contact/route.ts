import { handleContactSubmission } from '@/features/contact/server/handleContactSubmission';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  return handleContactSubmission(request);
}
