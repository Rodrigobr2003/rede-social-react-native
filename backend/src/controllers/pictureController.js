const Picture = require("../models/PicturesModel");

exports.create = async (req, res) => {
  try {
    const imagem = new Picture(req.body);

    await imagem.salvarImagem();
  } catch (error) {
    console.log("Erro ao salvar imagem: ", error);
  }
};
