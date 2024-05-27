"use client";
import { Select } from "../Select";
import { Box, Button, Typography } from "@mui/material";
import { useSearchCar } from "./useSearchCar";

export const SearchCarForm = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    list,
    handleChangeBrand,
    handleChangeModel,
    disabledButton,
  } = useSearchCar();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography variant="h3" component="h1">
        Tabela Fipe
      </Typography>
      <Typography variant="subtitle1" component="h2">
        Consulte o valor de um veículo de forma gratuita
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            p: 4,
            px: 8,
            mt: 4,
            bgcolor: "background.paper",
            display: "grid",
            boxShadow: 3,
            borderRadius: 2,
            minWidth: 400,
            gap: "1rem",
          }}
        >
          <Select
            label="Marca"
            data={list.brands}
            name="brand"
            control={control}
            onChange={handleChangeBrand}
          />

          {!!list.models.length && (
            <Select
              label="Modelos"
              data={list.models}
              name="model"
              control={control}
              onChange={handleChangeModel}
            />
          )}

          {!!list.years.length && (
            <Select
              label="Ano"
              data={list.years}
              name="year"
              control={control}
            />
          )}

          <Button
            variant="contained"
            type="submit"
            sx={{ display: "block", margin: "16px auto 0 auto" }}
            disabled={!disabledButton}
            data-cy="submit-button"
          >
            Consultar preço
          </Button>
        </Box>
      </form>
    </Box>
  );
};
