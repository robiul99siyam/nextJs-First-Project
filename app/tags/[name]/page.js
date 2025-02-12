import { ContentDisplay } from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/docs";
import { getTagFiltering } from "@/utils/doc-util";

export default function Tagspage({ params: { name } }) {
  const docs = getDocuments();
  const matchesDocuments = getTagFiltering(docs, name);
  return (
    <div className="mt-20">
      <ContentDisplay id={matchesDocuments[0].id} />
    </div>
  );
}
