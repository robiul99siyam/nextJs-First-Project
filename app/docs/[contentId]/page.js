import { ContentDisplay } from "@/components/ContentDisplay";

export default function DocsPage({ params: { contentId } }) {
  // console.log(docId);
  return (
    <div>
      <ContentDisplay id={contentId} />
    </div>
  );
}
