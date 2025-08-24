import { useQuery } from "@tanstack/react-query"
import { getVitalSignSummaryByPatientId } from "../../../providers/ApiProviders"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "react-router-dom"
import { formatTemperature, formatBloodPressure, formatPulse, formatSpO2, formatBMI } from "../../../helpers/vitalSignFormatters"
import { calculateBMI } from "../../../helpers/calculateBMI"
import { formatDate } from "../../../helpers/formatDate"

export function VitalSignSummaryTable() {
    const { patient_id } = useParams()
    const {
        data: vitalSigns = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["vitalSigns", patient_id],
        queryFn: () => getVitalSignSummaryByPatientId(patient_id),
        enabled: !!patient_id,
    })

    if (isLoading) {
        return <div className="text-center py-4">Loading vital signs...</div>
    }

    if (error) {
        return <div className="text-center py-4 text-destructive">Error loading vital signs</div>
    }

    if (!vitalSigns || vitalSigns.length === 0) {
        return <div className="text-center py-4 text-muted-foreground">No vital signs found</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Temp (°C)</TableHead>
                    <TableHead>BP (Systolic/Diastolic)</TableHead>
                    <TableHead>Pulse (bpm)</TableHead>
                    <TableHead>SpO₂ (%)</TableHead>
                    <TableHead>BMI</TableHead>
                    <TableHead>Recorded By</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {vitalSigns?.map((vital) => (
                    <TableRow key={vital.id}>
                        {/* Date */}
                        <TableCell>{formatDate(vital.recorded_at)}</TableCell>

                        {/* Temperature */}
                        <TableCell>
                            {(() => {
                                const { value, color } = formatTemperature(vital.temperature);
                                return <span className={color}>{value}</span>;
                            })()}
                        </TableCell>

                        {/* Blood Pressure */}
                        <TableCell>
                            {(() => {
                                const { value, color } = formatBloodPressure(
                                    vital.blood_pressure_systolic,
                                    vital.blood_pressure_diastolic
                                );
                                return <span className={color}>{value}</span>;
                            })()}
                        </TableCell>

                        {/* Pulse */}
                        <TableCell>
                            {(() => {
                                const { value, color } = formatPulse(vital.pulse_rate);
                                return <span className={color}>{value}</span>;
                            })()}
                        </TableCell>

                        {/* SpO₂ */}
                        <TableCell>
                            {(() => {
                                const { value, color } = formatSpO2(vital.spo2);
                                return <span className={color}>{value}</span>;
                            })()}
                        </TableCell>

                        {/* BMI */}
                        <TableCell>
                            <span>{calculateBMI(vital.weight, vital.height)}</span>
                        </TableCell>

                        {/* Recorded By */}
                        <TableCell>{vital.recorded_by}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    )
}
