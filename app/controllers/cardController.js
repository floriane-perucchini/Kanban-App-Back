const { Card } = require('../models/index.js')

const cardController = {
  getAllCards: async (request, response) => {
    try {
      const cards = await Card.findAll({
          include: [
              {
                  association: 'tags',
              }
          ],
          order: [
              ['title', 'ASC'],
          ]
      });
      response.json(cards);
    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
    },
  createCard: async (request, response) => {
    try {
      console.log(request.body);
      const { title, position, color, list_id } = request.body;
      if (!title) {
        return response.status(400).json("Title cannot be empy");
      }
      const newCard = Card.build({
        title,
        position,
        list_id,
        color
      });
      await newCard.save();
      response.json(newCard);

    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },

  getOneCard: async (request, response) => {
    try {
      const cardId = request.params.id;
      const card = await Card.findByPk(cardId, {
        include: [
          {
            association: 'tags',
            order: ['name', 'ASC']
          }
        ],
        
      });
      if (!card) {
        return response.status(404).json(`Cannot find card with id ${cardId}`)
      }
      response.json(card);
    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },

  modifyCard: async (request, response) => {
    try {
      const cardId = request.params.id;
      const { title, position, color, list_id } = request.body;
      const card = await Card.findByPk(cardId);

      if (!card) {
        return response.status(404).json(`Cannot find card with id ${cardId}`);
      }

      if (title) {
        card.title = title;
      }
      if (position) {
        card.position = position;
      }
      if (color) {
        card.color = color;
      }
      if (list_id) {
        card.list_id = list_id;
      }

      await card.save();
      response.json(card);

    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },

  deleteCard: async (request, response) => {

    try {
      const cardId = request.params.id;
      const card = await Card.findByPk(cardId);
      if (!card) {
        return response.status(404).json(`Cannot find card with id ${cardId}`);
      }
      const destroyedLines = await Card.destroy({
        where : {
          id: cardId
        }
      });
      console.log(destroyedLines);
      response.json(`Number of cards deleted : ${destroyedLines}`);
    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },

  addTagOnCard: async (request, response) => {
    try{
      const cardId = request.params.id;
      const foundCard = await Card.findByPk(cardId);
      const tagId = request.body.tag_id;
      await foundCard.addTag([tagId]);
      const card = await Card.findByPk(cardId, {
        include: [
          {
            association: 'tags',
          }
        ],
      });
      response.json(card)
    }catch(error){
      console.error(error);
      response.status(500).json(error.toString());
    }
    
  },

  deleteTagOnCard: async (request, response) => {
    try{
      const cardId = request.params.card_id;
      const tagId = request.params.tag_id;
      const foundCard = await Card.findByPk(cardId);
      await foundCard.removeTag(tagId);
      const card = await Card.findByPk(cardId, {
        include: [
          {
            association: 'tags',
          }
        ],
      });
      response.json(card);
    }catch(error){
      console.error(error);
      response.status(500).json(error.toString());
    }
  }
}

module.exports = cardController;