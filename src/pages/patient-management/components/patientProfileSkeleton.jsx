import React from 'react';
import { Separator } from '@/components/ui/separator';

export default function PatientProfileSkeleton() {
  return (
    <div className="p-4 animate-pulse">
      {/* Basic Information Section */}
      <h2 className="text-xl font-semibold mb-2 bg-gray-300 rounded h-6 w-40" />
      <Separator className="my-4" />
      <div className="md:grid-cols-2 grid gap-3">
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-20" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-36" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-24" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-28" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-32" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
      </div>

      {/* Contact Information Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2 bg-gray-300 rounded h-6 w-48" />
      <Separator className="my-4" />
      <div className="md:grid-cols-4 grid gap-3">
        {/** Each input */}
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-16" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-32" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-40" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-40" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
      </div>
      <div className="form-group mt-4">
        <div className="mb-3 bg-gray-300 rounded h-4 w-24" />
        <div className="bg-gray-300 rounded h-20" />
      </div>
      <div className="form-group mt-4">
        <div className="mb-3 bg-gray-300 rounded h-4 w-28" />
        <div className="bg-gray-300 rounded h-10" />
      </div>
      <div className="form-group mt-4">
        <div className="mb-3 bg-gray-300 rounded h-4 w-56" />
        <div className="bg-gray-300 rounded h-20" />
      </div>

      {/* Demographic Information Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2 bg-gray-300 rounded h-6 w-40" />
      <Separator className="my-4" />
      <div className="grid grid-cols-2 gap-3">
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-24" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-32" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
      </div>

      {/* Next of Kin Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2 bg-gray-300 rounded h-6 w-40" />
      <Separator className="my-4" />
      <div className="grid grid-cols-3 gap-3">
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-32" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-28" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-40" />
          <div className="bg-gray-300 rounded h-10" />
        </div>
      </div>
      <div className="form-group mt-4">
        <div className="mb-3 bg-gray-300 rounded h-4 w-56" />
        <div className="bg-gray-300 rounded h-20" />
      </div>

      {/* Medical History Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2 bg-gray-300 rounded h-6 w-48" />
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-48" />
          <div className="bg-gray-300 rounded h-20" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-56" />
          <div className="bg-gray-300 rounded h-20" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-48" />
          <div className="bg-gray-300 rounded h-20" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-40" />
          <div className="bg-gray-300 rounded h-20" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-52" />
          <div className="bg-gray-300 rounded h-20" />
        </div>
      </div>

      {/* Allergies Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2 bg-gray-300 rounded h-6 w-40" />
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-40" />
          <div className="bg-gray-300 rounded h-20" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-48" />
          <div className="bg-gray-300 rounded h-20" />
        </div>
        <div className="form-group">
          <div className="mb-3 bg-gray-300 rounded h-4 w-56" />
          <div className="bg-gray-300 rounded h-20" />
        </div>
      </div>
    </div>
  );
}
