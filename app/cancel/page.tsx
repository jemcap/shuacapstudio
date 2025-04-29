export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your payment was not completed. You can try again anytime.
      </p>
    </div>
  );
}
