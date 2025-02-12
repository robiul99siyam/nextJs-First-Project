import { getDocuments } from "@/lib/docs";

export default function page({ params: { name } }) {
  const docs = getDocuments();
  console.log(docs);
  return <div className="mt-20">{name}</div>;
}
