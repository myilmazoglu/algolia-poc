"use client";

type Props = {
  hit: any;
};

export default function Hit(props: Props) {
  return (
    <div className="p-2 h-15 w-[470px] border-slate-200 border bg-white">
      <p className="text-red">{props.hit.hit.book_name}</p>
      <p className="text-red">{props.hit.hit.author}</p>
    </div>
  );
}
