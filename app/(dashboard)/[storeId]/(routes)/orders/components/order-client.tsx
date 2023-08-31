"use client"

import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";


interface OrderClientProps {
    data: OrderColumn[]
}

export const BillboardClient: React.FC<OrderClientProps> = ({
    data
}) => {

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders afor your store"
            />
            <Separator />
            <DataTable searchKey="producs" columns={columns} data={data} />            
        </>
     );
}
 

export default BillboardClient;