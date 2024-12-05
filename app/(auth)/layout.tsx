import Image from "next/image";

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex min-h-screen">
        <section className="bg-brand p-10">
            <div>
            <Image src="/logo.png" width={224} height={84} alt="" className="h-auto" />
            <div className="space-y-5 text-white">
                <h1 className="h1">Manage Your file the best way</h1>
                <p className="body-1">This is place where you can store all your document</p>
            </div>
            <Image src="/illustration.png" width={342} height={342} alt="" className="transition-all hover:rotate-2 hover:scale-105"  />

            </div>
        </section>
        {children}
      </div>
    );
  }