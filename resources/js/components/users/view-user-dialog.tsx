import * as React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileScan, Mail, User, Calendar, Shield } from 'lucide-react';

interface ViewUserDialogProps {
    user: {
        id: number;
        name: string;
        email: string;
        created_at?: string;
        updated_at?: string;
        email_verified_at?: string;
        role?: string;
    };
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export function ViewUserDialog({ user, open, onOpenChange, trigger }: ViewUserDialogProps) {
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        User Details
                    </DialogTitle>
                    <DialogDescription>
                        View detailed information about this user.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="grid gap-4">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <User className="h-5 w-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <p className="text-gray-900 mt-1">{user.name || 'Not provided'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Mail className="h-5 w-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <p className="text-gray-900 mt-1">{user.email || 'Not provided'}</p>
                                {user.email_verified_at && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        {user.role && (
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-700">Role</label>
                                    <p className="text-gray-900 mt-1 capitalize">{user.role}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-700">Account Created</label>
                                <p className="text-gray-900 mt-1">{formatDate(user.created_at)}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-700">Last Updated</label>
                                <p className="text-gray-900 mt-1">{formatDate(user.updated_at)}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex-1">
                                <label className="text-sm font-medium text-blue-800">User ID</label>
                                <p className="text-blue-900 mt-1 font-mono text-sm">#{user.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange?.(false)}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}