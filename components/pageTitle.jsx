export default function PageTitle({ text, className }) {
  return (
    <div className={className}>
      <h1 className="text-2xl font-semibold">{text} </h1>
      <div className="w-40 h-2 bg-green-500 rounded-full "></div>
      <div className="w-40 h-2 bg-indigo-500 rounded-full translate-x-2"></div>
    </div>
  );
}
