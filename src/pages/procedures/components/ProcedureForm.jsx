import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ClipboardList } from "lucide-react"
import { createProcedure } from "../../../providers/ApiProviders"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "../../../providers/AuthContext"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

export default function ProfileProcedureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const { patient_id } = useParams()
  const queryClient = useQueryClient()

  const schema = z.object({
    recorded_by: z.string().nonempty({ message: "Recorded by is required" }),
    procedure_name: z.string().nonempty({ message: "Procedure name is required" }),
    comments: z.string().optional(),
    performed_at: z.string().nonempty({ message: "Performed date/time is required" }),
  })

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      recorded_by: user?.name || "",
      procedure_name: "",
      comments: "",
      performed_at: "",
    },
  })

  const onSubmit = async (data) => {
    const promise = async () => {
      try {
        setIsSubmitting(true)
        const payload = { ...data, patient_id }
        await createProcedure(payload)
        queryClient.invalidateQueries({ queryKey: ["procedures", patient_id] })
        reset({ ...data, procedure_name: "", comments: "", performed_at: "" })
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        setIsSubmitting(false)
      }
    }
    toast.promise(promise(), {
      loading: "Saving...",
      success: "Saved successfully",
      error: "Failed to save",
    })
  }

  const renderField = (id, label, type = "text", textarea = false) => (
    <div className="mb-4">
      <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor={id}>
        {label}
      </Label>
      {textarea ? (
        <textarea
          className="bg-gray-50 border border-gray-300 rounded-md p-2 w-full resize-y"
          id={id}
          placeholder={`Enter ${label.toLowerCase()}`}
          rows={4}
          {...register(id)}
        />
      ) : (
        <Input
          className="bg-gray-50"
          id={id}
          type={type}
          placeholder={`Enter ${label.toLowerCase()}`}
          {...register(id)}
        />
      )}
      {errors[id] && <p className="text-red-500 text-sm">{errors[id]?.message}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
        <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
          <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
            <ClipboardList size={20} />
            Procedure
          </CardTitle>
          <Button className="mt-6" type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </CardHeader>

        <CardContent>
          {renderField("procedure_name", "Procedure Name")}
          {renderField("comments", "Comments", "text", true)}
          {renderField("performed_at", "Performed At", "datetime-local")}

          <Button className="mt-6 ml-auto block" type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
