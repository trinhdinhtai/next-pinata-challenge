import Link from "next/link"

export default function SiteHeader() {
  return (
    <div className="relative z-10 border-b bg-gray-50 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-mono">
          vangle.storage
        </Link>

        <div className="flex gap-2"></div>
      </div>
    </div>
  )
}
