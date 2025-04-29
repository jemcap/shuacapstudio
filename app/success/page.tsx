export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful</h1>
      <p className="mt-4 text-lg text-gray-700">
        Thank you for your purchase! A confirmation email has been sent to you.
      </p>
      <p className="mt-4 text-lg text-gray-700">
        If you purchased the <strong>Premium Video Package</strong>, you'll
        receive a separate email from me shortly with a brief form to complete.
      </p>
    </div>
  );
}
