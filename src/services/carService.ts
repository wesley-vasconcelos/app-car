import { CarDetailsDomain } from "@/domain/Car";
import api from "./api";

export const getCarBrands = async (): Promise<
  { value: string; name: string }[]
> => {
  try {
    const response = await api.get("/carros/marcas");
    const brands = response.data.map(
      (item: { codigo: string; nome: string }) => ({
        value: item.codigo,
        name: item.nome,
      })
    );
    return brands;
  } catch (error) {
    console.error("Erro ao buscar marcas de carros:", error);
    throw error;
  }
};

export const getCarModels = async (
  brandId: string
): Promise<{ value: string; name: string }[]> => {
  try {
    const response = await api.get(`carros/marcas/${brandId}/modelos`);

    const models = response.data.modelos.map(
      (item: { codigo: string; nome: string }) => ({
        value: item.codigo,
        name: item.nome,
      })
    );
    return models;
  } catch (error) {
    console.error("Erro ao buscar modelos de carros:", error);
    throw error;
  }
};

export const getYearsByModels = async ({
  brandId,
  modelId,
}: {
  brandId: string;
  modelId: string;
}): Promise<{ value: string; name: string }[]> => {
  try {
    const response = await api.get(
      `carros/marcas/${brandId}/modelos/${modelId}/anos`
    );

    const models = response.data.map(
      (item: { codigo: string; nome: string }) => ({
        value: item.codigo,
        name: item.nome,
      })
    );
    return models;
  } catch (error) {
    console.error("Erro ao buscar os anos do modelo selecionado", error);
    throw error;
  }
};

export const getFipeValue = async ({
  brandId,
  modelId,
  year,
}: {
  brandId: string;
  modelId: string;
  year: string;
}): Promise<CarDetailsDomain> => {
  try {
    const { data } = await api.get(
      `carros/marcas/${brandId}/modelos/${modelId}/anos/${year}`
    );

    const details: CarDetailsDomain = {
      brand: data.Marca,
      model: data.Modelo,
      year: data.AnoModelo,
      value: data.Valor,
      monthRef: data.MesReferencia,
    };

    return details;
  } catch (error) {
    console.error("Erro ao buscar os detalhes do carro selecionado", error);
    throw error;
  }
};
