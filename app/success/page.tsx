export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful</h1>
      <p className="mt-4 text-lg text-gray-700">
        Thank you for your purchase! A confirmation email has been sent to you.
      </p>
      <p className="mt-4 text-lg text-gray-700">
        I'll email you shortly with a quick and simple form to complete so we
        can process your order as smoothly as possible.
      </p>
    </div>
  );
}
