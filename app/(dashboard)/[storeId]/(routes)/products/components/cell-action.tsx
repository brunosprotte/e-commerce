"use client"

import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductColumn } from "./columns"
import axios from "axios"
import { useState } from "react"
import AlertModal from "@/components/modals/alert-modal"

interface CellActionProps {
    data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const params = useParams();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Product Id copied to the clipboard")
    }

    const onDelete = async () => {
        try {
            setLoading(true)

            await axios.delete(`/api/${params.storeId}/products/${data.id}`)
            router.refresh()

            toast.success('Product deleted')
        } catch(error) {
            toast.error('Make sure you removed all categories using this product first.')
        } finally{
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
        <AlertModal 
            isOpen={open} 
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}