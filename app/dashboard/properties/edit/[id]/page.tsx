import { PropertyForm } from "@/components/property-form"
import { getPropertyById } from "@/services/property-service"
import { notFound } from "next/navigation"

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const propertyId = Number.parseInt(params.id)
  const property = await getPropertyById(propertyId)

  if (!property) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Property</h1>
        <p className="text-muted-foreground">Update the details for {property.title}</p>
      </div>
      <PropertyForm property={property} isEditing={true} />
    </div>
  )
}
