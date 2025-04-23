import { PropertyForm } from "@/components/property-form"

export default function AddPropertyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add New Property</h1>
        <p className="text-muted-foreground">Fill in the details below to add a new property listing.</p>
      </div>
      <PropertyForm />
    </div>
  )
}
