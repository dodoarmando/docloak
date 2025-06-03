import { ColumnDef } from "@tanstack/react-table"
import { FileScan, FileX2, FilePen, MoreHorizontal, } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete"
import { router } from "@inertiajs/react"
import { toast } from "sonner"

export type User = {
    id: number
    name: string
    email: string
}

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Name" />
            )
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Email" />
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <FileScan className="mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FilePen className="mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <DialogConfirmDelete
                                title={`Delete user "${user.name}"?`}
                                description="This action cannot be undone. The user will be permanently removed."
                                onConfirm={() => {
                                    router.delete(route("users.destroy", user.id), {
                                        onSuccess: () => toast.success(<span>User <b>{user.name}</b> deleted successfully.</span>),
                                        onError: () => toast.error(<span>Failed to delete <b>{user.name}</b></span>),
                                    })
                                }}
                            >
                                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600">
                                    <FileX2/> Delete
                                </Button>
                            </DialogConfirmDelete>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]