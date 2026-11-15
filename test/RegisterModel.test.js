const TitherModel = require("../src/model/RegisterModel");

const validTither = () => ({
  code: "12",
  name: "Maria",
  surname: "Oliveira",
  neighborhood: "Centro",
  street: "Rua A",
  housenumber: "10",
  phone: "(11) 99999-9999",
  category: "Feminino",
});

describe("validação dizimistas", () => {
  test("aceita dados válidos e normaliza nomes e números", () => {
    const tither = new TitherModel(validTither());

    tither.valida();

    expect(tither.errors).toEqual([]);
    expect(tither.body).toMatchObject({
      code: 12,
      name: "Maria",
      surname: "Oliveira",
      housenumber: 10,
    });
  });

  test("rejeita código que não contém apenas dígitos", () => {
    const tither = new TitherModel({ ...validTither(), code: "12.5" });

    tither.valida();

    expect(tither.errors).toContain(
      "Esse formato de número de código é inválido",
    );
  });

  test("rejeita telefone fora do formato esperado", () => {
    const tither = new TitherModel({ ...validTither(), phone: "11999999999" });

    tither.valida();

    expect(tither.errors).toContain("Telefone inválido");
  });

  test("rejeita categoria não permitida", () => {
    const tither = new TitherModel({ ...validTither(), category: "Outro" });

    tither.valida();

    expect(tither.errors).toContain("A categoria informada não é aceita");
  });
});
