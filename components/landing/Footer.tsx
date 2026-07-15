export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] px-6 py-4">
      <div className="mx-auto flex max-w-[1296px] flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-sm font-light text-white">
          © {new Date().getFullYear()} The Canopy · Moody Moon Ridge
        </p>
        <div className="flex items-center gap-10">
          <a
            href="https://canopy.moodymoonridge.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light text-white hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="https://canopy.moodymoonridge.com/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light text-white hover:underline"
          >
            Refund Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
