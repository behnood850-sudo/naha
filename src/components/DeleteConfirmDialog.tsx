import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  configName: string;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  configName,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glass-strong border-border/50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            تأیید حذف کانفیگ
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            آیا مطمئن هستید که می‌خواهید کانفیگ "{configName}" را حذف کنید؟
            <br />
            <span className="text-destructive font-medium">این عمل قابل بازگشت نیست.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2 sm:gap-0">
          <AlertDialogCancel className="bg-secondary/50 hover:bg-secondary/80 border-0">
            انصراف
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}