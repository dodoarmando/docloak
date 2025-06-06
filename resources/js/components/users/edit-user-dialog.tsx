import * as React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm, router } from '@inertiajs/react';
import { FilePen, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface EditUserDialogProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export function EditUserDialog({ user, open, onOpenChange, trigger }: EditUserDialogProps) {
    const { data, setData, put, processing, reset, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: ''
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('users.update', user.id), {
            onSuccess: () => {
                toast.success(
                    <>
                        User <span className="font-bold">{data.name}</span> updated successfully!
                    </>
                );
                reset();
                onOpenChange?.(false); // Close dialog externally
                router.reload({ only: ['users'] });
            },
        });
    };

    // Reset form when dialog opens
    React.useEffect(() => {
        if (open) {
            setData({
                name: user.name || '',
                email: user.email || '',
                password: '',
                password_confirmation: ''
            });
            setShowPassword(false);
            setShowPasswordConfirm(false);
        }
    }, [open, user]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user information.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div className="grid gap-2 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Leave blank to keep current"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-[38px] text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="grid gap-2 relative">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <Input
                                id="password_confirmation"
                                type={showPasswordConfirm ? 'text' : 'password'}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-[38px] text-gray-500"
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                tabIndex={-1}
                            >
                                {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end space-x-2 mt-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => onOpenChange?.(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update User'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}