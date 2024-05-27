"use client";

import { getFipeValue } from "@/services/carService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CarDetailsDomain } from "@/domain/Car";

export default function Details() {
  const params = useParams<{ brand: string; model: string; year: string }>();
  const [data, setData] = useState<CarDetailsDomain>({
    brand: "",
    model: "",
    monthRef: "",
    value: "",
    year: "",
  });

  const getDetailsCar = async () => {
    const data = await getFipeValue({
      brandId: params.brand,
      modelId: params.model,
      year: params.year,
    });

    setData(data);
  };

  useEffect(() => {
    getDetailsCar();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#e0f7e9",
        p: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Tabela Fipe: {data.brand} {data.model} {data.year}
      </Typography>
      <Box
        sx={{
          display: "inline-block",
          bgcolor: "#4caf50",
          color: "#fff",
          borderRadius: 10,
          px: 2,
          py: 1,
          mb: 1,
        }}
      >
        <Typography>{data.value}</Typography>
      </Box>
      <Typography variant="body2" color="textSecondary">
        Última atualização em: {data.monthRef}
      </Typography>
    </Box>
  );
}
