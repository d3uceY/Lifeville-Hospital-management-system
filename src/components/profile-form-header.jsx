import React from 'react'

export default function ProfileFormHeader({ title, description }) {
    return (
        <div className="mb-8 border-l-4 border-l-[#106041] pl-4 bg-[#f0f8f4] p-4 rounded-r-md shadow-sm">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-2">{description}</p>
        </div>
    )
}
