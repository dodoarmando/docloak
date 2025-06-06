import { type User } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { FileScan, FileX2, FilePen, MoreHorizontal, } from "lucide-react"
import { useState } from "react"

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
import { EditUserDialog } from "@/components/users/edit-user-dialog"
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete"
import { router } from "@inertiajs/react"
import { toast } from "sonner"

// Actions cell component to manage dropdown state
const ActionsCell = ({ user }: { user: User }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    return (
        <>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
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

                    <DropdownMenuItem
                        onSelect={() => {
                            setDropdownOpen(false) // Close dropdown first
                            setTimeout(() => setEditDialogOpen(true), 100) // Then open dialog
                        }}
                    >
                        <FilePen className="mr-2" /> Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onSelect={() => {
                            setDropdownOpen(false) // Close dropdown first
                            setTimeout(() => setDeleteDialogOpen(true), 100) // Then open dialog
                        }}
                        className="text-red-500 hover:text-red-600"
                    >
                        <FileX2 className="mr-2" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <EditUserDialog
                user={user}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
            />

            <DialogConfirmDelete
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title={`Delete user "${user.name}"?`}
                description="This action cannot be undone. The user will be permanently removed."
                onConfirm={() => {
                    router.delete(route("users.destroy", user.id), {
                        onSuccess: () => toast.success(<span>User <b>{user.name}</b> deleted successfully.</span>),
                        onError: () => toast.error(<span>Failed to delete <b>{user.name}</b></span>),
                    })
                }}
            />
        </>
    )
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
            return <ActionsCell user={user} />
        },
    },
]