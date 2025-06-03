import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { columns } from '@/components/users/columns';
import { DataTable } from '@/components/data-table';
import { CreateUserDialog } from '@/components/users/create-user-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({users}: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto">
                    <DataTable
                        title="Users"
                        description="Here’s a list of your users."
                        toolbar={<CreateUserDialog />}
                        columns={columns}
                        data={users} />
                </div>
            </div>
        </AppLayout>
    );
}
