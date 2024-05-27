import axios from "axios";
import {
  getCarBrands,
  getCarModels,
  getFipeValue,
  getYearsByModels,
} from "./carService";
import api from "./api";

jest.mock("./api");

describe("Services: CarService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch car brands successfully", async () => {
    const mockedResponse = {
      data: [
        { codigo: "1", nome: "Brand1" },
        { codigo: "2", nome: "Brand2" },
      ],
    };

    (api.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockedResponse
    );

    const brands = await getCarBrands();

    expect(brands).toEqual([
      { value: "1", name: "Brand1" },
      { value: "2", name: "Brand2" },
    ]);
  });

  it("should throw an error if fetching car brands fails", async () => {
    const mockedError = new Error("Failed to fetch car brands");
    (api.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockedError
    );

    await expect(getCarBrands()).rejects.toThrow("Failed to fetch car brands");
  });

  it("should fetch car models successfully", async () => {
    const brandId = "1";

    const mockedResponse = {
      data: {
        modelos: [
          { codigo: "1", nome: "Model1" },
          { codigo: "2", nome: "Model2" },
        ],
      },
    };

    (api.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockedResponse
    );

    const models = await getCarModels(brandId);

    expect(models).toEqual([
      { value: "1", name: "Model1" },
      { value: "2", name: "Model2" },
    ]);

    expect(api.get).toHaveBeenCalledWith(`carros/marcas/${brandId}/modelos`);
  });

  it("should throw an error if fetching car models fails", async () => {
    const brandId = "1";

    const mockedError = new Error("Failed to fetch car models");

    (api.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockedError
    );

    await expect(getCarModels(brandId)).rejects.toThrow(
      "Failed to fetch car models"
    );

    expect(api.get).toHaveBeenCalledWith(`carros/marcas/${brandId}/modelos`);
  });

  it("should fetch car years successfully", async () => {
    const brandId = "1";
    const modelId = "2";

    const mockedResponse = {
      data: [
        { codigo: "2010", nome: "2010" },
        { codigo: "2011", nome: "2011" },
      ],
    };

    (api.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockedResponse
    );

    const years = await getYearsByModels({ brandId, modelId });

    expect(years).toEqual([
      { value: "2010", name: "2010" },
      { value: "2011", name: "2011" },
    ]);

    expect(api.get).toHaveBeenCalledWith(
      `carros/marcas/${brandId}/modelos/${modelId}/anos`
    );
  });

  it("should throw an error if fetching car years fails", async () => {
    const brandId = "1";
    const modelId = "2";

    const mockedError = new Error("Failed to fetch car years");

    (api.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockedError
    );

    await expect(getYearsByModels({ brandId, modelId })).rejects.toThrow(
      "Failed to fetch car years"
    );

    expect(api.get).toHaveBeenCalledWith(
      `carros/marcas/${brandId}/modelos/${modelId}/anos`
    );
  });

  it("should fetch car details successfully", async () => {
    const brandId = "1";
    const modelId = "2";
    const year = "2010";

    const mockedResponse = {
      data: {
        Marca: "Brand1",
        Modelo: "Model1",
        AnoModelo: 2010,
        Valor: "10000",
        MesReferencia: "01/2022",
      },
    };

    (api.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockedResponse
    );

    const details = await getFipeValue({ brandId, modelId, year });

    expect(details).toEqual({
      brand: "Brand1",
      model: "Model1",
      year: 2010,
      value: "10000",
      monthRef: "01/2022",
    });

    expect(api.get).toHaveBeenCalledWith(
      `carros/marcas/${brandId}/modelos/${modelId}/anos/${year}`
    );
  });

  it("should throw an error if fetching car details fails", async () => {
    const brandId = "1";
    const modelId = "2";
    const year = "2010";

    const mockedError = new Error("Failed to fetch car details");

    (api.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockedError
    );

    await expect(getFipeValue({ brandId, modelId, year })).rejects.toThrow(
      "Failed to fetch car details"
    );

    expect(api.get).toHaveBeenCalledWith(
      `carros/marcas/${brandId}/modelos/${modelId}/anos/${year}`
    );
  });
});
