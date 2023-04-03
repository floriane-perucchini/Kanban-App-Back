const { List } = require('../models/index.js')

const listController = {
  getAllLists: async (request, response) => {
    try {
      const lists = await List.findAll({
        include: [
          {
            association: 'cards',
            include: ['tags'],
            order: ['tags', 'name', 'ASC']
          }
        ],
        order: [
          ['position', 'ASC'],
          ['cards', 'position', 'ASC']
        ]
      });

      response.json(lists);

    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },

  createList: async (request, response) => {
    try {
      const { name, position } = request.body;
      console.log(request.body)
      if (!name) {
        return response.status(400).json("Name cannot be empy");
      }
      const newList = List.build({
          name,
          position
      });

      await newList.save();
      response.json(newList);

    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },

  getOneList: async (request, response) => {
    try {
      const listId = request.params.id;

      const list = await List.findByPk(listId, {
        include: [
          {
            association: 'cards',
            include: ['tags'],
            order: ['tags', 'name', 'ASC']
          }
        ],
        order: [
          ['position', 'ASC'],
          ['cards', 'position', 'ASC']
        ]
      });

      if (!list) {
        return response.status(404).json(`Cannot find list with id ${listId}`)
      }
      response.json(list);

  } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },

  modifyList: async (request, response) => {
    try {
      const listId = request.params.id;
      const { name, position } = request.body;
      const list = await List.findByPk(listId);

      if (!list) {
        return response.status(404).json(`Cannot find list with id ${listId}`);
      }
      if (name) {
        list.name = name;
      }
      if (position) {
        list.position = position;
      }

      await list.save();
      response.json(list);

    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },

  deleteList: async (request, response) => {
    try {
      const listId = request.params.id;

      const list = await List.findByPk(listId);

      if (!list) {
        return response.status(404).json(`Cannot find list with id ${listId}`);
      }
      const destroyedLines = await List.destroy({
        where : {
          id: listId
        }
      });
      console.log(destroyedLines);
      response.json(`Number of lists deleted : ${destroyedLines}`);

    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },

  getOneListWithCards: async (request, response) => {
    try {
      const listId = request.params.id;
      const list = await List.findByPk(listId, {
        include: [
          {
            association: 'cards',
            include: ['tags'],
            order: ['tags', 'name', 'ASC']
          }
        ],
        order: [
          ['position', 'ASC'],
          ['cards', 'position', 'ASC']
        ]
      });

      if (!list) {
        return response.status(404).json(`Cannot find list with id ${listId}`)
      }
      response.json(list);

    } catch (error) {
      console.error(error);
      response.status(500).json(error.toString());
    }
  },
}

module.exports = listController;