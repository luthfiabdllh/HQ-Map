import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/verify-session';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Layout shell — sidebar and header are in child pages/components */}
      {children}
    </div>
  );
}
