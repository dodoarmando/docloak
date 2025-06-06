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

interface DialogConfirmDeleteProps {
    title: string;
    description: string;
    onConfirm: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
    children?: React.ReactNode;
}

export function DialogConfirmDelete({ 
    title, 
    description, 
    onConfirm, 
    open, 
    onOpenChange, 
    trigger,
    children 
}: DialogConfirmDeleteProps) {
    const handleConfirm = () => {
        onConfirm();
        onOpenChange?.(false); // Close dialog after confirmation
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {(trigger || children) && (
                <DialogTrigger asChild>
                    {trigger || children}
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex justify-end space-x-2 mt-4">
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange?.(false)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="destructive" 
                        onClick={handleConfirm}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}