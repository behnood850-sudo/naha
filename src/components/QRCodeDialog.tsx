import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  connectionLink: string;
  configName: string;
}

export function QRCodeDialog({
  open,
  onOpenChange,
  connectionLink,
  configName,
}: QRCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            QR کد - {configName}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center p-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <QRCodeSVG 
              value={connectionLink} 
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            این QR کد را با اپلیکیشن خود اسکن کنید
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}