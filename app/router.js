const express = require('express');
const router = express.Router();

const listController = require('./controllers/listController.js'); 
const cardController = require('./controllers/cardController.js')
const tagController = require('./controllers/tagController.js')

// LISTS
router.get('/lists', listController.getAllLists);
router.post('/lists', listController.createList);
router.get('/lists/:id', listController.getOneList);
router.patch('/lists/:id', listController.modifyList);
router.delete('/lists/:id', listController.deleteList);

router.get('/lists/:id/cards', listController.getOneListWithCards);

//CARDS 
router.get('/cards', cardController.getAllCards);
router.post('/cards', cardController.createCard);
router.get('/cards/:id', cardController.getOneCard);
router.patch('/cards/:id', cardController.modifyCard);
router.delete('/cards/:id', cardController.deleteCard);

router.post('/cards/:id/tag', cardController.addTagOnCard);
router.delete('/cards/:card_id/tag/:tag_id', cardController.deleteTagOnCard);

// //TAGS
// router.get('/tags', tagController.getAllTags);
// router.post('/tags', tagController.createTag);
// router.get('/tags/:id', tagController.getOneTag);
// router.patch('/tags/:id', tagController.modifyTag);
// router.delete('/tags/:id', tagController.deleteTag);

module.exports = router;