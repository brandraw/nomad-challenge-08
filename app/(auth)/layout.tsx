export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-[500px] w-full border rounded-lg p-5 shadow-sm">
        {children}
      </div>
    </div>
  );
}
