import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "docs");

export function getDocuments() {
  //   console.log(postDirectory);

  const fileNames = fs.readdirSync(postDirectory);
  // console.log(fileNames);

  const allDocments = fileNames.map((fileName) => {
    const id = fileName.replace(".md", "");
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const metterResult = matter(fileContents);
    // console.log(metterResult);

    return {
      id,
      ...metterResult.data,
    };
  });

  return allDocments.sort((a, b) => a.order - b.order);
}

export async function getDocumentContent(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
