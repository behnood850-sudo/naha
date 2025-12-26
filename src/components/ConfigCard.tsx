import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Copy, 
  QrCode, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  HardDrive,
  Calendar,
  Clock,
  Link as LinkIcon,
  Server,
  Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { QRCodeDialog } from "./QRCodeDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface ConfigData {
  id: string;
  name: string;
  displayName: string;
  serverName: string;
  status: string;
  statusClass: string;
  remainingTrafficGb: number;
  totalTrafficGb: number;
  usedTrafficGb: number;
  remainingDays: number;
  createdAt: string;
  expireDate: string;
  protocol: string;
  serviceCode: string;
  connectionLink: string;
  subscriptionUrl: string;
  configPrice: number;
}

interface ConfigCardProps {
  config: ConfigData;
  onDelete: () => void;
}

export function ConfigCard({ config, onDelete }: ConfigCardProps) {
  const [showQR, setShowQR] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(config.connectionLink);
    toast.success("لینک اتصال کپی شد!");
  };

  const handleRenew = () => {
    navigate(`/renew/${config.id}`);
  };

  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
    toast.success("کانفیگ حذف شد");
  };

  const InfoRow = ({ icon: Icon, label, value, valueClass = "" }: { 
    icon: any; 
    label: string; 
    value: string; 
    valueClass?: string;
  }) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-sm font-medium truncate ${valueClass}`}>{value}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="glass-strong rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Server className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{config.displayName || config.name}</h3>
              <p className="text-xs text-muted-foreground">{config.protocol}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              config.statusClass === 'active' 
                ? 'bg-success/15 text-success' 
                : 'bg-destructive/15 text-destructive'
            }`}>
              {config.statusClass === 'active' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  فعال
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5" />
                  غیرفعال
                </>
              )}
            </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <InfoRow 
            icon={HardDrive}
            label="حجم باقی‌مانده"
            value={`${config.remainingTrafficGb.toFixed(1)} GB`}
            valueClass="text-primary"
          />
          <InfoRow 
            icon={Clock}
            label="روز باقی‌مانده"
            value={`${config.remainingDays} روز`}
            valueClass={config.remainingDays <= 7 ? "text-warning" : "text-foreground"}
          />
          <InfoRow 
            icon={Calendar}
            label="تاریخ خرید"
            value={config.createdAt}
          />
          <InfoRow 
            icon={Calendar}
            label="تاریخ انقضا"
            value={config.expireDate}
          />
          <InfoRow 
            icon={Hash}
            label="کد سرویس"
            value={config.serviceCode}
          />
          <InfoRow 
            icon={Server}
            label="سرور"
            value={config.serverName}
            valueClass="text-accent"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowQR(true)}
            className="flex-1 sm:flex-none bg-secondary/50 hover:bg-secondary/80 rounded-xl"
          >
            <QrCode className="w-4 h-4 ml-2" />
            QR کد
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none bg-secondary/50 hover:bg-secondary/80 rounded-xl"
          >
            <Copy className="w-4 h-4 ml-2" />
            کپی لینک
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRenew}
            className="flex-1 sm:flex-none bg-accent/10 hover:bg-accent/20 text-accent rounded-xl"
          >
            <RefreshCw className="w-4 h-4 ml-2" />
            تمدید
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="flex-1 sm:flex-none bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-xl"
          >
            <Trash2 className="w-4 h-4 ml-2" />
            حذف
          </Button>
        </div>
      </div>

      <QRCodeDialog
        open={showQR}
        onOpenChange={setShowQR}
        connectionLink={config.connectionLink}
        configName={config.displayName || config.name}
      />

      <DeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleDelete}
        configName={config.displayName || config.name}
      />
    </>
  );
}