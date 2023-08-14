'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="h-96 flex justify-center items-center">
      <h2>{error.message}</h2>
    </div>
  );
}
