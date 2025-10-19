import ModernSpinner from "@/components/loading-spinner";

export default function Loading() {
  return (  <div className="w-full h-full z-0 flex items-center justify-center">
            <ModernSpinner />
          </div>);
}
