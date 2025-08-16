import { useParams } from "react-router-dom";

export default function ProfileFormHeader({ title, description }) {
    const { patient_id, surname, first_name } = useParams();

    return (
        <div className="mb-8 border-l-4 border-l-[#106041] pl-6 bg-[#f0f8f4] p-6 rounded-r-md shadow-sm">
            <div className="flex flex-col space-y-2">
                {/* Small label-like heading */}
                <h1 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    {title}
                </h1>

                {/* Main name */}
                <h2 className="text-3xl font-bold text-[#106041] capitalize tracking-wide leading-tight">
                    {surname}, {first_name}
                </h2>

                {/* Optional patient ID below the name for context */}
                {patient_id && (
                    <p className="text-sm text-gray-500 font-medium">
                        Patient ID: <span className="text-gray-700">{patient_id}</span>
                    </p>
                )}
            </div>

            {/* Description block */}
            {description && (
                <p className="text-base text-gray-600 mt-4 leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
