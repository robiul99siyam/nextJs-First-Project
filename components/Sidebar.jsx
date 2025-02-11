import Link from "next/link";

export default function Sidebar({ docs }) {
  const roots = docs.filter((doc) => !doc.parent);
  const nonRoots = docs.filter((doc) => doc.parent);

  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul role="list" className="border-l border-transparent">
        {roots.map((rootNode) => (
          <li key={rootNode.id} className="relative">
            <Link
              aria-current="page"
              className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
              href={`/docs/${rootNode.id}`}
            >
              <span className="truncate">{rootNode.title}</span>
            </Link>

            {/* Ensure sub-items are wrapped in <ul> */}
            <ul role="list">
              {nonRoots
                .filter(
                  (subRoot) => subRoot.parent.toLowerCase() === rootNode.id
                )
                .map((subRoot) => (
                  <li key={subRoot.id}>
                    <Link
                      className="ml-4 py-1 pl-7 pr-3 text-sm text-zinc-900 transition dark:text-white"
                      href={`/docs/${rootNode.id}/${subRoot.id}`}
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
