import { getDocumentContent } from "@/lib/docs";
import Link from "next/link";
export const ContentDisplay = async ({ id }) => {
  const content = await getDocumentContent(id);

  if (!content) {
    return <div>Content not found. Please try again later.</div>;
  }

  return (
    <article className="prose dark:prose-invert mt-20">
      <h1>{content.title}</h1>
      Publised On : {content.date}{" "}
      <Link className="m-1" href={`/author/${content.author}`}>
        {" "}
        {content.author}
      </Link>
      under the
      <Link className="mx-1" href={`/category/${content.category}`}>
        {content.category}
      </Link>
      <div>
        {content.tags.map((tag) => (
          <Link className="m-1" key={tag} href={`/tag/${tag}`}>
            {tag}
          </Link>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
    </article>
  );
};
