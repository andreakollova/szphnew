import Image from "next/image";
import type { ContentBlock } from "@szph/db";

interface PageContentRendererProps {
  blocks: ContentBlock[];
  /** Breadcrumb label shown above the title */
  breadcrumb?: string;
  /** Page title to show in hero */
  title: string;
}

/**
 * Renders an array of ContentBlock objects from the DB as a full page.
 * Used by static pages to display DB-editable content instead of hardcoded JSX.
 */
export function PageContentRenderer({ blocks, breadcrumb, title }: PageContentRendererProps) {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          {breadcrumb && (
            <span
              className="font-bold uppercase text-white mb-4 block"
              style={{ fontSize: "10px", letterSpacing: "0.14em" }}
            >
              {breadcrumb}
            </span>
          )}
          <h1
            className="font-bold text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Content blocks */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        {blocks.map((block) => (
          <ContentBlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </article>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading": {
      const level = block.level ?? 2;
      const sizes: Record<number, string> = { 1: "32px", 2: "24px", 3: "18px" };
      const cls = "font-bold text-[#051937] mt-10 mb-6";
      const style = { fontSize: sizes[level] ?? "24px" };
      if (level === 1) return <h1 className={cls} style={style}>{block.content}</h1>;
      if (level === 3) return <h3 className={cls} style={style}>{block.content}</h3>;
      return <h2 className={cls} style={style}>{block.content}</h2>;
    }
    case "text":
      return (
        <div
          className="text-[#334155] mb-6 prose-content"
          style={{ fontSize: "15px", lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );
    case "image":
      return (
        <div className="mb-8">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
            <Image
              src={block.url ?? block.content}
              alt={block.alt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
          {block.caption && (
            <p className="text-[#94a3b8] text-xs mt-2 text-center">{block.caption}</p>
          )}
        </div>
      );
    case "gallery":
      return (
        <div className="grid grid-cols-2 gap-3 mb-8">
          {(block.images ?? []).map((img, i) => (
            <div key={i} className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "6px" }}>
              <Image
                src={img.url}
                alt={img.alt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 900px) 50vw, 420px"
              />
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}
