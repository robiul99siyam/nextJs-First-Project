import NonRootContent from "@/components/NonRootContent";

export default function page({ params: { subContentId } }) {
  return (
    <div className="mt-20">
      <NonRootContent id={subContentId} />
    </div>
  );
}
