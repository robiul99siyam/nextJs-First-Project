"use client";
import {
  getAuthorFiltering,
  getCategoryFiltering,
  getTagFiltering,
} from "@/utils/doc-util";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import usePath

export default function Sidebar({ docs }) {
  const pathname = usePathname();
  const [rootNode, setRootNode] = useState([]);
  const [nonRootsGroup, setNonRootsGroup] = useState([]);

  useEffect(() => {
    let matched = docs;

    if (pathname.includes("/author")) {
      let author = decodeURIComponent(pathname.split("/")[2]);
      // console.log(author.replace("%20", " "));
      matched = getAuthorFiltering(docs, author);
    } else if (pathname.includes("/category")) {
      let category = decodeURIComponent(pathname.split("/")[2]);
      matched = getCategoryFiltering(docs, category);
    } else if (pathname.includes("/tags")) {
      let tag = decodeURIComponent(pathname.split("/")[2]);
      matched = getTagFiltering(docs, tag);
    }

    const roots = matched.filter((doc) => !doc.parent);
    const nonRoots = matched.filter((doc) => doc.parent);

    const nonRootKeys = nonRoots.map((doc) => doc.parent);
    nonRootKeys.forEach((key) => {
      if (!roots.find((root) => root.id === key)) {
        const foundInDocs = docs.find((doc) => doc.id === key);
        if (foundInDocs) {
          roots.push(foundInDocs);
        }
      }
    });
    setRootNode([...roots]);
    setNonRootsGroup([...nonRoots]);
  }, [pathname]);

  useEffect(() => {
    let matched = docs;

    if (pathname.includes("/author")) {
      let author = decodeURIComponent(pathname.split("/")[2]);
      matched = getAuthorFiltering(docs, author);
    } else if (pathname.includes("/category")) {
      let category = decodeURIComponent(pathname.split("/")[2]);
      matched = getCategoryFiltering(docs, category);
    } else if (pathname.includes("/tags")) {
      let tag = decodeURIComponent(pathname.split("/")[2]);
      matched = getTagFiltering(docs, tag);
    }

    console.log("Filtered Docs:", matched); // Debugging

    // Ensure roots and non-roots are filtered properly
    const roots = matched.filter((doc) => !doc.parent);
    let nonRoots = matched.filter((doc) => doc.parent);

    // If non-roots exist, ensure their parents are in roots
    const nonRootKeys = nonRoots.map((doc) => doc.parent);
    nonRootKeys.forEach((key) => {
      if (!roots.find((root) => root.id === key)) {
        const foundInDocs = docs.find((doc) => doc.id === key);
        if (foundInDocs) {
          roots.push(foundInDocs);
        }
      }
    });

    setRootNode([...roots]);
    setNonRootsGroup([...nonRoots]);
  }, [pathname]);
  console.log(nonRootsGroup);
  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul role="list" className="border-l border-transparent">
        {rootNode.map((rootNodes) => (
          <li key={rootNodes.id} className="relative">
            <Link
              aria-current="page"
              className={`${
                pathname === `/docs/${rootNodes.id}`
                  ? "flex justify-between gap-2 py-1 pl-4 pr-3 text-sm  transition dark:text-white text-green-600"
                  : "flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
              }`}
              href={`/docs/${rootNodes.id}`}
            >
              <span className="truncate">{rootNodes.title}</span>
            </Link>

            {/* Ensure sub-items are wrapped in <ul> */}
            <ul role="list">
              {nonRootsGroup
                .filter(
                  (subRoot) => subRoot.parent.toLowerCase() === rootNodes.id
                )
                .map((subRoot) => (
                  <li key={subRoot.id}>
                    <Link
                      className={`${
                        pathname === `/docs/${rootNodes.id}/${subRoot.id}`
                          ? "ml-4 py-1 pl-7 pr-3 text-sm text-green-500 transition dark:text-white"
                          : "ml-4 py-1 pl-7 pr-3 text-sm text-zinc-900 transition dark:text-white"
                      }`}
                      href={`/docs/${rootNodes.id}/${subRoot.id}`}
                    >
                      <span className="truncate">{subRoot.title}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
