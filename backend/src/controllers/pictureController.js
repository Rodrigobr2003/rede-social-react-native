const Picture = require("../models/PicturesModel");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const { file } = req.file;

    const picture = new Picture({
      name,
      src: file.path,
    });

    await picture.save();

    console.log(picture);
  } catch (error) {
    console.log("Erro ao criar imagem: ", error);
  }
};
