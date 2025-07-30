"use client";
import { CopyButton } from "@/components/Buttons";
import { copyToClipboard } from "@/utils/common";
import { RULES, validateRules } from "@/utils/rules";
import {
  Add,
  Done,
  PlusOne,
  PublicSharp,
  SwapHoriz,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { JSX, useState } from "react";
import { toast } from "react-toastify";

type ItemStatus = "IDLE" | "PENDING" | "SUCCESS";

interface Item {
  originalUrl: string;
  shortCode: string;
  status: ItemStatus;
}

const ITEM_STATUS_TEXT: Record<ItemStatus, string | JSX.Element> = {
  IDLE: "Convert",
  PENDING: <CircularProgress size={18} />,
  SUCCESS: "Success",
};

const ITEM_STATUS_ICON: Record<ItemStatus, React.ElementType | undefined> = {
  IDLE: SwapHoriz,
  PENDING: undefined,
  SUCCESS: Done,
};

export default function Home() {
  const [items, setItems] = useState<Array<Item>>([
    {
      originalUrl: "",
      shortCode: "",
      status: "IDLE",
    },
  ]);

  function addNewItem() {
    setItems((prev) => [
      {
        originalUrl: "",
        shortCode: "",
        status: "IDLE",
      },
      ...prev,
    ]);
  }

  const handleChange = (idx: number, value: string) => {
    const newItems = [...items];
    newItems[idx].originalUrl = value;
    newItems[idx].status = "IDLE";
    setItems(newItems);
  };

  const handleConvert = async (idx: number) => {
    const newItems = [...items];
    const item = newItems[idx];

    item.status = "PENDING";
    setItems([...newItems]);
    try {
      const error = validateRules(item.originalUrl, [
        RULES.required,
        RULES.url,
      ]);

      if (typeof error === "string") throw new Error(error);

      const res = await fetch("/api/shorten", {
        method: "POST",
        body: JSON.stringify({ originalUrl: item.originalUrl }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Failed Convert");

      const shortCode = `${window.location.origin}/${data.shortCode}`;

      item.shortCode = shortCode;
      item.status = "SUCCESS";
      toast.success("Copied to clipboard!", {
        toastId: `success-${idx}`,
      });
      copyToClipboard(shortCode);

      setItems([...newItems]);
      addNewItem(); // ✅ 새로운 입력창 추가
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message, { toastId: `error-${idx}-${err.message}` });
      item.status = "IDLE"; // 실패 시 초기화
      setItems([...newItems]);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        pt: 8,
      }}
    >
      <Typography variant="h2" fontWeight={700}>
        Zippy
      </Typography>
      <Stack alignItems={"flex-end"}>
        <IconButton onClick={addNewItem}>
          <Add />
        </IconButton>
        <Box component={"ul"} sx={{ width: "100%" }}>
          {items.map((item, idx) => {
            const Icon = ITEM_STATUS_ICON[item.status];
            return (
              <Box
                key={`item--${idx}`}
                component={"li"}
                sx={{ listStyle: "none" }}
              >
                <Stack
                  component={"form"}
                  direction={"row"}
                  alignItems={"center"}
                  gap={2}
                  mb={2}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleConvert(idx);
                  }}
                >
                  <TextField
                    label={"URL"}
                    value={item.originalUrl}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    disabled={item.status !== "IDLE"}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    sx={{ minWidth: 120 }}
                    disabled={item.status !== "IDLE"}
                    startIcon={Icon ? <Icon /> : undefined}
                  >
                    {ITEM_STATUS_TEXT[item.status]}
                  </Button>
                  <TextField
                    label={"Short URL"}
                    value={item.shortCode}
                    slotProps={{
                      input: {
                        endAdornment: item.shortCode ? (
                          <InputAdornment position="end">
                            <CopyButton value={item.shortCode} />
                          </InputAdornment>
                        ) : undefined,
                      },
                    }}
                    fullWidth
                    aria-readonly
                  />
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Container>
  );
}
