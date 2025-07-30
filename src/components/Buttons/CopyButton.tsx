"use client";

import { copyToClipboard } from "@/utils/common";
import { ContentCopy, Done } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export function CopyButton({ value }: { value: string }) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      setLoading(true);
      await copyToClipboard(value, {
        onSuccess: () => {
          setCopied(true);
          toast.success("Copied to clipboard", { toastId: `copy-${value}` });
          setTimeout(() => setCopied(false), 1000);
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <IconButton onClick={handleCopy} disabled={loading || copied}>
      {copied ? <Done fontSize="small" /> : <ContentCopy fontSize="small" />}
    </IconButton>
  );
}
