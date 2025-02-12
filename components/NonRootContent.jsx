import { getDocumentContent } from "@/lib/docs";
import Link from "next/link";
async function NonRootContent({ id }) {
  const content = await getDocumentContent(id);
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
          <Link className="m-1" key={tag} href={`/tags/${tag}`}>
            {tag}
          </Link>
        ))}
      </div>
      <div
        className="lead"
        dangerouslySetInnerHTML={{ __html: content.contentHtml }}
      />
    </article>
  );
}

export default NonRootContent;
