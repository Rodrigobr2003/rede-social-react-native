const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PicSchema = new Schema({
  idUser: { type: String, required: true },
  pictures: [
    {
      image: { type: String, required: true },
      type: { type: Number, required: true },
    },
  ],
});
//tipo 1 -> profpic
//tipo 2 -> genpics

const PicturesModel = mongoose.model("Picture", PicSchema);

class Pictures {
  constructor(body) {
    this.body = body;
  }

  async salvarImagem() {
    const userPhotosSess = await PicturesModel.findOne({
      idUser: this.body.idUser,
    });

    if (!userPhotosSess) {
      await PicturesModel.create({
        idUser: this.body.idUser,
        pictures: [
          {
            image: this.body.base64,
            type: this.body.type,
          },
        ],
      });
    } else {
      await PicturesModel.findOneAndUpdate(
        { idUser: this.body.idUser },
        {
          $addToSet: {
            pictures: {
              image: this.body.base64,
              type: this.body.type,
            },
          },
        }
      );
    }
  }
}

module.exports = Pictures;
