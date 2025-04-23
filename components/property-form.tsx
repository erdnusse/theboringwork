"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addProperty, editProperty } from "@/actions/property-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import type { Property } from "@/services/property-service"

interface PropertyFormProps {
  property?: Property
  isEditing?: boolean
}

export function PropertyForm({ property, isEditing = false }: PropertyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)

      let response
      if (isEditing && property) {
        response = await editProperty(property.id, formData)
      } else {
        response = await addProperty(formData)
      }

      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        })
        router.push("/dashboard/properties")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Property Title</Label>
          <Input id="title" name="title" defaultValue={property?.title || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" defaultValue={property?.price || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="property_type">Property Type</Label>
          <Select name="property_type" defaultValue={property?.property_type || "house"}>
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={property?.status || "available"}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input id="bedrooms" name="bedrooms" type="number" defaultValue={property?.bedrooms || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input id="bathrooms" name="bathrooms" type="number" defaultValue={property?.bathrooms || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="square_feet">Square Feet</Label>
          <Input
            id="square_feet"
            name="square_feet"
            type="number"
            defaultValue={property?.square_feet || ""}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" defaultValue={property?.address || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={property?.city || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" defaultValue={property?.state || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zip_code">ZIP Code</Label>
          <Input id="zip_code" name="zip_code" defaultValue={property?.zip_code || ""} required />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="featured" name="featured" defaultChecked={property?.featured || false} />
          <Label htmlFor="featured">Featured Property</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={6} defaultValue={property?.description || ""} required />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditing ? "Update Property" : "Add Property"}
        </Button>
      </div>
    </form>
  )
}
