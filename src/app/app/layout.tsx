export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="p-4 border-b">
        <h1 className="font-bold">DEFRAG</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}