export default function ErrorPage({
  code,
  description,
  image
}) {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center">

      <img
        src={image}
        alt="error"
        className="w-80"
      />

      <h1 className="mt-6 text-6xl font-bold text-red-500">
        {code}
      </h1>

      <p className="mt-3 text-xl text-gray-500">
        {description}
      </p>

    </div>
  );
}