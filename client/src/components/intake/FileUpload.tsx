// Design Philosophy: Financial Minimalism
// File upload component with drag & drop

import { Upload, X, FileText, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  label: string;
  accept?: string;
  required?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  maxSize?: number; // in MB
}

export function FileUpload({
  label,
  accept = ".pdf,.doc,.docx,.xls,.xlsx",
  required = false,
  value,
  onChange,
  error,
  maxSize = 10,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      onChange(null);
      return;
    }

    // Validate size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File too large. Maximum size: ${maxSize}MB`);
      return;
    }

    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      {!value ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center
            transition-all duration-300 cursor-pointer
            ${
              isDragging
                ? "border-primary bg-accent/50 scale-[1.02]"
                : "border-border hover:border-primary/50 hover:bg-accent/30"
            }
            ${error ? "border-destructive" : ""}
          `}
          onClick={() => inputRef.current?.click()}
        >
          <Upload
            className={`w-10 h-10 mx-auto mb-3 transition-colors duration-300 ${
              isDragging ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <p className="text-sm text-foreground mb-1">
            Click to select or drag file
          </p>
          <p className="text-xs text-muted-foreground">
            Accepted formats: {accept} • Maximum {maxSize}MB
          </p>
        </div>
      ) : (
        <div className="card-elevated p-4 flex items-center justify-between animate-slide-in-up">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {value.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(value.size)}
              </p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleFileChange(null)}
            className="ml-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
}
