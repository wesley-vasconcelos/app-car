import { SubmitHandler, useForm } from "react-hook-form";
import {
  getCarBrands,
  getCarModels,
  getYearsByModels,
} from "@/services/carService";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";

type Inputs = {
  brand: string;
  model: string;
  year: number;
};

export const useSearchCar = () => {
  const { control, handleSubmit, getValues } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(`/details/${data.brand}/${data.model}/${data.year}`);
  };

  const [list, setList] = useState<{
    brands: { value: string; name: string }[];
    models: { value: string; name: string }[];
    years: { value: string; name: string }[];
  }>({
    brands: [],
    models: [],
    years: [],
  });

  const fetchBrands = async () => {
    const brands = await getCarBrands();
    setList({ brands, models: [], years: [] });
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleChangeBrand = async (event: SelectChangeEvent) => {
    const brandSelected = event.target.value;

    const models = await getCarModels(brandSelected);
    setList({ ...list, models });
  };

  const handleChangeModel = async (event: SelectChangeEvent) => {
    const modelId = event.target.value;
    const brandId = getValues("brand");
    const years = await getYearsByModels({ brandId, modelId });
    setList({ ...list, years });
  };

  const disabledButton = !!getValues().brand && !!getValues().model;

  return {
    handleSubmit,
    onSubmit,
    control,
    list,
    handleChangeBrand,
    handleChangeModel,
    disabledButton,
  };
};
